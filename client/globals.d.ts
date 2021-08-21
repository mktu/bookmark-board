declare type User = {
    uid: string,
    isAnonymous: boolean,
    name: string | null
}
declare type AuthState = {
    authState: 'loading' | 'loaded' | 'failed',
    profileState: 'loading' | 'loaded' | 'failed',
    uid: string,
}

declare type Profile = {
    name: string | null,
    comment?: string,
    id: string,
    image: string,
    lastUpdate?: number,
    twitter?: string,
}

declare type Reaction = {
    id: string,
    type: 'likes' | 'thumbs',
    user: string,
    targetId: string,
}

declare type ListViewMask = 'description' | 'url' | 'comment' | 'lastUpdate'

declare type BookmarkColorDescription = {
    color :string,
    name: string,
    idx: number,
}

declare type BookmarkColors = {
    [key: string]:BookmarkColorDescription
}

declare type BookmarkGroupIndex = {
    owner: string,
    name: string,
    description?: string,
    imageUrl?: string,
    lastUpdate?: number,
    ownerImage?: string,
    objectID: string,
    ownerId: string,
    created: number,
    numberOfLikes?:number,
}

declare type BookmarkGroup = {
    users: string[],
    owner: string,
    name: string,
    description?: string,
    actions: string[],
    id: string,
    idx: number,
    sharable?: boolean, // todo requires,
    searchable?:boolean,
    imageUrl?: string,
    lastUpdate?: number,
    colors?: BookmarkColors
}

declare type BookmarkRefinement = {
    id:string,
    likeMask?:string,
    colorMasks ?: string[],
    listViewMask?: ListViewMask[],
}

declare type Bookmark = {
    id: string,
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

declare type BookmarkComment = {
    id: string,
    groupId: string,
    comment: string,
    sender: string,
    readers: string[],
    created: number,
    lastUpdate?: number,
    reactions: Omit<Reaction, 'id' | 'targetId'>[]
}

declare type BookmarkRequest = {
    id: string,
    groupId: string,
    status: 'requesting' | 'accepted' | 'rejected',
    sender: string,
    created: number,
    lastUpdate?: number,
}

declare type Information = {
    id : string,
    content: string,
    priority?: Priority,
    contentUrl?: string,
    created: number,
    lastUpdate?: number,
}

declare type UserNotification = {
    id : string,
    type : 'information',
    content: string,
    priority: Priority,
    contentUrl?: string,
    created: number,
    read: boolean,
    sourceId?:string,
    lastUpdate?: number,
}

declare type LoadStatus = {
    id: string,
    status: 'loading' | 'loaded' | 'failed'
}
declare type Notifier = () => void
declare type Transfer<T> = (value: T) => void;
declare type CollectionTransfer<T> = (collection: T[]) => void
declare type ErrorHandler = (error: Error) => void;