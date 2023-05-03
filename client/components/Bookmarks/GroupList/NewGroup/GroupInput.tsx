import React from 'react'
import { InputProps, } from '@components/Common/Input/TextInputBase'
import TextInput from '@components/Common/Input/TextInput'
import Emoji from '@components/Common/Emoji'

const Input: React.FC<InputProps & {
    onSelectEmoji: (emoji: EmojiIconType) => void,
    emojiIcon?: EmojiIconType
}> = ({
    onSelectEmoji,
    emojiIcon,
    ...props
}) => {
        return (
            <div>
                <div className='flex max-w-full flex-row items-center overflow-hidden'>
                    <span className="items-center justify-center bg-transparent">
                        <Emoji selected={emojiIcon} placement='fixed' iconSize='lg' onSelectEmoji={onSelectEmoji} />
                    </span>
                    <div className='w-full flex-1 overflow-hidden'>
                        <div className='rounded bg-white shadow focus:ring'>
                            <TextInput placeholder='グループ名を入力' aria-label='Input Bookmark URL' {...props} />
                        </div>
                    </div>
                </div>
            </div>
        )

    }

export default Input