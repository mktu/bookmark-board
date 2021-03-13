import React from 'react'
import { SearchBoxProvided } from 'react-instantsearch-core'
import TextInput from '@components/Common/Input/TextInput'
import Search from '@components/Common/Icon/Search'

type Props = {

} & SearchBoxProvided

const SearchBox: React.FC<Props> = ({
    refine,
    currentRefinement,
}) => {
    return (
        <div className='w-full'>
            <TextInput
                id='bookmark-search'
                label='ブックマークを検索'
                value={currentRefinement}
                icon={
                    <Search className='w-6 stroke-primary-300' />
                }
                onChange={(e) => {
                    refine(e.target.value)
                }}
            />
        </div>
    )
}

export default SearchBox