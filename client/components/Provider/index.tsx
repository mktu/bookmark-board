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
        <FirebaseProvider>
            <BookmarkProvider>
                <ToastContainer />
                {children}
            </BookmarkProvider>
        </FirebaseProvider>
    )
}

export default Provider