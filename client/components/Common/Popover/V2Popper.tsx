import React, { useState, useMemo, useCallback, useEffect } from "react";
import { usePopper, PopperChildrenProps } from 'react-popper';
import Clickaway from '../Clickaway'

type Children<T extends HTMLElement> = React.ReactElement & {
    ref?: React.Ref<T>;
}

type Props<T extends HTMLElement> = {
    children: Children<T>,
    content: React.ReactNode | string,
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
    },[]);

    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-full text-center">
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
                    }, [children,toggle])}
                    {typeof content === 'string' ?
                        (
                            <div
                                className={
                                    (popoverShow ? "" : "hidden ") +
                                    "bg-primary-600 text-white opacity-80 font-semibold p-3 rounded-lg"
                                }
                                ref={setPopperElement}
                                style={styles.popper}
                                {...attributes.popper}
                            >
                                <div style={styles.arrow} />
                                {content}
                            </div>
                        ) : (
                            <Clickaway onClickAway={() => {
                                setPopoverShow(false)
                            }}>
                                <div className={popoverShow ? 'z-20' : 'hidden'} ref={setPopperElement} style={styles.popper} {...attributes.popper}>
                                    {content}
                                </div>
                            </Clickaway>
                        )}

                </div>
            </div>
        </>
    );
};