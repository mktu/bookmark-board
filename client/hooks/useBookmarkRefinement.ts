import { useRefinementById } from '../modules/groupRefinementSlice'
import { saveRefinement } from '../utils/localStorages/group'

export const useRefinements = (groupId?: string) => {
    const refinements = useRefinementById(groupId)
    const { colorMasks = [] } = refinements
    const updateColorFilters = (updateColors: { color: string, show: boolean }[]) => {
        const unmasked = updateColors.filter(c => c.show).map(c => c.color)
        const masked = updateColors.filter(c => !c.show).map(c => c.color)
        if (groupId) {
            let mask = colorMasks
            mask = mask.filter(v => !unmasked.includes(v))
            mask = Array.from(new Set([...mask, ...masked]))
            saveRefinement(groupId, { colorMasks: mask })
        }
    }

    return {
        updateColorFilters,
        refinements,
        colorMasks,
    }
}


