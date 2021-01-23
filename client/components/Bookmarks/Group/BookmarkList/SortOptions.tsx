import React, { useContext, useState, useCallback } from 'react'
import { ContainedButton } from '../../../Common/Button'
import { Checkbox } from '../../../Common/Input'
import { useBookmarksByGroup } from '../../../../modules/bookmarkSlice'
import { useGroupById } from '../../../../modules/groupSlice'
import FirebaseContext from '../../../../context/FirebaseContext'

type Props = {
    groupId: string
}

type CompFunction = (a:Bookmark,b:Bookmark)=>number


const lastUpdateSorter : CompFunction = (a,b)=>{
    const aLastUpdate = a.lastUpdate || 0
    const bLastUpdate = b.lastUpdate || 0
    return bLastUpdate - aLastUpdate
}

const SortOptions: React.FC<Props> = ({
    groupId
}) => {
    const { clientService } = useContext(FirebaseContext)
    const [functions, setFunctions] = useState<CompFunction[]>([])
    const bookmarks = useBookmarksByGroup(groupId)
    const {colors} = useGroupById(groupId)
    const colorSorter : CompFunction = useCallback((a,b)=>{
        if(!a.color){
            return 1
        }
        if(!b.color){
            return -1
        }
        if(!colors || !(colors[a.color]) || !(colors[b.color])){
            return a.color < b.color ? -1 : 1
        }
        return (colors[a.color].idx || 0) - (colors[b.color].idx || 0)
    },[colors])
    const sortBase = (compFunc:(a:Bookmark,b:Bookmark)=>number)=>{
        const data = bookmarks.sort(compFunc).map(v=>v.id)
        clientService.changeOrder(groupId, data)
    }
    const sort = ()=>{
        if(functions.length > 0){
            sortBase((a,b)=>{
                for(const f of functions){
                    const ret = f(a,b)
                    if(ret !== 0){
                        return ret
                    }
                }
                return 0
            })
        }
    }
    const sortByColor = (e:React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.checked){
            setFunctions(before=>[colorSorter,...before])
        }
        else{
            setFunctions(before=>before.filter(f=>f!==colorSorter))
        }
    }
    const sortByUpdateDate = (e:React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.checked){
            setFunctions(before=>[...before,lastUpdateSorter])
        }
        else{
            setFunctions(before=>before.filter(f=>f!==lastUpdateSorter))
        }
    }
    return (
        <div className='bg-white p-4 rounded shadow-lg border border-primary-border font-semibold  flex flex-col justify-start align-middle'>
            <p className='text-sm text-primary-main mb-2'>並び替えを実行</p>
            <Checkbox id='color' onChange={sortByColor} className='my-1' label='色でグルーピング' labelProps={{textSize:'text-sm',weight:'font-bold' }}/> 
            <Checkbox id='lastupdate' onChange={sortByUpdateDate} className='my-1' label='更新が新しい順' labelProps={{textSize:'text-sm',weight:'font-bold' }}/> 
            <ContainedButton onClick={sort} className='text-sm mx-2 mt-4'>実行</ContainedButton>
        </div>
    )
}

export default SortOptions