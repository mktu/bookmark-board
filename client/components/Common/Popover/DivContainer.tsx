import {Popover, Props as P} from './V2Popper'

type Props = Omit<P<HTMLDivElement>,'children'> & {
    className?: string,
    children : React.ReactNode
}
const DivContainer: React.FC<Props> = ({ children, className, content, render, ...other }) => {
    return (
        <Popover {...other} content={content} render={render}>
            <div className={className}>
                {children}
            </div>
        </Popover>
    )
}

export default DivContainer