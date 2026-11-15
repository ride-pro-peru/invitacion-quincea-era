export const APP_ROUTES = {
    root: '/',
    invitation: '/invitation',
    ticket: '/ticket',
    envelope: '/envelope',
    search: '/search',
} as const

export type AppRoute = (typeof APP_ROUTES)[keyof typeof APP_ROUTES]
