import React from 'react'
import { SvgIconButton } from '../Button'
import XFill from '../Icon/XFill'

const Clear: React.FC<{ handleClear: () => void }> = ({ handleClear }) => (
    <SvgIconButton onClick={handleClear}>
        <XFill className='w-6 fill-primary-100 hover:fill-primary-300' strokeWidth={0} />
    </SvgIconButton>
)

export default Clear