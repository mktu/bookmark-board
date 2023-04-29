import { FC } from "react"
import data from '@emoji-mart/data'
import { init } from 'emoji-mart'
import Picker from '@emoji-mart/react'
import { TextButton } from "../Button"
import { PopoverDivContainer } from "../Popover"

init({ data })

type ViewProps = {
    iconSize: string
}

type Props = ViewProps & {
    onSelectEmoji?: (emoji: EmojiIconType) => void,
    resetable?: boolean
}

const EmojiPicker: FC<Props> = ({
    onSelectEmoji,
    resetable
}) => {
    if (!resetable) {
        return (
            <Picker data={data} onEmojiSelect={(emoji) => {
                onSelectEmoji({
                    id: emoji.id,
                    name: emoji.name,
                    native: emoji.native
                })
            }} />
        )
    }
    return (
        <ul className='rounded border border-primary-border bg-white p-2 shadow'>
            <li>
                <PopoverDivContainer render={(toggle) => (
                    <Picker data={data} onEmojiSelect={(emoji) => {
                        onSelectEmoji({
                            id: emoji.id,
                            name: emoji.name,
                            native: emoji.native
                        })
                        toggle()
                    }} />
                )}>
                    <TextButton>アイコンを変更</TextButton>
                </PopoverDivContainer>
            </li>
            <li>
                <TextButton onClick={() => {
                    onSelectEmoji({
                        id: '-1',
                        name: '',
                        native: ''
                    })
                }}>リセット</TextButton>
            </li>
        </ul>
    )
}

export default EmojiPicker