import React from 'react'
import { TermLink, PrivactPolicyLink, InqueryLink, TwitterLink } from '@utils/constants'

const Footer = () => {
    return (
        <footer className="bg-brand text-gray-500">
            <div className="p-4 text-sm text-white md:p-6">
                <div className='mb-2 flex flex-wrap items-center justify-center md:hidden'>
                    <span className='mr-1'>©︎</span>
                    <a href={TwitterLink} target='_blank' rel='noopener noreferrer'>mktu 2021</a>
                </div>
                <div className="flex flex-wrap items-center justify-center md:justify-end">
                    <span className='mr-1 hidden md:inline'>©︎ </span>
                    <a href={TwitterLink} target='_blank' rel='noopener noreferrer' className='mr-4 hidden md:inline'>mktu 2021 - 2022</a>
                    <a href={InqueryLink} target='_blank' rel='noopener noreferrer' className='mr-4 block border-r border-white pr-4 underline'>問い合わせ</a>
                    <a href={PrivactPolicyLink} target='_blank' rel='noopener noreferrer' className='mr-4 block border-r border-white pr-4 underline'>プライバシーポリシー</a>
                    <a href={TermLink} target='_blank' rel='noopener noreferrer' className='block underline'>利用規約</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;