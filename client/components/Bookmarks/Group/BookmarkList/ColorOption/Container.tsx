import React, {useState} from 'react'
import { Checkbox } from '../../../../Common/Input'
import { ContainedButton, OutlinedButton } from '../../../../Common/Button'
import { useBookmarkGroup } from '../../../../../hooks/useBookmarkGroup'
import ColorInput from './ColorInput'
import ColorItem from './ListItem'
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
    const [hover,setHover] = useState(-1)
    const isVisibleAll = Object.values(colors).every(v => v.show)
    const showAll = <Checkbox id='AllCheck' label='すべて表示' checked={isVisibleAll} onChange={changeAllVisibility} />
    const renameColor = (color: string, name: string) => { updateColor(color, { name }) }
    const colorList = colors.map((c,idx) => <ColorItem
        key={c.color}
        {...{
            description : c,
            show : c.show,
            renameColor,
            listIndex : idx,
            hover,
            onHover:setHover,
            changeOrder: handleChangeColorIndex,
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