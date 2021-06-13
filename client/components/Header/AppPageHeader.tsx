import React from 'react'
import MobileHeader from './MobileHeader'
import AppMenu from './AppMenu'
import WebAppHeader from './WebAppHeader'

const AppPageHeader: React.VFC = () => {
    
    return (
        <>
        <div className='md:hidden'>
            <MobileHeader Child={AppMenu}/>
        </div>
        <div className='hidden md:block'>
            <WebAppHeader />
        </div>
        </>
    )
}

export default AppPageHeader;