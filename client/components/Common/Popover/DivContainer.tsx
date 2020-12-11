import {Popover, Props as P} from './V2Popper'

type Props = Omit<P<HTMLDivElement>, 'children'> & {
    children: React.ReactNode,
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