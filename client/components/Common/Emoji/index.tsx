import EmojiComponent from './Emoji'
import Placeholder from './Placeholder'

type IconSize = 'md' | 'lg' | 'xl'

type Props = {
    onSelectEmoji?: (emoji: EmojiIconType) => void,
    selected?: EmojiIconType,
    iconSize?: IconSize,
    placement?: 'fixed' | 'absolute'
}

const Emoji: React.FC<Props> = ({ onSelectEmoji, selected, placement, iconSize = 'lg' }) => {
    if (selected && selected.id !== '-1') {
        return <EmojiComponent placement={placement} emoji={selected} onSelectEmoji={onSelectEmoji} iconSize={iconSize} />
    }
    return (
        <Placeholder placement={placement} onSelectEmoji={onSelectEmoji} iconSize={iconSize} />
    )
}

export default Emoji