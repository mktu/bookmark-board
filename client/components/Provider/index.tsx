import React from 'react'
import FirebaseProvider from './FirebaseProvider'
import BookmarksProvider from './BookmarksProvider'

type Props = {
    children: React.ReactNode
}

const Provider : React.FC<Props> = ({
    children
})=>{
    return (
        <FirebaseProvider>
            <BookmarksProvider>
                {children}
            </BookmarksProvider>
        </FirebaseProvider>
    )
} 

export default Provider