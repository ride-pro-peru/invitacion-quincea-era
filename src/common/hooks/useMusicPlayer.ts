import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import type { RootState } from '@/store/store'
import { playMusic, pauseMusic, toggleMusic } from '@/store/ui/music.slice'
import { useInvitationConfig } from './useInvitationConfig'
import type { MusicPlayerProps, MusicPlayerVariant, ButtonVariant } from '@/common/types'
import song from '@/assets/music/song.mp3'

let globalAudio: HTMLAudioElement | null = null

const getGlobalAudio = () => {
    if (typeof window === 'undefined') return null
    if (!globalAudio) {
        globalAudio = new Audio(song)
        globalAudio.loop = true
        globalAudio.preload = 'auto'
    }
    return globalAudio
}

export const useMusicPlayer = (props?: MusicPlayerProps) => {
    const { theme, ui, config } = useInvitationConfig()

    const dispatch = useDispatch()
    const { pathname } = useLocation()
    const isPlaying = useSelector((state: RootState) => state.music.isPlaying)
    const ticket = useSelector((state: RootState) => state.ticket.ticket)

    const hasTicket = Boolean(ticket)
    const canPlayMusic = !config?.hasTicketingSystem || hasTicket
    const isMusicRoute = pathname === '/invitation' || pathname === '/ticket' || pathname === '/'
    const musicConfig = ui?.music || theme?.music
    const isMusicVisible = isMusicRoute && canPlayMusic && (props?.show ?? musicConfig?.showMusic ?? musicConfig?.show ?? config?.hasMusic ?? true)
    const activeVariant: MusicPlayerVariant = props?.variant || musicConfig?.variant || 'floating'
    const activeBtnVariant: ButtonVariant = props?.buttonVariant || musicConfig?.buttonVariant || theme.buttonVariant || 'primary'
    const activeSongTitle = props?.songTitle || musicConfig?.songTitle || musicConfig?.title || 'Música de fondo'
    const activeArtistName = props?.artistName || musicConfig?.artistName || 'Música del evento'

    const onPlayMusic = () => {
        if (!canPlayMusic) return
        dispatch(playMusic())
    }

    const onPauseMusic = () => dispatch(pauseMusic())

    const onToggleMusic = () => {
        if (!canPlayMusic) return
        dispatch(toggleMusic())
    }

    useEffect(() => {
        const audio = getGlobalAudio()
        if (!audio) return

        if (!canPlayMusic) {
            audio.pause()
            if (isPlaying) {
                dispatch(pauseMusic())
            }
            return
        }

        if (isPlaying) {
            audio.play().catch(() => {
                dispatch(pauseMusic())
            })
        } else {
            audio.pause()
        }
    }, [isPlaying, canPlayMusic, dispatch])

    return {
        isPlaying,
        isMusicVisible,
        activeVariant,
        activeBtnVariant,
        activeSongTitle,
        activeArtistName,

        onPlayMusic,
        onPauseMusic,
        onToggleMusic,
    }
}
