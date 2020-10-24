declare type User = {
    uid : string,
    isAnonymous : Boolean,
    name : string | null
}
declare type Profile = {
    name : string | null,
    id : string,
    image : string,
    loading : boolean
}
declare type Transfer<T> = (value : T) => void;
declare type CollectionTransfer<T> = (collection : T[]) => void
declare type ErrorHandler = (error : Error) => void;