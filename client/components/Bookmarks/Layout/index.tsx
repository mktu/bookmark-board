import React from 'react'
import Split from 'react-split'
import { checkIsTouch } from '@utils/dnd'

const isTouch = checkIsTouch()

type Props = {
    groups: React.ReactNode,
    group: React.ReactNode,
    showGroup?: boolean
}

const Layout = ({
    groups,
    group,
    showGroup
}: Props) => {
    console.log(showGroup)
    return isTouch ? (
        <div className='flex flex-row w-full h-full'>
            <div className={`h-full w-full ${showGroup && 'hidden'}`}>{groups}</div>
            <div className={`h-full w-full ${!showGroup && 'hidden'}`}>{group}</div>
        </div>
    ) : (
        <>
            <Split className='flex flex-row w-full h-full bg-primary-light' gutterSize={4} gutterAlign="center" sizes={[25, 75]} minSize={[256, 512]} 
                gutter={(_, direction)=>{
                    const gutterElement = document.createElement('div')
                    gutterElement.className = `gutter gutter-${direction} border-l border-primary-border hover:bg-primary-border`
                    return gutterElement
                }}
            >
                <div className={`h-full w-full`}>{groups}</div>
                <div className={`h-full w-full border-primary-border`}>{group}</div>
            </Split>
        </>

    )
}

export default Layout;