import React from 'react'
import TextInput from '../../Common/Input/TextInput'
import Search from '../../Common/Icon/Search'
import Presenter from './Presenter'
import useBookmarkSearch from '../../../hooks/useBookmarkSearch'

type Props = {
    setKeyword: ReturnType<typeof useBookmarkSearch>['setKeyword'],
    keyword: ReturnType<typeof useBookmarkSearch>['keyword'],
}

const Container: React.FC<Props> = ({
    keyword,
    setKeyword
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

    />
}

export default Container