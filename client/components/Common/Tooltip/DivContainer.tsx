import Tooltip, { Props as P } from './Tooltip'

type Props = Omit<P<HTMLDivElement>, 'children'> & {
    children: React.ReactNode,
    className?: string
}
const DivContainer: React.FC<Props> = ({ children, className, ...other }) => {
    return (
        <Tooltip {...other}>
            <div className={className}>
                {children}
            </div>
        </Tooltip>
    )
}

export default DivContainer