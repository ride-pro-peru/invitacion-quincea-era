import { useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { openMenu, closeMenu } from '@/store/ui/menu.slice'
import type { RootState } from '@/store/store'
import type { MenuProps, MenuItem, MenuVariant, ButtonVariant } from '@/common/types'
import { useInvitationConfig } from './useInvitationConfig'

const SECTION_DEFAULTS: Record<string, { label: string; href: string }> = {
    hero: { label: 'Inicio', href: '#hero' },
    message: { label: 'Mensaje', href: '#message' },
    countdown: { label: 'Cuenta Regresiva', href: '#countdown' },
    places: { label: 'Ubicación', href: '#places' },
    itinerary: { label: 'Itinerario', href: '#itinerary' },
    dressCode: { label: 'Código de Vestimenta', href: '#dress-code' },
    gallery: { label: 'Galería', href: '#gallery' },
    presents: { label: 'Mesa de Regalos', href: '#presents' },
    confirmation: { label: 'Confirmar Asistencia', href: '#confirmation' },
}

const toKebabCase = (str: string) => str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()

const formatTitleFromKey = (key: string) => {
    const formatted = key.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    return formatted.charAt(0).toUpperCase() + formatted.slice(1)
}

export const useMenu = (props?: MenuProps) => {
    const { theme, ui, config, sections } = useInvitationConfig()

    const dispatch = useDispatch()
    const { pathname } = useLocation()
    const isMenuOpen = useSelector((state: RootState) => state.menu.isOpen)
    const [hasPassedMessage, setHasPassedMessage] = useState(false)

    const menuConfig = ui?.menu || theme?.menu
    const isMenuRoute = pathname === '/invitation' || pathname === '/'

    const isMenuVisible = isMenuRoute && hasPassedMessage && (props?.show ?? menuConfig?.showMenu ?? menuConfig?.show ?? config?.hasMenu ?? true)
    const activeVariant: MenuVariant = props?.variant || menuConfig?.variant || 'floating'
    const activeTitle = props?.title || menuConfig?.title || 'Menú'
    const activeBtnVariant: ButtonVariant = props?.buttonVariant || menuConfig?.buttonVariant || theme.buttonVariant || 'icon'

    const defaultItems: MenuItem[] = useMemo(() => {
        if (!sections) return []

        return Object.entries(sections)
            .filter(([, sectionConfig]) => {
                if (!sectionConfig || typeof sectionConfig !== 'object') return false
                const configObj = sectionConfig as Record<string, unknown>

                const isHidden = Object.entries(configObj).some(
                    ([key, val]) => key.startsWith('show') && val === false
                )
                return !isHidden
            })
            .map(([sectionKey, sectionConfig]) => {
                const configObj = (sectionConfig as Record<string, unknown>) || {}
                const defaults = SECTION_DEFAULTS[sectionKey]

                const label =
                    (typeof configObj.title === 'string' && configObj.title) ||
                    defaults?.label ||
                    formatTitleFromKey(sectionKey)

                const href =
                    (typeof configObj.href === 'string' && configObj.href) ||
                    defaults?.href ||
                    `#${toKebabCase(sectionKey)}`

                return { label, href }
            })
    }, [sections])

    const activeItems = props?.items && props.items.length > 0 ? props.items : defaultItems

    const onOpenMenu = () => dispatch(openMenu())

    const onCloseMenu = () => dispatch(closeMenu())

    const onToggleMenu = () => {
        if (isMenuOpen) {
            dispatch(closeMenu())
        } else {
            dispatch(openMenu())
        }
    }

    useEffect(() => {
        if (!isMenuRoute) return

        const handleScroll = () => {
            const messageEl = document.getElementById('message')
            if (messageEl) {
                setHasPassedMessage(messageEl.getBoundingClientRect().bottom <= 0)
            } else {
                setHasPassedMessage(window.scrollY >= window.innerHeight)
            }
        }

        const rafId = window.requestAnimationFrame(handleScroll)
        window.addEventListener('scroll', handleScroll, { passive: true })
        window.addEventListener('resize', handleScroll, { passive: true })

        return () => {
            window.cancelAnimationFrame(rafId)
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', handleScroll)
        }
    }, [isMenuRoute])

    return {
        isMenuOpen,
        isMenuVisible,
        activeVariant,
        activeTitle,
        activeBtnVariant,
        activeItems,

        onOpenMenu,
        onCloseMenu,
        onToggleMenu,
    }
}
