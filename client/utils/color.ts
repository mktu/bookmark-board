export const createKey = () => Math.random().toString(32).substring(2)
export const defaultColors: BookmarkColors = [
    ['#EF4511', 'グループ1'],
    ['#EBB910', 'グループ2'],
    ['#78E1A8', 'グループ3'],
    ['#89CFFA', 'グループ4'],
].reduce((acc, cur, idx) => {
    const key = createKey()
    acc[key] = {
        color: cur[0],
        name: cur[1],
        idx
    }
    return acc
}, {})

