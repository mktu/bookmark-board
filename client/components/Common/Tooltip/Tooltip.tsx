import React, { useState } from "react";
import { usePopper, PopperChildrenProps } from 'react-popper';

type Children<T extends HTMLElement> = React.ReactElement & {
    ref?: React.Ref<T>;
}

export type Props<T extends HTMLElement> = {
    children: Children<T>,
    content: React.ReactNode | string,
    placement?: PopperChildrenProps['placement']
}

export default function Tooltip<T extends HTMLElement>({ children, content, placement = 'auto' }: Props<T>) {
    const [tooltipShow, setTooltipShow] = useState(false);
    const [referenceElement, setReferenceElement] = useState<HTMLElement>()
    const [popperElement, setPopperElement] = useState<HTMLDivElement>()
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement
    });
    const openLeftTooltip = () => {
        setTooltipShow(true);
    };
    const closeLeftTooltip = () => {
        setTooltipShow(false);
    };
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
        onMouseEnter: openLeftTooltip,
        onMouseLeave: closeLeftTooltip
    }

    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-full text-center">
                    {React.cloneElement(children, childProps)}
                    {tooltipShow && (typeof content === 'string' ?
                        (
                            <div
                                className='z-20'
                                ref={setPopperElement}
                                style={styles.popper}
                                {...attributes.popper}
                            >
                                <div className='bg-primary-600 text-white opacity-80 p-2 rounded-lg text-sm'>
                                    {content}
                                </div>
                            </div>
                        ) : (
                            <div className='z-20'
                                ref={setPopperElement}
                                style={styles.popper}
                                {...attributes.popper}> { content}</div>
                        ))}

                </div>
            </div>
        </>
    );
}