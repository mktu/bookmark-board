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
    return isTouch ? (
        <div className='flex flex-row w-full h-full'>
            <div className={`h-full w-full ${showGroup && 'hidden'}`}>{groups}</div>
            <div className={`h-full w-full ${!showGroup && 'hidden'}`}>{group}</div>
        </div>
    ) : (
        <>
            <Split className='flex flex-row w-full h-full bg-primary-light' gutterAlign="center" sizes={[25, 75]} minSize={[256, 512]}
                gutter={(_, direction) => {
                    const gutterElement = document.createElement('div')
                    gutterElement.className = `gutter gutter-${direction} w-[2px] bg-primary-border hover:cursor-col-resize hover:w-4 hover:border-x hover:border-secondary-border hover:bg-secondary-light transition-all delay-300 duration-300 ease-in-out`
                    return gutterElement
                }}
                gutterStyle={() => ({})}
            >
                <div className={`h-full w-full`}>{groups}</div>
                <div className={`h-full w-full border-primary-border`}>{group}</div>
            </Split>
        </>

    )
}

export default Layout;