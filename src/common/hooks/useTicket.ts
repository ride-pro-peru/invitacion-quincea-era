import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import type { AppDispatch, RootState } from '@/store/store'
import { clearTicketState } from '@/store/ticket/ticket.slice'
import { startCheckingTicket, startGettingTicket } from '@/store/ticket/ticket.thunk'
import { closeMenu } from '@/store/ui/menu.slice'
import { closeModal } from '@/store/ui/modal.slice'
import { TicketHelpers } from '@/common/utils/ticket.helpers'
import { useInvitationConfig } from './useInvitationConfig'

export const useTicket = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { templateName } = useInvitationConfig()
    const { error, isLoading, isChecking, ticket } = useSelector(
        (state: RootState) => state.ticket
    )

    const onGetTicket = useCallback(
        async (keyPass: string): Promise<boolean> => {
            return await dispatch(startGettingTicket(keyPass, templateName))
        },
        [dispatch, templateName]
    )

    const onRefreshTicket = useCallback(
        async (keyPass: string): Promise<boolean> => {
            return await dispatch(
                startGettingTicket(keyPass, templateName, { silent: true })
            )
        },
        [dispatch, templateName]
    )

    const onRemoveTicket = useCallback(() => {
        TicketHelpers.clearStoredTicket(templateName)
        dispatch(clearTicketState())
        dispatch(closeMenu())
        dispatch(closeModal())
    }, [dispatch, templateName])

    const onCheckInitialData = useCallback(() => {
        void dispatch(startCheckingTicket(templateName))
    }, [dispatch, templateName])

    return {
        error,
        isLoading,
        isChecking,
        ticket,

        onGetTicket,
        onRefreshTicket,
        onRemoveTicket,
        onCheckInitialData,
    }
}
