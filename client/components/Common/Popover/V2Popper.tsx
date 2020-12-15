import React, { useState, useMemo, useCallback } from "react";
import { usePopper, PopperChildrenProps } from 'react-popper';
import Clickaway from '../Clickaway'

type Children<T extends HTMLElement> = React.ReactElement & {
    ref?: React.Ref<T>;
}

export type Props<T extends HTMLElement> = {
    children: Children<T>,
    content: React.ReactNode,
    placement?: PopperChildrenProps['placement']
}

export function Popover<T extends HTMLElement>({ children, content, placement = 'auto' }: Props<T>) {
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
            <div className="flex flex-wrap">
                <div className="w-full">
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
                            onClick: toggle,
                        }
                        return React.cloneElement(children, childProps)
                    }, [children, toggle])}
                    {popoverShow && (
                        <Clickaway onClickAway={() => {
                            setPopoverShow(false)
                        }}>
                            <div className={'z-20'} ref={setPopperElement} style={styles.popper} {...attributes.popper}>
                                {content}
                            </div>
                        </Clickaway>
                    )}
                </div>
            </div>
        </>
    );
}