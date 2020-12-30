type Props = React.SVGAttributes<SVGSVGElement>
const ChevronDown: React.FC<Props> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
)
export default ChevronDown