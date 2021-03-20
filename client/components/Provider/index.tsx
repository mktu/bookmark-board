import React from 'react'
import FirebaseProvider from './FirebaseProvider'
import ToastContainer from './ToastProvider'
import BookmarkProvider from './BookmarkProvider'
import GaProvider from './GaProvider'

type Props = {
    children: React.ReactNode
}

const Provider: React.FC<Props> = ({
    children
}) => {
    return (
        <>
            <ToastContainer />
            <GaProvider />
            <FirebaseProvider>
                <BookmarkProvider>
                    {children}
                </BookmarkProvider>
            </FirebaseProvider>
        </>
    )
}

export default Provider