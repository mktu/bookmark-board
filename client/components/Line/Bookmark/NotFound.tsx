import React from 'react'

type Props = {
    message: string
}

const NotFound: React.FC<Props> = ({ message }) => {
    return (
        <div className=' flex justify-center w-full h-full'>
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
        </div>
    )
}

export default NotFound