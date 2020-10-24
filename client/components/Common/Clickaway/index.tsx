import React, { useState, useEffect, MutableRefObject } from "react";

type ClickAwayListenerProps<T extends HTMLElement> = {
    onClickAway: () => void;
    children: React.ReactElement & React.RefAttributes<T>
};

function ClickAwayListener<T extends HTMLElement>({
    children,
    onClickAway,
}: ClickAwayListenerProps<T>) {
    const [element, setElement] = useState<T>();
    useEffect(() => {
        let unmounted = false;
        let document;
        const onClick = (e: Event) => {
            if (unmounted || !element) {
                return;
            }
            if (!element.contains(e.currentTarget as Node)) {
                onClickAway();
            }
        }
        if (element) {
            document = element.ownerDocument;
            document.addEventListener('click', onClick);
        }
        return () => {
            unmounted = true;
            document?.removeEventListener('click', onClick);
        }
    }, [onClickAway, element]);

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
            setElement(value);
        }
    }
    return React.cloneElement(children, childProps);
};

export default ClickAwayListener;
