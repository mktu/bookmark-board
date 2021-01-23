type Props = React.SVGAttributes<SVGSVGElement>
const ArrowUp: React.FC<Props> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round"  d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>
)
export default ArrowUp