import React, {useState} from 'react'

const Header = () => {
    const [open,setOpen] = useState(false)
    console.log(open)
    return (
        <header className="text-gray-500 bg-brand body-font">
            <div className="container flex pl-4 flex-wrap p-4 flex-col md:flex-row items-center">
                <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
                    <button className="focus:outline-none" onClick={()=>{
                        setOpen(open=>!open)
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <span className="ml-3 text-xl">LOGO</span>
                </a>
            </div>
        </header>
    )
}

export default Header;