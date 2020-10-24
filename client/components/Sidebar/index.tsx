import styles from './index.module.scss'
import { useSelector } from "react-redux";
import { RootReducer } from '../../reducers'

const Sidebar = () => {
    const sidebar = useSelector((state:RootReducer)=>state.sidebar)
    return (
        <div className={`flex flex-row h-full ${sidebar ? 'w-20': 'w-0'} bg-lightslategray-800  transition-all duration-200 ease-in-out`}>
            <nav className="h-full w-20 items-center flex flex-col p-4">
                <div>
                    <button className={styles['icon-button']}>
                        <svg viewBox="0 0 57 37" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M25.7318 7.72728C25.7318 12.003 22.3061 15.4546 18.0303 15.4546C13.7545 15.4546 10.303 12.003 10.303 7.72728C10.303 3.45152 13.7545 0 18.0303 0C22.3061 0 25.7318 3.45152 25.7318 7.72728ZM46.3379 7.72728C46.3379 12.003 42.9121 15.4546 38.6364 15.4546C34.3606 15.4546 30.9091 12.003 30.9091 7.72728C30.9091 3.45152 34.3606 0 38.6364 0C42.9121 0 46.3379 3.45152 46.3379 7.72728ZM18.0303 20.6061C12.0288 20.6061 0 23.6197 0 29.6212V36.0606H36.0606V29.6212C36.0606 23.6197 24.0318 20.6061 18.0303 20.6061ZM36.1379 20.7348C37.0394 20.6576 37.8894 20.6061 38.6364 20.6061C44.6379 20.6061 56.6667 23.6197 56.6667 29.6212V36.0606H41.2121V29.6212C41.2121 25.8091 39.1258 22.8985 36.1379 20.7348Z" />
                        </svg>
                    </button>
                </div>
                <div className='mt-auto'>
                    <button className={styles['heroicon-button']}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </button>
                    <button className={styles['heroicon-button']}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                </div>
            </nav>
        </div>
    )
}

export default Sidebar;