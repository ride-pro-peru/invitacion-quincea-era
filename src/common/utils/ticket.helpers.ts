import type { Ticket } from '@/common/types'

export class TicketHelpers {
    private static readonly STORAGE_PREFIX = 'tuamigoinvitaciones'

    private static isString(value: unknown): value is string {
        return typeof value === 'string'
    }

    private static isNonEmptyString(value: unknown): value is string {
        return typeof value === 'string' && value.trim().length > 0
    }

    private static isNonNegativeNumber(value: unknown): value is number {
        return typeof value === 'number' && Number.isFinite(value) && value >= 0
    }

    static getStorageKey(templateName: string): string {
        const normalized = templateName.trim()
        return `${this.STORAGE_PREFIX}-${normalized || 'default'}`
    }

    static isValidTicket(value: unknown): value is Ticket {
        if (typeof value !== 'object' || value === null) return false

        const candidate = value as Record<string, unknown>

        return (
            this.isNonEmptyString(candidate.id) &&
            this.isNonEmptyString(candidate.name) &&
            this.isNonNegativeNumber(candidate.adultsQuantity) &&
            this.isNonNegativeNumber(candidate.adultsCounter) &&
            this.isNonNegativeNumber(candidate.kidsQuantity) &&
            this.isNonNegativeNumber(candidate.kidsCounter) &&
            this.isString(candidate.qrCode) &&
            this.isString(candidate.phone) &&
            this.isNonEmptyString(candidate.keyPass) &&
            typeof candidate.isActive === 'boolean' &&
            this.isNonEmptyString(candidate.event) &&
            this.isString(candidate.user) &&
            this.isString(candidate.table)
        )
    }

    static isTicketAuthorized(ticket: Ticket): boolean {
        if (!ticket.isActive) return false

        const configuredEventId = import.meta.env.VITE_EVENT_ID?.trim()
        if (!configuredEventId) return true

        return ticket.event === configuredEventId
    }

    static isSafeImageSrc(src?: string | null): boolean {
        if (!src) return false
        const trimmed = src.trim()

        if (trimmed.startsWith('https://') || trimmed.startsWith('data:image/')) {
            return true
        }

        if (import.meta.env.DEV && trimmed.startsWith('http://')) {
            return true
        }

        return false
    }

    static getStoredKeyPass(templateName: string): string | null {
        const key = this.getStorageKey(templateName)
        const raw = localStorage.getItem(key)
        if (!raw) return null

        try {
            const parsed = JSON.parse(raw) as unknown
            if (typeof parsed === 'object' && parsed !== null && 'keyPass' in parsed) {
                const keyPass = (parsed as { keyPass?: unknown }).keyPass
                if (this.isNonEmptyString(keyPass)) {
                    return keyPass.trim()
                }
            }
        } catch {
            // Limpiamos el registro si está corrupto
        }

        localStorage.removeItem(key)
        return null
    }

    static setStoredKeyPass(templateName: string, keyPass: string): void {
        const trimmed = keyPass.trim()
        if (!trimmed) return

        localStorage.setItem(
            this.getStorageKey(templateName),
            JSON.stringify({ keyPass: trimmed })
        )
    }

    static clearStoredTicket(templateName: string): void {
        localStorage.removeItem(this.getStorageKey(templateName))
    }
}
