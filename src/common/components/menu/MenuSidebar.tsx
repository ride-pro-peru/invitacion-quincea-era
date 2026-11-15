import React from 'react'
import {
    XIcon,
    EnvelopeSimpleIcon,
    ArrowRightIcon,
    HeartIcon,
    HouseIcon,
    MapPinIcon,
    ClockIcon,
    GiftIcon,
    CheckCircleIcon,
    TicketIcon,
    SignOutIcon,
} from '@phosphor-icons/react'

import { useInvitationConfig, useMenu, useNavigation, useTicket } from '@/common/hooks'
import { Button } from '@/common/components/button/Button'
import type { MenuSidebarProps } from '@/common/types'
import { APP_ROUTES } from '@/router/routes'
import logo from '@/assets/images/icons/logo.svg'

interface SectionItem {
    label: string
    href: string
    icon: React.ReactNode
    onClick?: () => void
}

const DEFAULT_SECTIONS: SectionItem[] = [
    { label: 'Inicio', href: '#hero', icon: <HouseIcon size={20} /> },
    { label: 'Ubicación', href: '#places', icon: <MapPinIcon size={20} /> },
    { label: 'Itinerario', href: '#itinerary', icon: <ClockIcon size={20} /> },
    { label: 'Mesa de Regalos', href: '#presents', icon: <GiftIcon size={20} /> },
    { label: 'Confirmar Asistencia', href: '#confirmation', icon: <CheckCircleIcon size={20} /> },
]

export const MenuSidebar: React.FC<MenuSidebarProps> = ({
    title = 'Grethel Stefania',
    items = [],
    children,
}) => {
    const { goTo } = useNavigation()
    const { isMenuOpen, onCloseMenu, activeTitle } = useMenu()
    const { config } = useInvitationConfig()
    const { ticket, onRemoveTicket } = useTicket()
    const hasTicketingSystem = Boolean(config.hasTicketingSystem)
    const canAccessTicket = Boolean(hasTicketingSystem && ticket)
    const showFooter = canAccessTicket || !hasTicketingSystem

    const importantSections = React.useMemo(() => {
        if (items && items.length > 0 && items.length <= 5) {
            return items.map((item) => ({
                ...item,
                icon: item.icon || DEFAULT_SECTIONS.find(d => (item.href || '').includes(d.href.replace('#', '')))?.icon || <HouseIcon size={20} />
            }))
        }
        return DEFAULT_SECTIONS
    }, [items])

    const handleNavigate = (path: string) => {
        onCloseMenu();
        goTo(path);
    }

    const handleExitTicket = () => {
        onRemoveTicket()
        goTo(APP_ROUTES.search)
    }

    const overlayClass = `menu-overlay ${isMenuOpen ? 'menu-overlay--open' : ''}`
    const sidebarClass = `menu-sidebar ${isMenuOpen ? 'menu-sidebar--open' : ''}`
    const headerTitle = activeTitle && activeTitle !== 'Menú' ? activeTitle : title

    return (
        <>
            <div className={overlayClass} onClick={onCloseMenu} aria-hidden="true" />

            <aside className={sidebarClass} aria-label="Menú de navegación">
                <header className="menu-sidebar__header">
                    <h2 className="menu-sidebar__title">{headerTitle}</h2>
                    <Button
                        variant="icon"
                        radius="full"
                        onClick={onCloseMenu}
                        icon={<XIcon size={22} />}
                        aria-label="Cerrar menú"
                    />
                </header>

                <div className="menu-sidebar__content">
                    <div className="menu-sidebar__centered-logo">
                        <img src={logo} alt="Logo" className="menu-sidebar__logo-img" />
                    </div>

                    <div className="menu-sidebar__actions">
                        <Button
                            variant="primary"
                            fullWidth
                            radius="sm"
                            icon={<EnvelopeSimpleIcon size={20} weight="regular" />}
                            iconPosition="left"
                            onClick={() => handleNavigate(APP_ROUTES.envelope)}
                            className="menu-sidebar__action-btn menu-sidebar__action-btn--envelope"
                        >
                            <span>Sobre Virtual</span>
                            <ArrowRightIcon size={16} className="menu-sidebar__action-btn-arrow" />
                        </Button>

                        {canAccessTicket && (
                            <Button
                                variant="secondary"
                                fullWidth
                                radius="sm"
                                icon={<TicketIcon size={20} weight="regular" />}
                                iconPosition="left"
                                onClick={() => handleNavigate(APP_ROUTES.ticket)}
                                className="menu-sidebar__action-btn menu-sidebar__action-btn--ticket"
                            >
                                <span>Boleto Digital</span>
                                <ArrowRightIcon size={16} className="menu-sidebar__action-btn-arrow" />
                            </Button>
                        )}
                    </div>

                    {children ? (
                        children
                    ) : (
                        <div className="menu-sidebar__sections-direct">
                            <ul className="menu-sidebar__list">
                                {importantSections.map((item, index) => (
                                    <li key={index} className="menu-sidebar__item">
                                        <a
                                            href={item.href}
                                            className="menu-sidebar__link"
                                            onClick={() => {
                                                if (item.onClick) item.onClick()
                                                onCloseMenu()
                                            }}
                                        >
                                            <span className="menu-sidebar__link-icon">{item.icon}</span>
                                            <span>{item.label}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {showFooter && (
                    <footer className="menu-sidebar__footer">
                        {canAccessTicket ? (
                            <Button
                                variant="outline"
                                fullWidth
                                radius="sm"
                                icon={<SignOutIcon size={18} weight="regular" />}
                                iconPosition="left"
                                onClick={handleExitTicket}
                                className="menu-sidebar__logout-btn"
                            >
                                Salir del boleto
                            </Button>
                        ) : (
                            <div className="menu-sidebar__footer-badge">
                                <HeartIcon size={16} weight="fill" className="menu-sidebar__footer-icon" />
                                <span>¡Te espero en mis XV años!</span>
                            </div>
                        )}
                    </footer>
                )}
            </aside>
        </>
    )
}