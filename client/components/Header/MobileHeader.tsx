import React, { useState } from 'react'
import { useInView } from 'react-intersection-observer';
import classNames from 'classnames'
import styles from './index.module.scss'
import MenuIcon from '@components/Common/Icon/Menu'
import { SvgIconButton } from '@components/Common/Button'
import Layout from './Layout'
import Dialog from './MenuCommon'

type ChildType = React.VFC<{onClose:()=>void}>

const MobileHeader: React.VFC<{Child : ChildType}> = ({Child}) => {
    const [open, setOpen] = useState(false)
    const { ref, inView } = useInView()
    const menu = (
        <SvgIconButton aria-label='Open Search' colorType='none' className={
            classNames(inView ? styles['heroicon-button'] : 'bg-primary-light rounded-full stroke-primary-main p-2 border border-primary-main')} onClick={() => {
                setOpen(o => !o)
            }}>
            <MenuIcon strokeWidth={1.5} className='w-10 h-10' />
        </SvgIconButton>
    )

    return (
        <>
            <Layout ref={ref}>
                {menu}
            </Layout>
            <div className={`${inView ? 'h-0 overflow-hidden opacity-0' : 'opacity-75 p-2'} fixed top-0 right-0 transition-all ease-in-out duration-500 transform z-50`}>
                {menu}
            </div>
            <Dialog open={open} onClose={() => { setOpen(o => !o) }}>
                <Child onClose={() => { setOpen(o => !o) }}/>
            </Dialog>
        </>
    )
}

export default MobileHeader;