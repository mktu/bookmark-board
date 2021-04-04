import React, { useState } from "react";
import {useScrollFadeIn} from '@hooks/useScrollFadeIn'

type Children<T extends HTMLElement> = React.ReactElement & {
    ref?: React.Ref<T>;
}

export type Props<T extends HTMLElement> = {
    children: Children<T>,
    translate: Parameters<typeof useScrollFadeIn>[1],
    adjust?: Parameters<typeof useScrollFadeIn>[2],
}

export default function ScrollFadein<T extends HTMLElement>({ children, translate, adjust }: Props<T>) {
    const [referenceElement, setReferenceElement] = useState<HTMLElement>()
    const { nodeStyle } = useScrollFadeIn(referenceElement, translate, adjust)
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
        style : nodeStyle,
    }

    return (
        <>
            {React.cloneElement(children, childProps)}
        </>
    );
}