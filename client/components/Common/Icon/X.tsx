type Props = React.SVGAttributes<SVGSVGElement>
const X: React.FC<Props> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 24 24" >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
)
export default X