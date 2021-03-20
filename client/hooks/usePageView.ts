import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { GA_TRACKING_ID, pageview } from '@utils/gtag'

export default function usePageView() {
    const router = useRouter()
    useEffect(() => {
        if (!GA_TRACKING_ID) {
            return
        }

        const handleRouteChange = (path) => {
            pageview(path)
        }

        router.events.on('routeChangeComplete', handleRouteChange)
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, [router.events])
}