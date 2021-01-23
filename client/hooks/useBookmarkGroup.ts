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
].reduce((acc, cur, idx) => {
    acc[cur[0]] = {
        color: cur[0],
        name: cur[1],
        idx
    }
    return acc
}, {})

const useRefinements = (groupId?: string)=>{
    const base = useRefinementById(groupId)
    const [updateRefinement, setUpdateRefinement] = useState<Partial<BookmarkRefinement>>({})
    const refinements = {...(base || {}), ...updateRefinement}
    const {colorMasks = []} = refinements
    const updateColorFilters = (updateColors:{color: string, show: boolean}[]) => {
        const unmasked = updateColors.filter(c=>c.show).map(c=>c.color)
        const masked = updateColors.filter(c=>!c.show).map(c=>c.color)
        if(groupId){
            let mask = colorMasks
            mask = mask.filter(v=>!unmasked.includes(v))
            mask = Array.from(new Set([...mask,...masked]))
            setUpdateRefinement({colorMasks : mask})
        }
    }
    const hasChangeRefinement = Object.keys(updateRefinement).length > 0 
    const handleSaveRefinements = ()=>{
        hasChangeRefinement && saveRefinement(groupId, updateRefinement)
    }

    return {
        updateColorFilters,
        handleSaveRefinements,
        refinements,
        colorMasks,
        hasChangeRefinement
    }
}

export const useBookmarkGroup = (groupId?: string) => {
    const base = useGroupById(groupId)
    const {
        colorMasks,
        hasChangeRefinement,
        handleSaveRefinements,
        updateColorFilters
    } = useRefinements(groupId)
    const [update, setUpdate] = useState<Partial<BookmarkGroup>>({})
    const hydrateColor = base && base.colors || defaultColors
    const group: BookmarkGroup = base && {
        ...base,
        //colors: base.colors || defaultColors,
        colors: Object.keys(hydrateColor).reduce((acc,cur,idx)=>{
            acc[cur] = {idx,...hydrateColor[cur]}
            return acc
        },{} as BookmarkColors),
        ...update
    }
    const colors = useMemo(() => {
        if (!group) return []
        return Object.keys(group.colors).sort((a,b)=>{
            return group.colors[a].idx - group.colors[b].idx
        }).map(c => ({
            ...group.colors[c],
            show : !colorMasks.includes(c)
        }))
    }, [group?.colors,colorMasks])
    const router = useRouter()
    const editors = useUsersByIds(group?.users || [])
    const { clientService } = useContext(FirebaseContext)
    const handleRemoveUser = (uid: string) => {
        setUpdate({
            users: group.users.filter(u => u !== uid)
        })
    }
    const handleDeleteGroup = () => {
        clientService.deleteGroup(group.id, () => {
            router.push('/bookmarks')
        })
    }
    const updateGroup = (key: keyof BookmarkGroup) => (value: string) => {
        setUpdate({
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

    const handleChangeColorIndex = (color:string,next:number)=>{
        const indecies = colors.map(c=>({color:c.color,remove:color===c.color}))
        indecies.splice(next,0,{color,remove:false})
        const newIndecies = indecies.filter(c=>!c.remove).map(c=>c.color)
        const update = newIndecies.reduce((acc,cur,idx)=>{
            acc[cur].idx = idx
            return acc
        },{...group.colors})
        setUpdate({colors:update})
    }
    
    const handleAddColor = (name:string,color:string)=>{
        if(group.colors[color]){
            toast.warn('すでにこの色は登録されています')
            return
        }
        const idx = Object.keys(group.colors).length 
        const colors : typeof group.colors = { ...group.colors, [color] : { name , color, idx } }
        setUpdate({colors})
    }
    const handleDeleteColors = (deleteColors:string[])=>{
        const colors : typeof group.colors = { ...group.colors }
        for(const c of deleteColors){
            if(colors[c]){
                delete colors[c]
            }
        }
        setUpdate({colors})
    }
    const hasChangeGroup = Object.keys(update).length > 0 
    const hasChange = hasChangeGroup || hasChangeRefinement
    const handleSubmit = (notifier?:Notifier)=>{
        if(!hasChange){
            return
        }
        if(hasChangeGroup){
            clientService.modifyGroup(groupId, update, ()=>{
                handleSaveRefinements()
                notifier()
            })
            return
        }
        handleSaveRefinements()
        notifier()
    }
    return {
        group,
        editors,
        colors,
        updateColorFilters,
        handleRemoveUser,
        updateGroup,
        handleDeleteGroup,
        updateColor,
        handleAddColor,
        handleDeleteColors,
        handleChangeColorIndex,
        handleSubmit,
        hasChange
    }
}
