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
        <div className='flex w-screen justify-center'>
            <div className='w-full py-8 md:w-7/12'>
                <div className='flex px-4'>
                    <div>
                        <h1 className='text-xl font-semibold md:text-2xl'>
                            {name}
                        </h1>
                        <div className='mt-1 text-xs text-primary-main md:hidden'>
                            <span>更新 {updated}</span>
                        </div>
                    </div>
                    <div className='ml-auto flex flex-col items-center md:flex-row'>
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
                <div className='mt-2 flex whitespace-pre-wrap py-2 px-4 text-base text-primary-main'>
                    {description}
                </div>
                <div className='flex items-end justify-end px-2'>
                    {heartIcon}
                </div>
                <div className='flex flex-col justify-center p-2'>
                    {bookmarks}
                </div>
                <div className='mt-4 p-2'>
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