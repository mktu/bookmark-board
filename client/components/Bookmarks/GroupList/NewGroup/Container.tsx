import GroupInput from './GroupInput'
import Presenter from './Presenter'
import TextArea from '@components/Common/Input/TextArea'
import { ContainedButton, OutlinedButton } from '@components/Common/Button'
import useNewBookmarkGroup from '@hooks/useNewBookmarkGroup'

type Props = {
    onClose: () => void
}

const Container: React.FC<Props> = ({ onClose }) => {
    const {
        newGroup,
        setNewGroup,
        submit: handleSubmit,
        error,
        description: descriptionInput,
        setDescription,
        emojiIcon,
        setEmojiIcon } = useNewBookmarkGroup()

    const input = (
        <GroupInput
            value={newGroup}
            onSelectEmoji={setEmojiIcon}
            emojiIcon={emojiIcon}
            onChange={(e) => { setNewGroup(e.target.value) }}

        />
    )
    const description = (
        <TextArea
            label='説明'
            id='description'
            maxRows={4}
            minRows={2}
            placeholder='説明を記載（任意）'
            border='outlined'
            paddings='p-2'
            value={descriptionInput}
            onChange={(e) => { setDescription(e.target.value) }}
        />
    )
    const submit = (
        <ContainedButton
            className='text-sm'
            disabled={Boolean(error) || !newGroup}
            onClick={() => {
                handleSubmit().then(() => {
                    onClose()
                })
            }}
        >作成</ContainedButton>
    )
    const cancel = (
        <OutlinedButton className='mr-2 text-sm' onClick={onClose}>キャンセル</OutlinedButton>
    )
    return (
        <Presenter
            input={input}
            submit={submit}
            cancel={cancel}
            description={description}
            error={error}
        />
    )
}

export default Container