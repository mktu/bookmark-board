import url from 'url';
import {getOrigin} from './'

export const parseBookmarkRoutes = (ids:string[]|string) => {
    const groupId = ids && ids.length > 0 ? ids[0] : ''
    const bookmarkId = ids && ids.length > 1 ? ids[1] : ''
    return {
        groupId, bookmarkId
    }
}

export const getClientsideQueryStrings = (key:string)=>{
    if(typeof window === undefined){
        return null
    }
    const currentLocation = window.location.href
    const urlParts = url.parse(currentLocation, true);
    const query = urlParts.query;
    const hasCodeProperty = Object.prototype.hasOwnProperty.call(query, key);
    if (!hasCodeProperty) {
        null
    }
    return query[key]
}

export const LineLoginSettingPage = `${getOrigin()}/profile/line-setting`
export const LineGroupsPage = `${getOrigin()}/line/groups`
export const LineRootPage = `${getOrigin()}/line`
export const LineHomePage = `${getOrigin()}/line/home`
export const LineBookmarkPage = (groupId:string,bookmarkId:string)=> `${getOrigin()}/line/bookmarks/${groupId}/${bookmarkId}`