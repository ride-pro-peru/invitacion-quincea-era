import React from 'react'
import { TicketHeader } from './components/TicketHeader'
import { TicketBody } from './components/TicketBody'
import { TicketFooter } from './components/TicketFooter'
import { TicketTableSection } from './components/TicketTableSection'
import { TicketNotice } from './components/TicketNotice'
import { useTicket } from '@/common/hooks'

import bg from '@/assets/images/backgrounds/bg-tickets.jpg';

export const Ticket: React.FC = () => {
    const { ticket } = useTicket()

    if (!ticket) return null

    return (
        <div className="ticket">
            <div className="ticket__bg" style={{ backgroundImage: `url(${bg})` }} />

            <div className="ticket__container">
                <div className="ticket__content">
                    <TicketHeader />

                    <div className="ticket__divider">
                        <div className="ticket__dashed-line" />
                    </div>

                    <TicketBody ticket={ticket} />

                    <div className="ticket__divider">
                        <div className="ticket__dashed-line" />
                    </div>

                    <TicketTableSection ticket={ticket} />

                    <div className="ticket__divider">
                        <div className="ticket__dashed-line" />
                    </div>

                    <TicketNotice />

                    <div className="ticket__divider">
                        <div className="ticket__dashed-line" />
                    </div>

                    <TicketFooter ticket={ticket} />
                </div>
            </div>
        </div>
    )
}
