
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID
type ExtendedWindow = typeof window & {
    gtag(type: 'config', googleAnalyticsId: string, { page_path: string })
    gtag(
        type: 'event',
        eventAction: string,
        fieldObject: {
            event_label: string
            event_category: string
            value?: string
        }
    )
}
// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url:string) => {
    (window as ExtendedWindow).gtag('config', GA_TRACKING_ID, {
        page_path: url,
    })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }:{
    action:string,
    category:string,
    label?:string,
    value?:string
}) => {
    (window as ExtendedWindow).gtag('event', action, {
        event_category: category,
        event_label: label || '',
        value: value || '',
    })
}