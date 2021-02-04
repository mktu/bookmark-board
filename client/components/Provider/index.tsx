import React from 'react'
import FirebaseProvider from './FirebaseProvider'
import ToastContainer from './ToastProvider'
import BookmarkProvider from './BookmarkProvider'

type Props = {
    children: React.ReactNode
}

const Provider: React.FC<Props> = ({
    children
}) => {
    return (
        <>
            <ToastContainer />
            <FirebaseProvider>
                <BookmarkProvider>
                    {children}
                </BookmarkProvider>
            </FirebaseProvider>
        </>
    )
}

export default Provider