import type { ButtonVariant } from './button.types'
import type { MenuVariant } from './menu.types'
import type { MusicPlayerVariant } from './music-player.types'

export type EventType = 'wedding' | 'graduation' | 'graduacion' | 'xv' | 'general'

export interface CommercialConfig {
    packageName?: string
    basePrice?: number
    ticketPrice?: number
    addonsPrice?: number
    totalPrice?: number
    [key: string]: unknown
}

export interface EnvelopeConfig {
    showEnvelope?: boolean
    showEnvelop?: boolean
    type?: 'cerrado-abierto' | 'video-apertura' | 'animacion-apertura'
    [key: string]: unknown
}

export interface ConfirmationSectionConfig {
    showConfirmation?: boolean
    type?: 'abrasa' | 'whatsapp' | 'phone call' | null
    isQuantityFree?: boolean | null
    whatsappPhone?: string | null
    whatsappMessage?: string | null
    [key: string]: unknown
}

export interface UIConfig {
    menu?: {
        show?: boolean
        showMenu?: boolean
        variant?: MenuVariant
        title?: string
        buttonVariant?: ButtonVariant
    }
    music?: {
        show?: boolean
        showMusic?: boolean
        variant?: MusicPlayerVariant
        title?: string
        buttonVariant?: ButtonVariant
        songTitle?: string
        artistName?: string
    }
}

export interface ThemeConfig {
    fontPack: number
    palette: number
    buttonVariant?: ButtonVariant
    menu?: UIConfig['menu']
    music?: UIConfig['music']
}

export interface SectionItemConfig {
    title?: string
    [key: string]: unknown
}

export interface LocationItem {
    title?: string
    venue?: string
    location?: string
    time?: string
    date?: string
    url?: string
    showPhotos?: boolean
    showVideo?: boolean
    note?: string
    [key: string]: unknown
}

export interface ScratchRevealConfig {
    showScratchReveal?: boolean
    bgImage?: string
    scratchImage?: string
    hiddenText?: string
    [key: string]: unknown
}

export interface LodgingItem {
    name?: string
    address?: string
    phone?: string
    rateInfo?: string
}

export interface LodgingAndWeatherConfig {
    showLodging?: boolean
    title?: string
    hotels?: LodgingItem[]
    weatherCity?: string
    [key: string]: unknown
}

export interface TimelineItem {
    date?: string
    title?: string
    description?: string
}

export interface OurStoryConfig {
    showOurStory?: boolean
    title?: string
    quoteOrPoem?: string
    timeline?: TimelineItem[]
    [key: string]: unknown
}

export interface FaqItem {
    question?: string
    answer?: string
}

export interface MenuCourseItem {
    course?: string
    name?: string
    description?: string
}

export interface FaqAndMenuConfig {
    showFaqAndMenu?: boolean
    title?: string
    faqs?: FaqItem[]
    menuCourses?: MenuCourseItem[]
    [key: string]: unknown
}

export interface PlaylistAndPhotosConfig {
    showPlaylistAndPhotos?: boolean
    title?: string
    playlistUrl?: string
    qrAlbumUrl?: string
    [key: string]: unknown
}

export interface MonogramConfig {
    showMonogram?: boolean
    title?: string
    monogramImage?: string
    initials?: string
    [key: string]: unknown
}

export interface AddonsConfig {
    lodgingAndWeather?: LodgingAndWeatherConfig
    ourStory?: OurStoryConfig
    faqAndMenu?: FaqAndMenuConfig
    playlistAndPhotos?: PlaylistAndPhotosConfig
    monogram?: MonogramConfig
    scratchReveal?: ScratchRevealConfig
    [key: string]: unknown
}

export interface SectionsConfig {
    envelop?: EnvelopeConfig
    envelope?: EnvelopeConfig
    hero?: SectionItemConfig & {
        showHero?: boolean
        names?: string
        subtitle?: string
        date?: string
        city?: string
        bgImage?: string
    }
    scratchReveal?: ScratchRevealConfig
    message?: SectionItemConfig & {
        showMessage?: boolean
        message?: string
        quote?: string
    }
    countdown?: SectionItemConfig & { showCountdown?: boolean; targetDate?: string }
    family?: Omit<SectionItemConfig, 'title'> & {
        showFamily?: boolean
        title?: string | null
        parents?: string[]
        godparents?: string[]
    }
    places?: SectionItemConfig & { showPlaces?: boolean; locations?: LocationItem[] }
    graduates?: SectionItemConfig & { showGraduates?: boolean }
    itinerary?: SectionItemConfig & {
        showItinerary?: boolean
        itinerary?: Array<{ time?: string; event?: string }>
    }
    dressCode?: SectionItemConfig & {
        showDressCode?: boolean
        title?: string
        description?: string
        attire?: { men?: string; women?: string }
        colors?: { suggested?: string[]; avoid?: string[] }
    }
    details?: SectionItemConfig & {
        showDetails?: boolean
        title?: string
        noKids?: boolean
        noKidsMessage?: string
        punctuality?: boolean
        punctualityMessage?: string
        hashtag?: string
    }
    gallery?: Omit<SectionItemConfig, 'title'> & {
        showGallery?: boolean
        title?: string | null
        variant?: string | null
        maxPhotos?: number | null
        images?: string[]
    }
    guestPhotos?: SectionItemConfig & {
        showGuestPhotos?: boolean
        title?: string
        subtitle?: string
        albumUrl?: string
    }
    presents?: Omit<SectionItemConfig, 'title'> & {
        showPresents?: boolean
        title?: string | null
        url?: string | null
        bankDetails?: {
            bank?: string | null
            holder?: string | null
            clabe?: string | null
            account?: string | null
        }
        envelopeRain?: boolean | null
    }
    confirmation?: ConfirmationSectionConfig
    rsvp?: SectionItemConfig & { showRsvp?: boolean }
    farewell?: SectionItemConfig & {
        showFarewell?: boolean
        hashtag?: string
        thankYouMessage?: string
    }
    ticket?: SectionItemConfig & { showTicket?: boolean }
    addons?: AddonsConfig
    [key: string]: unknown
}

export interface InvitationConfigState {
    metaTitle?: string
    eventType?: EventType
    packageTier?: string
    commercial?: CommercialConfig
    theme: ThemeConfig
    ui?: UIConfig
    config: Record<string, boolean>
    sections: SectionsConfig
}
