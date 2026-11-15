import React from 'react'
import { useModal } from '@/common/hooks/useModal'
import { MODAL_NAMES } from '@/store/ui/modal.slice'
import type { Ticket } from '@/common/types'
import { TicketHelpers } from '@/common/utils/ticket.helpers'

interface Props {
    ticket: Ticket
}

export const TicketBody: React.FC<Props> = ({ ticket }) => {
    const { onSetModalContent, onOpenModal } = useModal()
    const { name, adultsQuantity, kidsQuantity, qrCode } = ticket
    const hasSafeQr = TicketHelpers.isSafeImageSrc(qrCode)

    const onShowQrImage = (url: string) => {
        if (!TicketHelpers.isSafeImageSrc(url)) return
        onSetModalContent(url)
        onOpenModal(MODAL_NAMES.ticket, 'Código QR')
    }

    return (
        <div className="ticket__body">
            {hasSafeQr && (
                <div
                    className="ticket__qr-container"
                    onClick={() => onShowQrImage(qrCode)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            onShowQrImage(qrCode)
                        }
                    }}
                    role="button"
                    tabIndex={0}
                    title="Haz clic para ampliar QR"
                >
                    <div className="ticket__qr-box">
                        <img src={qrCode} alt="Código QR del boleto" className="ticket__qr-image" />
                    </div>
                    <span className="ticket__qr-caption">Toca el QR para ampliar</span>
                </div>
            )}

            <div className="ticket__guest-info">
                <span className="ticket__guest-label">Boleto para:</span>
                <h3 className="ticket__guest-name">{name}</h3>
            </div>

            <div className="ticket__passes-info">
                <div className="ticket__pass-card">
                    <span className="ticket__pass-count">{adultsQuantity ?? 0}</span>
                    <span className="ticket__pass-label">Adultos</span>
                </div>
                <div className="ticket__pass-card">
                    <span className="ticket__pass-count">{kidsQuantity ?? 0}</span>
                    <span className="ticket__pass-label">Niños</span>
                </div>
            </div>
        </div>
    )
}
