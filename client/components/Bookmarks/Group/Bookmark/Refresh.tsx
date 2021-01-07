import React from 'react'
import { SvgIconButton } from '../../../Common/Button'
import { Refresh as Icon } from '../../../Common/Icon'

type Props = {
    disabled?: boolean,
    handleRefetch: () => void,
}

/* const OldRefresh: React.FC<Props> = ({
    disabled,
    handleRefetch
}) => (
        <TextButton disabled={disabled} className='my-4 flex items-center justify-center' fontType='none' onClick={handleRefetch}>
            <Icon className='w-4 stroke-primary-500 mr-2' strokeWidth={2} />
            <span>情報再取得</span>
        </TextButton>
    ) */

const Refresh: React.FC<Props> = ({
    disabled,
    handleRefetch
}) => (
        <SvgIconButton aria-label='Refresh' disabled={disabled} className='flex items-center justify-center' onClick={handleRefetch}>
            <Icon className='w-6' strokeWidth={2} />
        </SvgIconButton>
    )

export default Refresh