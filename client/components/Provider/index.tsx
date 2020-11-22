import React from 'react'
import FirebaseProvider from './FirebaseProvider'
import BookmarksProvider from './BookmarksProvider'
import ToastContainer from './ToastContainer'

type Props = {
    children: React.ReactNode
}

const Provider: React.FC<Props> = ({
    children
}) => {
    return (
        <FirebaseProvider>
            <BookmarksProvider>
                <ToastContainer/>
                {children}
            </BookmarksProvider>
        </FirebaseProvider>
    )
}

export default Provider