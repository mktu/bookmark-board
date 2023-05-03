import { lazy, Suspense } from "react";
import { SvgIconButton } from "../Button"
import { LoadingImg } from "../Image";
import { PopoverDivContainer } from "../Popover"

const EmojiPicker = lazy(() => import('./EmojiPicker'));

type ViewProps = {
    emoji: EmojiIconType,
    iconSize: string
}

type Props = ViewProps & {
    onSelectEmoji?: (emoji: EmojiIconType) => void,
    placement?: 'fixed' | 'absolute'
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
    iconSize,
    placement
}) => {
    if (!onSelectEmoji) {
        return <EmojiView emoji={emoji} iconSize={iconSize} />
    }
    return (
        <PopoverDivContainer strategy={placement} render={(toggle) => (
            <Suspense fallback={
                <div className="w-[100px]">
                    <LoadingImg />
                </div>
            }>
                <EmojiPicker
                    resetable
                    iconSize={iconSize}
                    onSelectEmoji={(props) => {
                        onSelectEmoji(props)
                        toggle()
                    }}
                />
            </Suspense>
        )}>
            <SvgIconButton>
                <EmojiView emoji={emoji} iconSize={iconSize} />
            </SvgIconButton>
        </PopoverDivContainer>

    )
}

export default EmojiComponent