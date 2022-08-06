import React from 'react'
import { EditFill, ShareFill as ShareIcon } from '../../../Common/Icon'

type Props = {
    publicLink: React.ReactNode,
    privateLink: React.ReactNode,
    submit: React.ReactNode,
    cancel: React.ReactNode
}

const Share: React.FC<Props> = ({
    publicLink,
    privateLink,
    submit,
    cancel
}) => {
    return (
        <div className='text-primary-main'>
            <h1 className='p-2 text-lg text-primary-dark'>
                リストの共有
            </h1>
            <div className='flex items-center p-2'>
                <ShareIcon className='mr-2 block w-6 fill-primary-main stroke-0' />
                <p>
                    閲覧用のページ
                </p>
            </div>
            <p className='p-2 text-sm'>
                共有したい人にログイン無しでブックマークを公開することができます
            </p>
            <div className='p-2'>
                {publicLink}
            </div>
            <div className='my-8 w-full' />
            <div className='flex items-center p-2'>
                <EditFill className='mr-2 block w-6 fill-primary-main stroke-0' />
                <p>
                    共同編集リンク
                </p>
            </div>
            <p className='p-2 text-sm'>
                共有したい人に共同編集リンクを教えることで、このブックマークリストの編集者として招待することができます
            </p>
            <p className='px-2 text-sm text-secondary-main'>
                ※ 共同編集者はアカウント登録している必要があります
            </p>
            <div className='w-full p-2'>
                <div className='text-sm'>
                    {privateLink}
                </div>
            </div>
            <div className='flex w-full items-center justify-end p-2'>
                <div className='mr-2'>
                    {cancel}
                </div>
                <div className=''>
                    {submit}
                </div>
            </div>
        </div>
    )
}


export default Share

