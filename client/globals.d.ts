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

declare type ListViewMask = 'description' | 'url'

declare type BookmarkGroup = {
    users : string[],
    owner : string,
    name : string,
    actions : string[],
    id : string,
    idx : number,
    imageUrl ?: string,
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

declare type LoadStatus = {
    id : string,
    status : 'loading' | 'loaded' | 'failed'
}
declare type Notifier = ()=>void
declare type Transfer<T> = (value : T) => void;
declare type CollectionTransfer<T> = (collection : T[]) => void
declare type ErrorHandler = (error : Error) => void;