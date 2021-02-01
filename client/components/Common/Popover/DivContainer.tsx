import {Popover, Props as P} from './V2Popper'

type Props = P<HTMLDivElement> & {
    className?: string
}
const DivContainer: React.FC<Props> = ({ children, className, ...other }) => {
    return (
        <Popover {...other}>
            <div className={className}>
                {children}
            </div>
        </Popover>
    )
}

export default DivContainer