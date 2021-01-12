import useGroup from './useGroup'
import useEditors from './useEditors'
import useBookmarks from './useBookmarks'
import useRequest from './useRequest'
import useRequestors from './useRequestors'
import useRefinements from './useRefinements'

const useRegistrantsService = ()=>{
    const bookmarkServices = useBookmarks()
    const requestService = useRequest()
    const refinementServices = useRefinements()
    useGroup([bookmarkServices,requestService,refinementServices])
    useEditors()
    useRequestors()
}

export default useRegistrantsService