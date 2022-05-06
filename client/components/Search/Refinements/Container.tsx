import React from 'react'
import TextInput from '@components/Common/Input/TextInput'
import Checkbox from '@components/Common/Input/Checkbox'
import Search from '@components/Common/Icon/Search'
import Presenter from './Presenter'
import useBookmarkSearch from '@hooks/useBookmarkSearch'

type Props = {
    setKeyword: ReturnType<typeof useBookmarkSearch>['setKeyword'],
    keyword: ReturnType<typeof useBookmarkSearch>['keyword'],
    grouping : boolean,
    onChangeGroupng : (grouping:boolean)=>void
}

const Container: React.FC<Props> = ({
    keyword,
    setKeyword,
    grouping,
    onChangeGroupng
}) => {
    return <Presenter
        input={
            <TextInput
                label='検索ワードを入力してください'
                value={keyword}
                icon={
                    <Search className='w-6 stroke-primary-300'/>
                }
                onChange={(e) => {
                    setKeyword(e.target.value)
                }}
            />
        }
        groupCheckbox={
            <Checkbox label='グループ化して表示' checked={grouping} labelProps={{
                color : 'text-primary-400'
            }} onChange={(e)=>{
                onChangeGroupng(e.target.checked)
            }}/>
        }

    />
}

export default Container