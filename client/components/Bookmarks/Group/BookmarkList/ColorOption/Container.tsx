import React, {useState, useMemo} from 'react'
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
        hasChange,
        handleAddColor,
        handleChangeColorIndex,
        handleDeleteColors,
        handleSubmit } = useBookmarkGroup(groupId)
    const [hover,setHover] = useState(-1)
    const colorList = useMemo(()=>colors.map((c,idx) => <ColorItem
        key={c.id}
        {...{
            id: c.id,
            description : c,
            updateColor,
            listIndex : idx,
            hover,
            onHover:setHover,
            changeOrder: handleChangeColorIndex,
            handleDelete : (color)=>{handleDeleteColors([color])}
        }}
    />), [colors, handleDeleteColors, handleChangeColorIndex,hover,updateColor])
    const input = useMemo(()=><ColorInput handleAddColor={handleAddColor} />,[handleAddColor])
    const submit = useMemo(()=>(<ContainedButton disabled={!hasChange} onClick={() => {
        handleSubmit(() => {
            onClose()
        })
    }} >変更を保存</ContainedButton>),[handleSubmit,onClose,hasChange])
    const cancel = (<OutlinedButton onClick={() => {
        onClose()
    }} >キャンセル</OutlinedButton>)
    
    return (
        <Presenter
            {...{
                colorList,
                input,
                submit,
                cancel,
            }}

        />
    )
}


export default Container