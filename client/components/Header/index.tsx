import React, {useContext} from 'react'
import styles from './index.module.scss'
import { useDispatch } from "react-redux";
import { useRouter } from 'next/router'
import { toggleSideBar } from '../../modules/sidebarSlice'
import { HeaderLogo } from '../Common/Logo'
import { Popover } from '../Common/Popover'
import { TextButton } from '../Common/Button'
import FirebaseContext from '../../context/FirebaseContext'


const Header = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const {clientService} = useContext(FirebaseContext)
    return (
        <header className="text-gray-500 bg-brand body-font">
            <div className="flex pl-4 flex-wrap p-2 flex-col md:flex-row items-center">
                <div>
                    <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
                        <button className="focus:outline-none" onClick={() => {
                            dispatch(toggleSideBar())
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </a>
                </div>
                <div className="ml-auto flex flex-row items-center">
                    <HeaderLogo />
                    <div className='ml-4'>
                        <Popover 
                            placement='bottom-end'
                            content={(
                            <div className='bg-white opacity-80 rounded shadow font-semibold pt-3 pb-3 flex flex-col justify-start align-middle'>
                                <TextButton className='block w-full pl-3 pr-3 text-left hover:bg-primary-50'>Profile</TextButton>
                                <TextButton onClick={()=>{
                                    clientService.logout(()=>{
                                        router.push('/signin')
                                    })
                                }} className='block w-full pl-3 pr-3 text-left hover:bg-primary-50'>Sign Out</TextButton>
                            </div>
                        )}>
                            <button className={styles['heroicon-button']}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </button>
                        </Popover>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;