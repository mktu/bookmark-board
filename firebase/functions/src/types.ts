export type Bookmark = {
    url: string,
    title?: string,
    description?: string,
    comment?: string,
    neighbors: [],
    image?: string,
    images?:string[],
    groupId: string,
    owner: string,
    created: number,
    lastUpdate?: number,
    idx: number,
    unacquired?: boolean,
    reactions: { [key: string]: string[] },
    color?: string,
    disableEndpoint?:boolean
}

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
    lineid ?: string,
    lineInfo ?: {
        id : string,
        name : string,
        defaultGroup?: string
    }
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

type Priority = 'normal' | 'low' | 'high'

export type Information = {
    content: string,
    priority?: Priority,
    contentUrl?: string,
    created: number,
    lastUpdate?: number,
}

export type NotificationType = 'information'

export type Notification = {
    type : NotificationType,
    content: string,
    priority: Priority,
    contentUrl?: string,
    created: number,
    read: boolean,
    sourceId?:string,
    lastUpdate?: number,
}