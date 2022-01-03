import React from 'react'
import { PopoverDivContainer } from '../Common/Popover'

type Props = {
    name: string,
    description: string,
    editorIcon: React.ReactNode,
    editorName: string,
    editorPopover: React.ReactNode,
    updated: string,
    heartIcon: React.ReactNode,
    bookmarks: React.ReactNode,
    comments: React.ReactNode,
    commentInput?: React.ReactNode,
    signup?: React.ReactNode,
}

const Default: React.FC<Props> = ({
    name,
    description,
    editorIcon,
    editorName,
    editorPopover,
    updated,
    heartIcon,
    bookmarks,
    comments,
    commentInput,
    signup
}) => {
    return (
        <div className='flex justify-center w-screen'>
            <div className='py-8 w-full md:w-7/12'>
                <div className='flex px-4'>
                    <div>
                        <h1 className='text-xl font-semibold md:text-2xl'>
                            {name}
                        </h1>
                        <div className='mt-1 text-xs text-primary-main md:hidden'>
                            <span>更新 {updated}</span>
                        </div>
                    </div>
                    <div className='flex flex-col items-center ml-auto md:flex-row'>
                        <PopoverDivContainer placement='bottom' content={editorPopover}>
                            {editorIcon}
                        </PopoverDivContainer>
                        <div className='text-sm text-primary-main md:ml-2 md:text-base'>
                            <div>
                                {editorName}
                            </div>
                            <div className='hidden text-xs md:block'>
                                {updated}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex py-2 px-4 mt-2 text-base text-primary-main whitespace-pre-wrap'>
                    {description}
                </div>
                <div className='flex justify-end items-end px-2'>
                    {heartIcon}
                </div>
                <div className='flex flex-col justify-center p-2'>
                    {bookmarks}
                </div>
                <div className='p-2 mt-4'>
                    {comments}
                    {commentInput}
                    {signup && (
                        <div className='flex justify-center py-6'>
                            {signup}
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default Default