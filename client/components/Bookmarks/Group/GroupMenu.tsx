import React from 'react'
import { TextButton } from '../../Common/Button'

type Props = {
    handleShowShareSetting : () => void
}

const GroupMenu : React.FC<Props> = ({
    handleShowShareSetting
}) => {
    return (
        <div className='bg-white opacity-80 rounded shadow-lg border border-primary-border font-semibold pt-3 pb-3 flex flex-col justify-start align-middle'>
            <TextButton className='block w-full px-3 py-1 text-left hover:bg-primary-50' onClick={()=>{
                handleShowShareSetting()
            }}>リストを共有</TextButton>
            <TextButton className='block w-full px-3 py-1 text-left hover:bg-primary-50'>削除</TextButton>
        </div>
    )
}

export default GroupMenu