export type BookmarkGroup = {
    owner: string,
    name: string,
    description?: string,
    sharable?: boolean, // todo requires,
    searchable?:boolean,
    imageUrl?: string,
    lastUpdate?: number,
    numberOfLikes?: number
}

export type Profile = {
    name: string | null,
    comment?: string,
    image: string,
    twitter?: string,
}

export type BookmarkGroupIndex = {
    owner: string,
    name: string,
    description?: string,
    imageUrl?: string,
    lastUpdate?: number,
    ownerImage?: string,
    numberOfLikes?:number,

    objectID: string,
    ownerId: string,
    created: number
}