type Props = React.SVGAttributes<SVGSVGElement>
const ChevronRight: React.FC<Props> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
)
export default ChevronRight