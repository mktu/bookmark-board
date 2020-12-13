import React, { useState, useCallback } from 'react'
import { ChevronDown } from '../Icon'
import { TextButton, ButtonBase } from '../Button'
import { usePopper, PopperChildrenProps } from 'react-popper';
import Clickaway from '../Clickaway'

type Label = {
    label: string,
    value: string
}

type Props = {
    options: Label[],
    selected: Label,
    onSelect: (selected: string) => void,
    placement?: PopperChildrenProps['placement'],
    className ?:string
}

const Dropdowns: React.FC<Props> = ({
    options,
    selected,
    onSelect,
    className,
    placement = 'auto'
}) => {

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
        <div className={className}>
            <div ref={(value) => {
                if (!value) return; // called when unmounted
                setReferenceElement(value)
            }}>
                <ButtonBase
                    onClick={toggle}
                    type="button"
                    className="inline-flex items-center justify-start w-full rounded-md border border-primary-border shadow-sm px-4 py-2  text-sm font-medium text-primary-700 hover:bg-primary-hover focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 stroke-primary-main hover:stroke-primary-dark"
                    id="options-menu"
                    aria-haspopup="true"
                    aria-expanded="true">
                    {selected.label}
                    <ChevronDown className='ml-2 w-5' strokeWidth={2} />
                </ButtonBase>
            </div>

            {popoverShow && (
                <Clickaway onClickAway={() => {
                    setPopoverShow(false)
                }}>
                    <div className={'z-20'} ref={setPopperElement} style={styles.popper} {...attributes.popper}>
                        <div className={`rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`} style={{ minWidth: referenceElement.clientWidth }}>
                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                {options.map(o => (
                                    <TextButton onClick={() => {
                                        onSelect(o.value)
                                        setPopoverShow(false)
                                    }} className="block px-4 py-2 text-sm text-primary-700 hover:bg-primary-hover hover:text-primary-dark w-full text-left" role="menuitem" key={o.value}>{o.label}</TextButton>
                                ))}
                            </div>
                        </div>
                    </div>
                </Clickaway>
            )}
        </div>
    )
}

export default Dropdowns