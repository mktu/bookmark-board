import {useState,useContext,useCallback,useRef,useEffect} from 'react'
import FirebaseContext from '../context/FirebaseContext'
import { useLinkPreview } from '../components/Common/LinkPreview'

const useNewBookmark = (groupId:string)=>{
    const unmounted = useRef(false)
    const [bookmarkInput, setBookmarkInput] = useState('')
    const { linkData, url, status } = useLinkPreview({ text: bookmarkInput })
    const invalidUrl = status === 'none' && Boolean(bookmarkInput)
    const { clientService } = useContext(FirebaseContext)
    useEffect(()=>{
        unmounted.current = false
        return ()=>{
            unmounted.current = true
        }
    },[])
    const onChangeBookmarkInput = useCallback((e:React.ChangeEvent<HTMLInputElement>)=>{
        setBookmarkInput(e.target.value)
    },[])
    const submit = useCallback(() => {
        if (invalidUrl) return
        const hasLinkData = Boolean(linkData)
        let data;
        if (hasLinkData) {
            data = {
                url,
                title: linkData.title,
                image: linkData.images.length > 0 && linkData.images[0],
                description: linkData.description || '',
                neighbors: [],
                groupId,
                reactions: {},
            }
        }
        else {
            data = {
                url,
                neighbors: [],
                groupId,
                reactions: {},
                unacquired: true
            }
        }
        !invalidUrl && clientService.addBookmark(data, () => {
            !unmounted.current && setBookmarkInput('')
        })
    },[invalidUrl,clientService,url,linkData])
    
    const onKeyPress = useCallback((e:React.KeyboardEvent<HTMLInputElement>)=>{
        if (e.key == 'Enter') {
            submit()
            e.preventDefault()
        }
    },[submit])

    return {
        status,
        url,
        linkData,
        invalidUrl,
        bookmarkInput,
        submit,
        setBookmarkInput,
        onChangeBookmarkInput,
        onKeyPress
    }
}

export default useNewBookmark

