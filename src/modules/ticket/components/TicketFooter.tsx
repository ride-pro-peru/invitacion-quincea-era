import React from 'react'
import type { Ticket } from '@/common/types'

interface Props {
    ticket: Ticket
}

export const TicketFooter: React.FC<Props> = ({ ticket }) => {
    return (
        <footer className="ticket__footer">
            <span className="ticket__footer-label">Folio:</span>
            <strong className="ticket__footer-number">{ticket.keyPass}</strong>
        </footer>
    )
}
