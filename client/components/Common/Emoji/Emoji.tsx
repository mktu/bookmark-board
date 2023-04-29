import { SvgIconButton } from "../Button"
import data from '@emoji-mart/data'
import { init } from 'emoji-mart'
import { PopoverDivContainer } from "../Popover"
import EmojiPicker from "./EmojiPicker"

init({ data })

type ViewProps = {
    emoji: EmojiIconType,
    iconSize: string
}

type Props = ViewProps & {
    onSelectEmoji?: (emoji: EmojiIconType) => void,
}

const iconSizeMap = {
    'md': 'p-1 text-xl',
    'lg': 'p-1 text-2xl'
}

export const EmojiView: React.FC<ViewProps> = ({
    emoji,
    iconSize
}) => (
    <span role='img' aria-label={emoji.name} className={iconSizeMap[iconSize]}>
        {emoji.native}
    </span>
)

const EmojiComponent: React.FC<Props> = ({
    emoji,
    onSelectEmoji,
    iconSize
}) => {
    if (!onSelectEmoji) {
        return <EmojiView emoji={emoji} iconSize={iconSize} />
    }
    return (
        <PopoverDivContainer render={(toggle) => (
            <EmojiPicker
                resetable
                iconSize={iconSize}
                onSelectEmoji={(props) => {
                    onSelectEmoji(props)
                    toggle()
                }}
            />
        )}>
            <SvgIconButton>
                <EmojiView emoji={emoji} iconSize={iconSize} />
            </SvgIconButton>
        </PopoverDivContainer>

    )
}

export default EmojiComponent