import React from 'react'
import MobileHeader from './MobileHeader'
import UnauthedMenu from './UnauthedMenu'
import WebUnauthedHeader from './WebUnauthedHeader'

const UnauthedPageHeader: React.VFC = () => {
    
    return (
        <>
        <div className='md:hidden'>
            <MobileHeader Child={UnauthedMenu}/>
        </div>
        <div className='hidden md:block'>
            <WebUnauthedHeader />
        </div>
        </>
    )
}

export default UnauthedPageHeader;