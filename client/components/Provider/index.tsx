import React from 'react'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
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
                <DndProvider backend={HTML5Backend}>
                    <ToastContainer />
                    {children}
                </DndProvider>
            </BookmarkProvider>
        </FirebaseProvider>
    )
}

export default Provider