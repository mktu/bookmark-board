export const spliceAndInsert = (original:string[], to : number, id : string) => {
    const fromIdx = original.findIndex(v=>v===id)
    let ret = original.map(v=>v===id ? undefined : v)
    ret.splice(to,0,id)
    return ret.filter(Boolean)
}