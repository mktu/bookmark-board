import React from 'react'
import TextInput from '../../../../../Common/Input/TextInput'
import { OutlinedButton } from '../../../../../Common/Button'

type Props = {
    description: BookmarkColorDescription,
    style: React.CSSProperties
}

const Preview: React.FC<Props> = ({
    description,
    style
}) => {
    const { color, name } = description
    return (
        <div className={`flex items-center opacity-50`} style={style} >
            <div className='mx-2'>
                <div className='h-5 w-5 rounded' style={{ backgroundColor: color }} />
            </div>
            <div className='flex w-full items-center'>
                <TextInput aria-label='Color Name' className={`w-full`} value={name} />
            </div>
            <OutlinedButton className='ml-2 whitespace-nowrap text-xs' paddings='px-1'>×</OutlinedButton>
        </div>
    )
}

export default Preview