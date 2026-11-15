import { isAxiosError } from 'axios'
import { instance } from '@/common/config/http.plugin'
import type { Ticket } from '@/common/types'
import { TicketHelpers } from '@/common/utils/ticket.helpers'

export type TicketFetchResult =
    | { ok: true; ticket: Ticket }
    | { ok: false; status?: number; message: string; shouldClearSession: boolean }

export class TicketService {
    static async getByKeyPass(rawKeyPass: string): Promise<TicketFetchResult> {
        const keyPass = rawKeyPass.trim()

        if (!keyPass) {
            return {
                ok: false,
                message: 'Por favor, ingresa una clave de acceso válida.',
                shouldClearSession: false,
            }
        }

        try {
            const { data } = await instance.get<unknown>(`tickets/keyPass/${encodeURIComponent(keyPass)}`)

            if (!TicketHelpers.isValidTicket(data)) {
                return {
                    ok: false,
                    message: 'La respuesta del boleto no es válida.',
                    shouldClearSession: true,
                }
            }

            if (!TicketHelpers.isTicketAuthorized(data)) {
                return {
                    ok: false,
                    message: 'Este boleto no está activo o no corresponde a este evento.',
                    shouldClearSession: true,
                }
            }

            return { ok: true, ticket: data }
        } catch (error: unknown) {
            if (isAxiosError(error)) {
                const status = error.response?.status

                if (status === 404 || status === 401 || status === 403) {
                    return {
                        ok: false,
                        status,
                        message: 'Boleto no encontrado. Verifica tu clave de acceso.',
                        shouldClearSession: true,
                    }
                }

                const backendMsg = error.response?.data?.errors?.[0]
                return {
                    ok: false,
                    status,
                    message:
                        typeof backendMsg === 'string' && backendMsg.trim().length > 0
                            ? backendMsg
                            : 'Ocurrió un error al consultar el boleto. Intenta de nuevo.',
                    shouldClearSession: false,
                }
            }

            return {
                ok: false,
                message: 'Ocurrió un error inesperado. Intenta de nuevo.',
                shouldClearSession: false,
            }
        }
    }
}
