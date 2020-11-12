import React, { useState, useRef } from "react";
import { usePopper, PopperChildrenProps } from 'react-popper';
import classNames from "classnames";

type Children<T extends HTMLElement> = React.ReactElement & {
    ref?: React.Ref<T>;
}

type Props<T extends HTMLElement> = {
    children: Children<T>,
    content: React.ReactNode | string,
    className?: string
}

export default function Tooltip<T extends HTMLElement>({ children, content, className }: Props<T>) {
    const [tooltipShow, setTooltipShow] = useState(false);
    const [referenceElement, setReferenceElement] = useState<HTMLElement>()
    const [popperElement, setPopperElement] = useState<HTMLDivElement>()
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement:'auto'
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
                    {typeof content === 'string' ?
                        (
                            <div
                                className={
                                    classNames((tooltipShow ? "" : "hidden ") +
                                    "bg-primary-600 text-white opacity-80 p-2 rounded-lg", className)
                                }
                                ref={setPopperElement}
                                style={styles.popper} {...attributes.popper}
                            >
                                {content}
                            </div>
                        ) : (
                            { content }
                        )}

                </div>
            </div>
        </>
    );
};