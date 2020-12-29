import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useGroupById } from '../modules/groupSlice'
import { useUsersByIds } from '../modules/usersSlice'
import FirebaseContext from '../context/FirebaseContext'

const defaultColors : BookmarkColor[] = [
    ['#EF4511','Pomegranate'],
    ['#EBB910', 'Gold Tips'],
    ['#78E1A8', 'Algae Green'],
    ['#89CFFA', 'Malibu'],
    ['#A8AAB6', 'Spun Pearl'],
    ['#CD0F38', 'Crimson'],
    ['#E36E9E', 'Deep Blush'],
    ['#8302E5', 'Electric Violet']
].map(c=>({
    color : c[0],
    name : c[1]
}))

export const useBookmarkGroup = (groupId?:string)=>{
    const base = useGroupById(groupId)
    const group : BookmarkGroup = base && {
        ...base,
        colors : base.colors || defaultColors
    }
    const router = useRouter()
    const editors = useUsersByIds(group?.users || [])
    const { clientService } = useContext(FirebaseContext)
    const handleRemoveUser = (uid:string)=>{
        clientService.modifyGroup(group.id, {
            users : group.users.filter(u=>u!==uid)
        })
    }
    const handleDeleteGroup = ()=>{
        clientService.deleteGroup(group.id, () => {
            router.push('/bookmarks')
        })
    }
    const updateGroup = (key:keyof BookmarkGroup) => (value:string) => {
        clientService.modifyGroup(group.id, {
            [key] : value
        })
    }

    const updateColorName = (color:string, name:string)=>{
        const {colors} = group
        if(colors.find(v=>v.color===color && v.name !==name)){
            clientService.modifyGroup(group.id, {
                colors : colors.map(v=>v.color===color ? {color,name} : v)
            })
        }
    }
    return {
        group,
        editors,
        handleRemoveUser,
        updateGroup,
        handleDeleteGroup,
        updateColorName
    }
}