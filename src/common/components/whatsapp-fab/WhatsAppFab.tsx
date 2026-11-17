import React, { useEffect, useState } from 'react'
import { WhatsappLogoIcon } from '@phosphor-icons/react'
import { useInvitationConfig } from '@/common/hooks'

/**
 * Botón flotante "Confirmar asistencia por WhatsApp".
 * - Usa sections.confirmation.whatsappPhone / whatsappMessage de invitation.config.json
 * - Si están vacíos, usa los valores de respaldo de abajo.
 * - Aparece después de bajar un poco (así no tapa la portada ni el sobre).
 */
const FALLBACK_PHONE = '51XXXXXXXXX' // <-- CAMBIA: código de país + número, sin + ni espacios
const FALLBACK_MESSAGE =
    '¡Hola! Confirmo mi asistencia a los XV Años de Cielo Alvarado el 12 de Diciembre. 💛'

export const WhatsAppFab: React.FC = () => {
    const { sections } = useInvitationConfig()
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6)
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const conf = sections.confirmation as { whatsappPhone?: string; whatsappMessage?: string } | undefined
    const phone = (conf?.whatsappPhone || FALLBACK_PHONE).replace(/\D/g, '')
    const message = conf?.whatsappMessage || FALLBACK_MESSAGE
    const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

    return (
        <a
            className={`wa-fab ${visible ? 'wa-fab--visible' : ''}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Confirmar asistencia por WhatsApp"
        >
            <WhatsappLogoIcon size={26} weight="fill" />
            <span>Confirmar por WhatsApp</span>
        </a>
    )
}
