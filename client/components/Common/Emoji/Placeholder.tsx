import { SvgIconButton } from "../Button"
import { FolderOpen } from "../Icon"
import { PopoverDivContainer } from "../Popover"
import EmojiPicker from "./EmojiPicker"

type ViewProps = {
    iconSize: string
}

type Props = ViewProps & {
    onSelectEmoji?: (emoji: EmojiIconType) => void,
}

const iconSizeMap = {
    'md': 'h-5 w-5',
    'lg': 'h-8 w-8'
}

export const PlaceholderView: React.FC<ViewProps> = ({
    iconSize
}) => (
    <FolderOpen className={`${iconSizeMap[iconSize]} stroke-primary-main`} strokeWidth={1} />
)

const Placeholder: React.FC<Props> = ({ onSelectEmoji, iconSize }) => {
    if (!onSelectEmoji) {
        return <PlaceholderView iconSize={iconSize} />
    }
    return (
        <PopoverDivContainer render={(toggle) => (
            <EmojiPicker
                iconSize={iconSize}
                onSelectEmoji={(props) => {
                    onSelectEmoji(props)
                    toggle()
                }}
            />
        )}>
            <SvgIconButton>
                <PlaceholderView iconSize={iconSize} />
            </SvgIconButton>
        </PopoverDivContainer>
    )
}

export default Placeholder