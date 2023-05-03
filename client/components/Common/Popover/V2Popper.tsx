import React, { useState, useMemo, useCallback, useEffect } from "react";
import { usePopper, PopperChildrenProps, } from 'react-popper';
import Clickaway from '../Clickaway'

type Children<T extends HTMLElement> = React.ReactElement & {
    ref?: React.Ref<T>;
}

export type Props<T extends HTMLElement> = {
    children: Children<T>,
    render: (toggle: () => void, open: boolean) => React.ReactNode,
    content?: React.ReactNode,
    placement?: PopperChildrenProps['placement'],
    strategy?: 'absolute' | 'fixed'
    zIndex?: number,
    disabled?: boolean
} | {
    children: Children<T>,
    render?: (toggle: () => void, open: boolean) => React.ReactNode,
    content: React.ReactNode,
    placement?: PopperChildrenProps['placement'],
    strategy?: 'absolute' | 'fixed',
    zIndex?: number,
    disabled?: boolean
}

export function Popover<T extends HTMLElement>({ children, content, render, disabled, placement = 'auto', strategy = 'absolute', zIndex = 20 }: Props<T>) {
    const [popoverShow, setPopoverShow] = useState(false);
    const [timestamp, setTimestamp] = useState(-1)
    const [referenceElement, setReferenceElement] = useState<HTMLElement>()
    const [popperElement, setPopperElement] = useState<HTMLDivElement>()
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement,
        strategy
    });
    const toggle = useCallback(() => {
        setPopoverShow(before => !before)
    }, []);

    useEffect(() => {
        if (!document) {
            return
        }
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setPopoverShow(false);
            }
        }
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [])

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
                    onClick: (e: React.MouseEvent<T>) => {
                        if (disabled) {
                            return
                        }
                        setTimestamp(e.timeStamp)
                        toggle()
                    },
                }
                return React.cloneElement(children, childProps)
            }, [children, toggle, disabled])}
            {popoverShow && (
                <Clickaway onClickAway={(e) => {
                    if (timestamp !== e.timeStamp) {
                        setPopoverShow(false)
                    }
                }}>
                    <div ref={setPopperElement} style={{ ...styles.popper, zIndex }} {...attributes.popper}>
                        {render ? render(toggle, popoverShow) : content}
                    </div>
                </Clickaway>
            )}
        </>
    );
}