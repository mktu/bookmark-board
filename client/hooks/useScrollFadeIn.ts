import { useState, useEffect, useMemo, useCallback } from "react"

type State = {
    transform: string
    opacity: number
}

const getScrollableParent = (element: (HTMLElement | null)): HTMLElement => {
    if (!element) {
        return null;
    }

    const overflow = window
        .getComputedStyle(element)
        .getPropertyValue('overflow');

    const overflowY = window
        .getComputedStyle(element)
        .getPropertyValue('overflow-y');

    if (overflow === 'scroll' || overflowY === 'scroll' ||
        overflow === 'auto' || overflowY === 'auto'
    ) {
        return element;
    }

    return getScrollableParent(element.parentElement);
}

export const useScrollFadeIn = <T extends HTMLElement>(
    node: T | null,
    translate: { x: number; y: number },
    adjust?: number,
    transition = '1s'
) => {
    const [state, update] = useState<State>({
        opacity: 0,
        transform: `translateX(${translate.x}px) translateY(${translate.y}px)`,
    })
    const [done,setDone] = useState(false)

    const nodeStyle = useMemo(
        () => ({
            transition,
            opacity: state.opacity,
            transform: state.transform,
        }),
        [state.opacity, state.transform, transition]
    )

    const handleWindowScroll = useCallback(() => {
        if (!node) {
            return
        }
        const offsetTop = node.offsetTop
        const scrollY = window.scrollY
        const clientHeight = window.screen.height
        if (offsetTop < scrollY + clientHeight - (adjust ? adjust : 0) && !done) {
            update(_state => ({
                ..._state,
                opacity: 1,
                transform: `translateX(0) translateY(0)`,
            }))
            setDone(true)
        }
    }, [node, adjust, done])

    const handleNodeScroll = useCallback(() => {
        const scrollElm = getScrollableParent(node)
        if (!node || !scrollElm) {
            return
        }
        const scroll = scrollElm.scrollTop
        const offsetTop = node.offsetTop
        const windowHeight = scrollElm.clientHeight
        if (offsetTop < scroll + windowHeight - (adjust ? adjust : 0) && !done) {
            update(_state => ({
                ..._state,
                opacity: 1,
                transform: `translateX(0) translateY(0)`,
            }))
            setDone(true)
        }
    }, [node, adjust, done])

    useEffect(() => {
        const scrollElm = getScrollableParent(node)
        if (!scrollElm) {
            handleWindowScroll()
        }
        handleNodeScroll()
    }, [handleWindowScroll, handleNodeScroll, node])

    useEffect(() => {
        const scrollElm = getScrollableParent(node)
        if (!scrollElm) {
            window.addEventListener("scroll", handleWindowScroll)
            return () => window.removeEventListener("scroll", handleWindowScroll)
        }
        scrollElm.addEventListener("scroll", handleNodeScroll)
        return () => scrollElm.removeEventListener("scroll", handleNodeScroll)
    }, [handleWindowScroll, handleNodeScroll, node])

    return {
        nodeStyle,
    }
}