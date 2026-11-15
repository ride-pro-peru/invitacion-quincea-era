import invitationConfig from '../../../invitation.config.json'
import type { ThemeConfig, SectionsConfig, EventType, UIConfig } from '@/common/types'

export const useInvitationConfig = () => {
    const templateName = invitationConfig.templateName as string;
    const eventType = (invitationConfig as { eventType?: EventType }).eventType
    const theme = invitationConfig.theme as ThemeConfig
    const ui = (invitationConfig as { ui?: UIConfig }).ui
    const config = invitationConfig.config as Record<string, boolean>
    const sections = invitationConfig.sections as SectionsConfig

    return {
        templateName,
        eventType,
        theme,
        ui,
        config,
        sections,
        getSection: <K extends keyof SectionsConfig>(sectionKey: K) => {
            return sections[sectionKey]
        },
    }
}
