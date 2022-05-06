export function combineGroups<GroupLike extends { id: string }, BookmarkLike extends { groupId: string }>(
    groups: GroupLike[],
    bookmarks: BookmarkLike[],
    size: number
) {
    let sum = 0
    return groups.map(g => {
        if (size <= sum) {
            return ({
                ...g,
                bookmarks: []
            })
        }
        const b = bookmarks.filter(b => b.groupId === g.id)
        const nextRead = sum + b.length > size ? Math.min(size, size - sum) : b.length
        const targets = ({
            ...g,
            bookmarks: nextRead > 0 ? b.slice(0, nextRead) : []
        })
        sum += nextRead

        return targets
    }).filter(g => g.bookmarks.length > 0)
}