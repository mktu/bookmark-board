import { useMemo } from 'react'
import useGroup from './useGroup'
import useEditors from './useEditors'
import useBookmarks from './useBookmarks'
import useRequest from './useRequest'
import useRequestors from './useRequestors'
import useRefinements from './useRefinements'
import useNotifications from './useNotifications'

const useRegistrantsService = () => {
    const bookmarkServices = useBookmarks()
    const requestService = useRequest()
    const refinementServices = useRefinements()
    const monitors = useMemo(() => [bookmarkServices, requestService, refinementServices],
        [bookmarkServices, requestService, refinementServices])
    useGroup(monitors)
    useEditors()
    useRequestors()
    useNotifications()
}

export default useRegistrantsService