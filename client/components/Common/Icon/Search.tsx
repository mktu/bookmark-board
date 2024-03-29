type Props = React.SVGAttributes<SVGSVGElement>

const Search : React.FC<Props> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round"  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
)

export default Search