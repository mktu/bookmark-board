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
    comboStyles?:Pick<CSSProperties,'width' | 'height' | 'maxHeight' | 'maxWidth'>,
    className?: string,
    poperStyles?:Pick<CSSProperties,'width' | 'height' | 'maxHeight' | 'maxWidth'>,
    allowEmpty?: boolean,
    placeholder?:string
}

const Dropdowns: React.FC<Props> = ({
    options,
    selected,
    onSelect,
    className,
    poperStyles,
    comboStyles,
    placement = 'auto',
    allowEmpty,
    placeholder
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
    const selectedLabel = options.find(v => v.value === selected) || (allowEmpty ? { label : '選択なし', value : '' } : {label : placeholder, value : ''})
    return (
        <div className={className}>
            <div className='w-full' ref={(value) => {
                if (!value) return; // called when unmounted
                setReferenceElement(value)
            }}>
                <ButtonBase
                    onClick={toggle}
                    style={comboStyles}
                    type="button"
                    className="flex w-full items-center justify-start rounded-md border border-primary-border stroke-primary-main px-4 py-2 text-sm font-medium text-primary-700 shadow-sm hover:bg-primary-hover hover:stroke-primary-dark focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                    id="options-menu"
                    aria-haspopup="true"
                    aria-expanded="true">
                    <div className='mr-2 max-w-full overflow-x-hidden truncate'>{selectedLabel?.label}</div>
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
                        <div className={'overflow-hidden overflow-y-auto rounded-md bg-white shadow-lg ring-1 ring-black/5'} style={{ width: referenceElement.clientWidth, ...poperStyles }}>
                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                {options.map(o => (
                                    <TextButton onClick={() => {
                                        onSelect(o.value)
                                        setPopoverShow(false)
                                    }} className="block w-full truncate px-4 py-2 text-left text-sm text-primary-700 hover:bg-primary-hover hover:text-primary-dark" role="menuitem" key={o.value}>{o.label}</TextButton>
                                ))}
                                {allowEmpty && (
                                    <TextButton onClick={() => {
                                        onSelect('')
                                        setPopoverShow(false)
                                    }} className="block w-full px-4 py-2 text-left text-sm text-primary-700 hover:bg-primary-hover hover:text-primary-dark" role="menuitem" key={'empty'}>選択なし</TextButton>
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