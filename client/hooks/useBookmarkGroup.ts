import { useContext, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useGroupById } from '../modules/groupSlice'
import { useUsersByIds } from '../modules/usersSlice'
import { useRefinementById } from '../modules/groupRefinementSlice'
import FirebaseContext from '../context/FirebaseContext'
import { saveRefinement } from '../utils/localStorages/group'

const defaultColors: BookmarkColors = [
    ['#EF4511', 'グループ1'],
    ['#EBB910', 'グループ2'],
    ['#78E1A8', 'グループ3'],
    ['#89CFFA', 'グループ4'],
].reduce((acc, cur) => {
    acc[cur[0]] = {
        color: cur[0],
        name: cur[1],
    }
    return acc
}, {})

export const useBookmarkGroup = (groupId?: string) => {
    const base = useGroupById(groupId)
    const refinements = useRefinementById(groupId)
    const {colorMasks = []} = refinements || {}
    const [update, setUpdate] = useState<Partial<BookmarkGroup>>({})
    const group: BookmarkGroup = base && {
        ...base,
        colors: base.colors || defaultColors,
        ...update
    }
    const colors = useMemo(() => {
        if (!group) return []
        return Object.keys(group.colors).sort((a,b)=>{
            return group.colors[a].name < group.colors[b].name ? -1 : 1
        }).map(c => ({
            ...group.colors[c],
            show : !colorMasks.includes(c)
        }))
    }, [group?.colors,colorMasks])
    const router = useRouter()
    const editors = useUsersByIds(group?.users || [])
    const { clientService } = useContext(FirebaseContext)
    const handleRemoveUser = (uid: string) => {
        clientService.modifyGroup(group.id, {
            users: group.users.filter(u => u !== uid)
        })
    }
    const handleDeleteGroup = () => {
        clientService.deleteGroup(group.id, () => {
            router.push('/bookmarks')
        })
    }
    const updateGroup = (key: keyof BookmarkGroup) => (value: string) => {
        clientService.modifyGroup(group.id, {
            [key]: value
        })
    }

    const updateColor = (color: string, data: Partial<BookmarkColorDescription>) => {
        const colors = { ...group.colors }
        if (colors[color]) {
            colors[color] = { ...colors[color], ...data }
            setUpdate({colors})
        }
    }
    const filterColor = (color: string, show: boolean) => {
        if(groupId){
            let mask = colorMasks
            if(show){
                mask = mask.filter(v=>v!==color)
            }else{
                mask = Array.from(new Set([...mask,color]))
            }
            saveRefinement(groupId, {colorMasks : mask})
        }
    }
    const filterColors = (show:boolean) => {
        if(show){
            saveRefinement(groupId, {colorMasks : []})
        } else {
            saveRefinement(groupId, {colorMasks : colors.map(c=>c.color)})
        }
    }
    const handleAddColor = (name:string,color:string)=>{
        if(group.colors[color]){
            toast.warn('すでにこの色は登録されています')
            return
        }
        const colors : typeof group.colors = { ...group.colors, [color] : { name , color } }
        setUpdate({colors})
    }
    const handleDeleteColor = (color:string)=>{
        if(!group.colors[color]){
            return
        }
        const colors : typeof group.colors = { ...group.colors }
        delete colors[color]
        setUpdate({colors})
    }
    const hasChange = Object.keys(update).length > 0 
    const handleSubmit = (notifier?:Notifier)=>{
        if(!hasChange){
            return
        }
        clientService.modifyGroup(groupId, update, notifier)
    }
    return {
        group,
        editors,
        colors,
        handleRemoveUser,
        updateGroup,
        handleDeleteGroup,
        updateColor,
        filterColor,
        filterColors,
        handleAddColor,
        handleDeleteColor,
        handleSubmit,
        hasChange
    }
}
