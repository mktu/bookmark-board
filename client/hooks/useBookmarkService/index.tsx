import useGroup from './useGroup'
import useEditors from './useEditors'
import useBookmarks from './useBookmarks'
import useRequest from './useRequest'
import useRequestors from './useRequestors'

const useBookmarkService = ()=>{
    const bookmarkServices = useBookmarks()
    const requestService = useRequest()
    useGroup([bookmarkServices,requestService])
    useEditors()
    useRequestors()
}

export default useBookmarkService