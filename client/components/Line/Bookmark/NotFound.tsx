import React from 'react'
import { Candidate } from '@hooks/useLiffBookmark'
import CandidateListItem from './CandidateItem'

type Props = {
    message: string,
    candidates: Candidate[]
}

const NotFound: React.FC<Props> = ({ message, candidates }) => {
    return (
        <div className='flex h-full w-full flex-col items-center'>
            <div className='mt-4 w-full'>
                <h3 className='flex justify-center font-semibold text-primary-main'>
                    {message}
                </h3>
                <div className='p-4'>
                    <p className='text-primary-main'>
                        <span>ブックマークがグループから削除された可能性があります。</span>
                    </p>
                </div>
            </div>
            {candidates.length > 0 && (
                <div className='mt-2 text-primary-main'>
                    もしかしてこちら?
                </div>
            )}
            {candidates.length > 0 && (
                <ul className='w-full overflow-x-hidden'>
                    {candidates.map(v => (
                        <CandidateListItem key={v.bookmark.id} bookmark={v.bookmark} group={v.group} />
                    ))}
                </ul>
            )}
        </div>
    )
}

export default NotFound