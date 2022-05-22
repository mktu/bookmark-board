import algoliasearch from 'algoliasearch/lite'
import {
    InstantSearch,
    connectInfiniteHits,
    connectSearchBox,
} from 'react-instantsearch-dom'
import Presenter from './Presenter'
import SearchBoxBase from './SearchBox'
import HitsBase from './Hits'

const SearchBox = connectSearchBox(SearchBoxBase)
const Hits = connectInfiniteHits(HitsBase)
const searchClient = process.env.NEXT_PUBLIC_ALGOLIA_APPID && process.env.NEXT_PUBLIC_ALGOLIA_SEARCHONLY_KEY &&
    algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_APPID, process.env.NEXT_PUBLIC_ALGOLIA_SEARCHONLY_KEY)

const Container: React.FC = () => {

    return (
        <InstantSearch searchClient={searchClient} indexName='bookmark-group'>
            <Presenter
                searchBox={<SearchBox />}
                hits={<Hits />}
            />
        </InstantSearch>)
}

export default Container