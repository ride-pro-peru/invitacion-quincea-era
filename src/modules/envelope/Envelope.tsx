import React, { useState, useEffect } from 'react'
import { useInvitationConfig } from '@/common/hooks'
import type { EnvelopeConfig } from '@/common/types'

import { EnvelopeOpenClosed } from './components/EnvelopeOpenClosed'
import { EnvelopeVideo } from './components/EnvelopeVideo'

export const Envelope: React.FC = () => {

    const { sections } = useInvitationConfig()
    const envelopConfig = (sections.envelop || sections.envelope) as EnvelopeConfig | undefined
    const envelopeType = envelopConfig?.type || 'cerrado-abierto'

    const [isDesktop, setIsDesktop] = useState<boolean>(() => {
        if (typeof window !== 'undefined') {
            return window.innerWidth >= 768
        }
        return false
    })

    useEffect(() => {
        const mediaQuery = window.matchMedia('(min-width: 768px)')
        const handleChange = (e: MediaQueryListEvent) => {
            setIsDesktop(e.matches)
        }

        mediaQuery.addEventListener('change', handleChange)

        return () => {
            mediaQuery.removeEventListener('change', handleChange)
        }
    }, [])

    if (envelopeType === 'video-apertura') {
        if (isDesktop) {
            return <EnvelopeOpenClosed />
        }

        return <EnvelopeVideo />
    }

    if (envelopeType === 'cerrado-abierto') {
        return <EnvelopeOpenClosed />
    }
}

