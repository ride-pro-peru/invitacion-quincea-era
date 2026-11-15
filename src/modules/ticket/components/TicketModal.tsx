import React from 'react'
import { Modal } from '@/common/components/modal/Modal'
import { useModal } from '@/common/hooks/useModal'
import { TicketHelpers } from '@/common/utils/ticket.helpers'

export const TicketModal: React.FC = () => {
    const { modalContent } = useModal()
    const isSafeQr = TicketHelpers.isSafeImageSrc(modalContent)

    return (
        <Modal>
            <div className="ticket__modal">
                {isSafeQr && (
                    <img src={modalContent} alt="Código QR ampliado" className="ticket__modal-image" />
                )}
            </div>
        </Modal>
    )
}
