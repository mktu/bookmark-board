import React from 'react'
import { TermLink, PrivactPolicyLink, InqueryLink, TwitterLink } from '@utils/constants'

const Footer = () => {
    return (
        <footer className="text-gray-500 bg-brand">
            <div className="p-4 text-sm text-white md:p-6">
                <div className='flex flex-wrap justify-center items-center mb-2 md:hidden'>
                    <span className='mr-1'>©︎</span>
                    <a href={TwitterLink} target='_blank' rel='noopener noreferrer'>mktu 2021</a>
                </div>
                <div className="flex flex-wrap justify-center items-center md:justify-end">
                    <span className='hidden mr-1 md:inline'>©︎ </span>
                    <a href={TwitterLink} target='_blank' rel='noopener noreferrer' className='hidden mr-4 md:inline'>mktu 2021</a>
                    <a href={InqueryLink} target='_blank' rel='noopener noreferrer' className='block pr-4 mr-4 underline border-r border-white'>問い合わせ</a>
                    <a href={PrivactPolicyLink} target='_blank' rel='noopener noreferrer' className='block pr-4 mr-4 underline border-r border-white'>プライバシーポリシー</a>
                    <a href={TermLink} target='_blank' rel='noopener noreferrer' className='block underline'>利用規約</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;