import React, { useState, useMemo, useCallback } from "react";
import { usePopper, PopperChildrenProps } from 'react-popper';
import Clickaway from '../Clickaway'

type Children<T extends HTMLElement> = React.ReactElement & {
    ref?: React.Ref<T>;
}

export type Props<T extends HTMLElement> = {
    children: Children<T>,
    render: (toggle:()=>void)=>React.ReactNode,
    content?: React.ReactNode,
    placement?: PopperChildrenProps['placement'],
    zIndex?:number
} | {
    children: Children<T>,
    render?: (toggle:()=>void)=>React.ReactNode,
    content: React.ReactNode,
    placement?: PopperChildrenProps['placement'],
    zIndex?:number
}

export function Popover<T extends HTMLElement>({ children, content, render, placement = 'auto', zIndex=20 }: Props<T>) {
    const [popoverShow, setPopoverShow] = useState(false);
    const [referenceElement, setReferenceElement] = useState<HTMLElement>()
    const [popperElement, setPopperElement] = useState<HTMLDivElement>()
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement
    });
    const toggle = useCallback(() => {
        setPopoverShow(before => !before)
    }, []);

    return (
        <>
            {useMemo(() => {
                const childProps = {
                    ...children.props,
                    ref: (value: T) => {
                        if (!value) return; // called when unmounted
                        if (children.ref) {
                            if (typeof children.ref === 'function') {
                                children.ref(value);
                            }
                            else {
                                const refObject = children.ref as React.MutableRefObject<T>
                                refObject.current = value;
                            }
                        }
                        setReferenceElement(value)
                    },
                    onClick: (e:React.MouseEvent<T>)=>{
                        e.stopPropagation && e.stopPropagation()
                        e.preventDefault && e.preventDefault()
                        toggle()
                    },
                }
                return React.cloneElement(children, childProps)
            }, [children, toggle])}
            {popoverShow && (
                <Clickaway onClickAway={() => {
                    setPopoverShow(false)
                }}>
                    <div ref={setPopperElement} style={{...styles.popper, zIndex}} {...attributes.popper}>
                        {render ? render(toggle) : content}
                    </div>
                </Clickaway>
            )}
        </>
    );
}