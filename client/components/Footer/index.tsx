import React from 'react'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import Link from 'next/link'


const Footer = () => {
    const router = useRouter()
    return (
        <footer className="text-gray-500 bg-brand body-font">
            <div className="flex flex-wrap p-6 items-center justify-end text-white">
                <a href='https://drive.google.com/drive/u/2/my-drive' className='block underline border-r border-white mr-4 pr-4'>問い合わせ</a>
                <a href='https://drive.google.com/drive/u/2/my-drive' className='block underline border-r border-white mr-4 pr-4'>プライバシーポリシー</a>
                <a href='https://drive.google.com/drive/u/2/my-drive' className='block underline'>利用規約</a>
            </div>
        </footer>
    )
}

export default Footer;