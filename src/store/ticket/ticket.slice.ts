import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Ticket } from '@/common/types'

interface InitialState {
    ticket: Ticket | null
    isLoading: boolean
    isChecking: boolean
    error: string | null
}

const getEnvTicket = (): Ticket | null => {
    if (!import.meta.env.VITE_TICKET_ID) {
        return null
    }

    return {
        id: import.meta.env.VITE_TICKET_ID,
        name: import.meta.env.VITE_TICKET_NAME || '',
        adultsQuantity: Number(import.meta.env.VITE_TICKET_ADULTS_QUANTITY ?? 0),
        adultsCounter: Number(import.meta.env.VITE_TICKET_ADULTS_COUNTER ?? 0),
        kidsQuantity: Number(import.meta.env.VITE_TICKET_KIDS_QUANTITY ?? 0),
        kidsCounter: Number(import.meta.env.VITE_TICKET_KIDS_COUNTER ?? 0),
        qrCode: import.meta.env.VITE_TICKET_QR_CODE || '',
        phone: import.meta.env.VITE_TICKET_PHONE || '',
        keyPass: import.meta.env.VITE_TICKET_KEY_PASS || '',
        isActive: import.meta.env.VITE_TICKET_IS_ACTIVE === 'true',
        event: import.meta.env.VITE_TICKET_EVENT || '',
        user: import.meta.env.VITE_TICKET_USER || '',
        table: import.meta.env.VITE_TICKET_TABLE || '',
    }
}

const initialState: InitialState = {
    ticket: getEnvTicket(),
    isLoading: false,
    isChecking: true,
    error: null,
}

export const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers: {
        setTicket: (state, { payload }: PayloadAction<Ticket | null>) => {
            state.ticket = payload
            state.isChecking = false
            if (payload) {
                state.error = null
            }
        },
        setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
            state.isLoading = payload
        },
        setIsChecking: (state, { payload }: PayloadAction<boolean>) => {
            state.isChecking = payload
        },
        setError: (state, { payload }: PayloadAction<string | null>) => {
            state.error = payload
        },
        clearTicketState: (state) => {
            state.ticket = null
            state.isLoading = false
            state.isChecking = false
            state.error = null
        },
    },
})

export const {
    setTicket,
    setIsLoading,
    setIsChecking,
    setError,
    clearTicketState,
} = ticketSlice.actions

export default ticketSlice.reducer
