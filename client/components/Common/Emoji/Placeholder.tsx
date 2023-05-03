import { lazy, Suspense } from "react";
import { SvgIconButton } from "../Button"
import { FolderOpen } from "../Icon"
import { LoadingImg } from "../Image";
import { PopoverDivContainer } from "../Popover"

const EmojiPicker = lazy(() => import('./EmojiPicker'));

type ViewProps = {
    iconSize: string
}

type Props = ViewProps & {
    onSelectEmoji?: (emoji: EmojiIconType) => void,
    placement?: 'fixed' | 'absolute'
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

const Placeholder: React.FC<Props> = ({ onSelectEmoji, iconSize, placement }) => {
    if (!onSelectEmoji) {
        return <PlaceholderView iconSize={iconSize} />
    }
    return (
        <PopoverDivContainer strategy={placement} render={(toggle) => (
            <Suspense fallback={
                <div className="w-[100px]">
                    <LoadingImg />
                </div>
            }>
                <EmojiPicker
                    iconSize={iconSize}
                    onSelectEmoji={(props) => {
                        onSelectEmoji(props)
                        toggle()
                    }}
                />
            </Suspense>
        )}>
            <SvgIconButton>
                <PlaceholderView iconSize={iconSize} />
            </SvgIconButton>
        </PopoverDivContainer>
    )
}

export default Placeholder