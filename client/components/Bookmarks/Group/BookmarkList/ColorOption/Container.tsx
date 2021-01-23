import React from 'react'
import { Checkbox } from '../../../../Common/Input'
import { ContainedButton, OutlinedButton } from '../../../../Common/Button'
import { useBookmarkGroup } from '../../../../../hooks/useBookmarkGroup'
import ColorInput from './ColorInput'
import ColorItem from './ColorItem'
import Presenter from './Presenter'

type Props = {
    groupId: string,
    onClose: () => void
}

const Container: React.FC<Props> = ({
    groupId,
    onClose
}) => {
    const {
        colors,
        updateColor,
        updateColorFilters,
        hasChange,
        handleAddColor,
        handleChangeColorIndex,
        handleDeleteColors,
        handleSubmit } = useBookmarkGroup(groupId)
    const changeAllVisibility = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            updateColorFilters(colors.map(v => ({ color: v.color, show: true })))
        } else {
            updateColorFilters(colors.map(v => ({ color: v.color, show: false })))
        }
    }
    const isVisibleAll = Object.values(colors).every(v => v.show)
    const showAll = <Checkbox id='AllCheck' label='すべて表示' checked={isVisibleAll} onChange={changeAllVisibility} />
    const renameColor = (color: string, name: string) => { updateColor(color, { name }) }
    const colorList = colors.map(c => <ColorItem
        key={c.color}
        {...{
            ...c,
            filterColor: (filter) => { updateColorFilters([filter]) },
            renameColor,
            changeOrder: (color, up) => {
                if (up) {
                    c.idx > 0 && handleChangeColorIndex(color, c.idx - 1)
                }
                else{
                    colors.length - 1 > c.idx && handleChangeColorIndex(color, c.idx + 2)
                }
            },
            handleDelete : (color)=>{handleDeleteColors([color])}
        }}
    />)
    const input = <ColorInput handleAddColor={handleAddColor} />
    const submit = (<ContainedButton disabled={!hasChange} onClick={() => {
        handleSubmit(() => {
            onClose()
        })
    }} >変更を保存</ContainedButton>)
    const cancel = (<OutlinedButton onClick={() => {
        onClose()
    }} >キャンセル</OutlinedButton>)
    
    return (
        <Presenter
            {...{
                showAll,
                colorList,
                input,
                submit,
                cancel,
            }}

        />
    )
}


export default Container