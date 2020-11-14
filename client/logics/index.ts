export const spliceAndInsert = (original:string[], to : number, id : string) => {
    original.findIndex(v=>v===id)
    const ret = original.map(v=>v===id ? undefined : v)
    ret.splice(to,0,id)
    return ret.filter(Boolean)
}