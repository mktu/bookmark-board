import React from 'react'
import classNames from 'classnames'
import Check from '@components/Common/Icon/Check'
import { TextButton } from '@components/Common/Button'

type Props = {
    checked ?: boolean,
    onChange : (checked:boolean)=>void,

}

const Delete: React.VFC<Props> = ({ 
    checked,
    onChange
 }) => {
    return (
        <TextButton colorType='secondary' className='flex items-center' onClick={() => {
            onChange(!checked)
        }}>
            <Check className={classNames('w-6 rounded  mr-2', checked ?
                'stroke-secondary-light bg-secondary-500 hover:bg-secondary-main' : 
                'stroke-secondary-400 hover:stroke-secondary-dark border border-secondary-300')} strokeWidth={checked ? 2 : 1} />
            <div className='text-sm'>削除する</div>
        </TextButton>
    )
}

export default Delete