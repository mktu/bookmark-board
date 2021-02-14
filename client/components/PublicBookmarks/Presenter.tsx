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
        <div className='w-screen flex justify-center'>
            <div className='w-full md:w-7/12 py-8'>
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
                        <div className='text-primary-main text-sm md:ml-2 md:text-base'>
                            <div>
                                {editorName}
                            </div>
                            <div className='hidden text-xs md:block'>
                                {updated}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex px-4 py-2 mt-2 text-primary-main text-md whitespace-pre-wrap'>
                    {description}
                </div>
                <div className='flex px-2 justify-end items-end'>
                    {heartIcon}
                </div>
                <div className='p-2 flex flex-col justify-center'>
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