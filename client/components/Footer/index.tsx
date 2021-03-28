import React from 'react'
import { TermLink, PrivactPolicyLink } from '@utils/constants'

const Footer = () => {
    return (
        <footer className="text-gray-500 bg-brand body-font">
            <div className="md:p-6 p-4 text-sm text-white">
                <div className='md:hidden flex flex-wrap items-center justify-center mb-2'>©︎ mktu 2021</div>
                <div className="flex flex-wrap items-center justify-center md:justify-end">
                    <span className='hidden md:inline mr-4'>©︎ mktu 2021</span>
                    <a href='https://drive.google.com/drive/u/2/my-drive' target='_blank' rel='noopener noreferrer' className='block underline border-r border-white mr-4 pr-4'>問い合わせ</a>
                    <a href={PrivactPolicyLink} target='_blank' rel='noopener noreferrer' className='block underline border-r border-white mr-4 pr-4'>プライバシーポリシー</a>
                    <a href={TermLink} target='_blank' rel='noopener noreferrer' className='block underline'>利用規約</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;