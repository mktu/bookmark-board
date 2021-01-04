import React, { useContext } from 'react'
import { toast } from 'react-toastify';
import { Modal } from 'react-responsive-modal';
import { OutlinedButton, SvgIconButton } from '../../Common/Button'
import { EditFill, ShareFill as ShareIcon, Duplicate, XFill } from '../../Common/Icon'
import Link from 'next/link'
import Tooltip from '../../Common/Tooltip'
import FirebaseContext from '../../../context/FirebaseContext'
import { copyToClipBoard } from '../../../utils'

type Props = {
    sharable: boolean,
    id: string
}

const Share: React.FC<Props> = ({
    id,
    sharable
}) => {
    const { clientService } = useContext(FirebaseContext)
    const host = window.location.host
    const publicPath = `/public-bookmarks/${id}`
    const publicUrl = `${host}${publicPath}`
    const requestUrl = `${host}/bookmark-requests/${id}`
    return (
        <div className='text-primary-main'>
            <h1 className='text-primary-dark text-lg p-2'>
                リストの共有
            </h1>
            <div className='p-2 flex items-center'>
                <ShareIcon className='w-6 stroke-0 fill-primary-main block mr-2' />
                <p>
                    閲覧用のページ
                </p>
            </div>
            <p className='p-2 text-sm'>
                共有したい人にログイン無しでブックマークを公開することができます
            </p>
            <div className='p-2'>
                {sharable ? (
                    <div className='text-sm'>

                        <div className='flex items-center my-2'>
                            <p>閲覧用リンク</p>
                            <Link href={publicPath} shallow>
                                {// eslint-disable-next-line jsx-a11y/anchor-is-valid
                                    (<a className='underline text-blue-700 mx-2'>{publicUrl}</a>)
                                }
                            </Link>

                            <Tooltip content='URLをコピー' placement='bottom'>
                                <div>
                                    <SvgIconButton aria-label='Copy URL' className='block' onClick={() => {
                                        copyToClipBoard(publicUrl, () => {
                                            toast.success('URLをクリップボードにコピーしました')
                                        })
                                    }}>
                                        <Duplicate className='w-6' />
                                    </SvgIconButton>
                                </div>
                            </Tooltip>
                            <Tooltip content='非公開にする' placement='bottom'>
                                <div>
                                    <SvgIconButton aria-label='Make Private' className='block ml-2' onClick={() => {
                                        clientService.modifyGroup(id, {
                                            sharable: false
                                        })
                                    }}>
                                        <XFill className='w-6 stroke-0 fill-primary-main hover:fill-primary-dark' />
                                    </SvgIconButton>
                                </div>
                            </Tooltip>
                        </div>
                    </div>
                ) : (
                        <OutlinedButton aria-label='Publish' className='block my-2' onClick={() => {
                            clientService.modifyGroup(id, {
                                sharable: true
                            })
                        }}>
                            閲覧用ページを公開
                        </OutlinedButton>
                    )}
            </div>
            <div className='w-full my-8' />
            <div className='p-2  flex items-center'>
                <EditFill className='w-6 stroke-0 fill-primary-main block mr-2' />
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
            <div className='p-2 '>
                <div className='text-sm'>
                    <div className='flex items-center my-2'>
                        <p>共同編集リンク</p>
                        <a className='underline text-blue-700 mx-2' href={requestUrl}>{requestUrl}</a>
                        <Tooltip content='URLをコピー' placement='bottom'>
                            <div>
                                <SvgIconButton aria-label='Copy URL' className='block' onClick={() => {
                                    copyToClipBoard(requestUrl, () => {
                                        toast.success('URLをクリップボードにコピーしました')
                                    })
                                }}>
                                    <Duplicate className='w-6' />
                                </SvgIconButton>
                            </div>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </div>
    )
}

type DialogProps = {
    children: React.ReactChild,
    open: boolean,
    onClose: () => void
}

const ShareDialog: React.FC<DialogProps> = ({
    children,
    open,
    onClose
}) => {
    return (
        <Modal open={open} showCloseIcon={false} focusTrapped={false} onClose={onClose} center classNames={{
            modal: 'w-2/3',
            overlay: 'bg-red-500'
        }}>
            {children}
        </Modal>
    )
}

export {
    Share,
    ShareDialog
}

export default Share

