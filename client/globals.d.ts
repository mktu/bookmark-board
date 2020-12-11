declare type User = {
    uid : string,
    isAnonymous : boolean,
    name : string | null
}
declare type Profile = {
    name : string | null,
    id : string,
    image : string,
    loading : boolean,
    lastUpdate ?: number
}

declare type Reaction = {
    id : string,
    type : 'likes'|'thumbs',
    user : string,
    targetId : string,
}

declare type ListViewMask = 'description' | 'url'

declare type BookmarkGroup = {
    users : string[],
    owner : string,
    name : string,
    description ?: string,
    actions : string[],
    id : string,
    idx : number,
    sharable ?: boolean, // todo requires,
    imageUrl ?: string,
    lastUpdate ?: number,
    listViewMask ?: ListViewMask[]
}

declare type Bookmark = {
    id : string,
    url : string,
    title ?: string,
    description ?:string,
    neighbors : [],
    image ?: string,
    groupId : string,
    owner : string,
    created : number,
    lastUpdate ?: number,
    idx : number,
    unacquired ?: boolean,
    reactions : {[key:string]:string[]},
}

declare type BookmarkComment = {
    id : string,
    groupId : string,
    comment : string,
    sender : string,
    readers : string[],
    created : number,
    lastUpdate ?: number,
    reactions : Omit<Reaction,'id'|'targetId'>[]
}

declare type BookmarkRequest = {
    id : string,
    groupId : string,
    status : 'requesting' | 'accepted' | 'rejected',
    sender : string,
    created : number,
    lastUpdate ?: number,
}

declare type LoadStatus = {
    id : string,
    status : 'loading' | 'loaded' | 'failed'
}
declare type Notifier = ()=>void
declare type Transfer<T> = (value : T) => void;
declare type CollectionTransfer<T> = (collection : T[]) => void
declare type ErrorHandler = (error : Error) => void;