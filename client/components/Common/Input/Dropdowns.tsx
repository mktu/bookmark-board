import React, { useState, useCallback, CSSProperties } from 'react'
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
    selected: string,
    onSelect: (selected: string) => void,
    placement?: PopperChildrenProps['placement'],
    className?: string,
    poperStyles?:Pick<CSSProperties,'width' | 'height' | 'maxHeight' | 'maxWidth'>,
    allowEmpty?: boolean
}

const Dropdowns: React.FC<Props> = ({
    options,
    selected,
    onSelect,
    className,
    poperStyles,
    placement = 'auto',
    allowEmpty
}) => {

    const [popoverShow, setPopoverShow] = useState(false);
    const [referenceElement, setReferenceElement] = useState<HTMLElement>(null)
    const [popperElement, setPopperElement] = useState<HTMLDivElement>(null)
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement
    });
    const toggle = useCallback<Parameters<typeof ButtonBase>[0]['onClick']>((e) => {
        e.stopPropagation && e.stopPropagation()
        e.preventDefault && e.preventDefault()
        setPopoverShow(before => !before)
    }, []);
    const selectedLabel = options.find(v => v.value === selected)
    return (
        <div className={className}>
            <div className='w-full' ref={(value) => {
                if (!value) return; // called when unmounted
                setReferenceElement(value)
            }}>
                <ButtonBase
                    onClick={toggle}
                    type="button"
                    className="flex items-center justify-start w-full rounded-md border border-primary-border shadow-sm px-4 py-2 text-sm font-medium text-primary-700 hover:bg-primary-hover focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 stroke-primary-main hover:stroke-primary-dark"
                    id="options-menu"
                    aria-haspopup="true"
                    aria-expanded="true">
                    <div className='max-w-full overflow-x-hidden truncate mr-2'>{selectedLabel?.label}</div>
                    <ChevronDown className='ml-auto w-5' strokeWidth={2} />
                </ButtonBase>
            </div>

            {popoverShow && (
                <Clickaway onClickAway={() => {
                    setPopoverShow(false)
                }}>
                    <div className={'z-20'} ref={(value) => {
                        if (!value) return;
                        setPopperElement(value)
                    }} style={styles.popper} {...attributes.popper}>
                        <div className={'rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-hidden overflow-y-auto'} style={{ width: referenceElement.clientWidth, ...poperStyles }}>
                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                {options.map(o => (
                                    <TextButton onClick={() => {
                                        onSelect(o.value)
                                        setPopoverShow(false)
                                    }} className="block px-4 py-2 text-sm text-primary-700 hover:bg-primary-hover hover:text-primary-dark w-full text-left truncate" role="menuitem" key={o.value}>{o.label}</TextButton>
                                ))}
                                {allowEmpty && (
                                    <TextButton onClick={() => {
                                        onSelect('')
                                        setPopoverShow(false)
                                    }} className="block px-4 py-2 text-sm text-primary-700 hover:bg-primary-hover hover:text-primary-dark w-full text-left" role="menuitem" key={'empty'}>選択なし</TextButton>
                                )}
                            </div>
                        </div>
                    </div>
                </Clickaway>
            )}
        </div>
    )
}

export default Dropdowns