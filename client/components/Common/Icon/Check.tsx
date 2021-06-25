type Props = React.SVGAttributes<SVGSVGElement>

const Check: React.FC<Props> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" {...props}>
        <path strokeLinecap="round" fill='none' strokeLinejoin="round"  d="M5 13l4 4L19 7" />
    </svg>
)
export default Check