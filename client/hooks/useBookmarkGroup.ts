import { useContext, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useGroupById } from '../modules/groupSlice'
import { useUsersByIds } from '../modules/usersSlice'
import { useRefinementById } from '../modules/groupRefinementSlice'
import FirebaseContext from '../context/FirebaseContext'
import { saveRefinement } from '../utils/localStorages/group'

const defaultColors: BookmarkColors = [
    ['#EF4511', 'Pomegranate'],
    ['#EBB910', 'Gold Tips'],
    ['#78E1A8', 'Algae Green'],
    ['#89CFFA', 'Malibu'],
    ['#A8AAB6', 'Spun Pearl'],
    ['#CD0F38', 'Crimson'],
    ['#E36E9E', 'Deep Blush'],
    ['#8302E5', 'Electric Violet']
].reduce((acc, cur) => {
    acc[cur[0]] = {
        color: cur[0],
        name: cur[1],
        show: true
    }
    return acc
}, {})

export const useBookmarkGroup = (groupId?: string) => {
    const base = useGroupById(groupId)
    const refinements = useRefinementById(groupId)
    const {colorMasks = []} = refinements || {}
    const group: BookmarkGroup = base && {
        ...base,
        colors: base.colors || defaultColors
    }
    const colors = useMemo(() => {
        if (!group) return []
        return Object.keys(group.colors).sort().map(c => ({
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
            clientService.modifyGroup(group.id, {
                colors
            })
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
    return {
        group,
        editors,
        colors,
        handleRemoveUser,
        updateGroup,
        handleDeleteGroup,
        updateColor,
        filterColor,
        filterColors
    }
}