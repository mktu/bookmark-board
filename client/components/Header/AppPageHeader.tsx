import React from 'react'
import MobileHeader from './MobileHeader'
import AppMenu from './AppMenu'
import WebAppHeader from './WebAppHeader'

type Props = {
    fixed ?: boolean
}

const AppPageHeader: React.VFC<Props> = ({fixed}) => {
    
    return (
        <>
        <div className='md:hidden'>
            <MobileHeader Child={AppMenu} authed={true} fixed={fixed}/>
        </div>
        <div className='hidden md:block'>
            <WebAppHeader />
        </div>
        </>
    )
}

export default AppPageHeader;