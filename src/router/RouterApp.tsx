import React, { useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { Envelope, Invitation, Search, Ticket } from '@/modules'
import { useInvitationConfig, useTicket } from '@/common/hooks'
import { TicketHelpers } from '@/common/utils/ticket.helpers'
import { APP_ROUTES } from './routes'

export const RouterApp: React.FC = () => {
    const { config, templateName } = useInvitationConfig()
    const { ticket, isChecking, onCheckInitialData } = useTicket()

    const hasTicketingSystem = Boolean(config.hasTicketingSystem)
    const hasTicket = Boolean(ticket)

    useEffect(() => {
        if (hasTicketingSystem) {
            onCheckInitialData()
        }
    }, [hasTicketingSystem, onCheckInitialData])

    useEffect(() => {
        if (!hasTicketingSystem) return

        const storageKey = TicketHelpers.getStorageKey(templateName)
        const onStorage = (e: StorageEvent) => {
            if (e.key === storageKey || e.key === null) onCheckInitialData()
        }

        window.addEventListener('storage', onStorage)
        return () => window.removeEventListener('storage', onStorage)
    }, [hasTicketingSystem, templateName, onCheckInitialData])

    if (hasTicketingSystem && isChecking) return null

    if (!hasTicketingSystem) {
        return (
            <Routes>
                <Route path={APP_ROUTES.root} element={<Invitation />} />
                <Route path={APP_ROUTES.invitation} element={<Invitation />} />
                <Route path={APP_ROUTES.envelope} element={<Envelope />} />
                <Route path="*" element={<Navigate to={APP_ROUTES.root} replace />} />
            </Routes>
        )
    }

    if (!hasTicket) {
        return (
            <Routes>
                <Route path={APP_ROUTES.search} element={<Search />} />
                <Route path="*" element={<Navigate to={APP_ROUTES.search} replace />} />
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path={APP_ROUTES.root} element={<Invitation />} />
            <Route path={APP_ROUTES.invitation} element={<Invitation />} />
            <Route path={APP_ROUTES.ticket} element={<Ticket />} />
            <Route path={APP_ROUTES.envelope} element={<Envelope />} />
            <Route path={APP_ROUTES.search} element={<Navigate to={APP_ROUTES.envelope} replace />} />
            <Route path="*" element={<Navigate to={APP_ROUTES.invitation} replace />} />
        </Routes>
    )
}
