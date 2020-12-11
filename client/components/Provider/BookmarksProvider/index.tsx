import React from 'react'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import useGroup from './useGroup'
import useEditors from './useEditors'
import useBookmarks from './useBookmarks'
import useRequest from './useRequest'
import useRequestors from './useRequestors'

type Props = {
    children: React.ReactNode
}

const DefaultProvider: React.FC<Props> = ({ children }) => {
    const bookmarkServices = useBookmarks()
    const requestService = useRequest()
    useGroup([bookmarkServices,requestService])
    useEditors()
    useRequestors()
    return (
        <DndProvider backend={HTML5Backend}>
           {children}
        </DndProvider>

    )
}

export default DefaultProvider