import EmojiComponent from './Emoji'
import Placeholder from './Placeholder'

type IconSize = 'md' | 'lg' | 'xl'

type Props = {
    onSelectEmoji?: (emoji: EmojiIconType) => void,
    selected?: EmojiIconType,
    iconSize?: IconSize
}

const Emoji: React.FC<Props> = ({ onSelectEmoji, selected, iconSize = 'lg' }) => {
    if (selected && selected.id !== '-1') {
        return <EmojiComponent emoji={selected} onSelectEmoji={onSelectEmoji} iconSize={iconSize} />
    }
    return (
        <Placeholder onSelectEmoji={onSelectEmoji} iconSize={iconSize} />
    )
}

export default Emoji