import { toast } from 'sonner'
import type { AppDispatch, RootState } from '../store'
import { setError, setIsChecking, setIsLoading, setTicket } from './ticket.slice'
import { TicketHelpers } from '@/common/utils/ticket.helpers'
import { TicketService } from '@/common/services/ticket.service'

interface GetTicketOptions {
    silent?: boolean
}

export const startGettingTicket = (
    keyPass: string,
    templateName: string,
    options?: GetTicketOptions
) => {
    return async (dispatch: AppDispatch): Promise<boolean> => {
        dispatch(setIsLoading(true))
        dispatch(setError(null))

        try {
            const result = await TicketService.getByKeyPass(keyPass)

            if (!('ticket' in result)) {
                if (result.shouldClearSession) {
                    TicketHelpers.clearStoredTicket(templateName)
                    dispatch(setTicket(null))
                }

                dispatch(setError(result.message))
                if (!options?.silent) {
                    toast.error(result.message)
                }
                return false
            }

            dispatch(setTicket(result.ticket))
            TicketHelpers.setStoredKeyPass(templateName, result.ticket.keyPass)

            if (!options?.silent) {
                toast.success(`Bienvenido ${result.ticket.name}`)
            }

            return true
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}

export const startCheckingTicket = (templateName: string) => {
    return async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
        dispatch(setIsChecking(true))
        dispatch(setError(null))

        try {
            const storedKeyPass = TicketHelpers.getStoredKeyPass(templateName)

            if (!storedKeyPass) {
                const envTicket = import.meta.env.VITE_TICKET_ID ? getState().ticket.ticket : null
                dispatch(setTicket(envTicket))
                return
            }

            const result = await TicketService.getByKeyPass(storedKeyPass)

            if (!('ticket' in result)) {
                if (result.shouldClearSession) {
                    TicketHelpers.clearStoredTicket(templateName)
                }
                dispatch(setError(result.message))
                dispatch(setTicket(null))
                return
            }

            dispatch(setTicket(result.ticket))
            TicketHelpers.setStoredKeyPass(templateName, result.ticket.keyPass)
        } finally {
            dispatch(setIsChecking(false))
        }
    }
}
