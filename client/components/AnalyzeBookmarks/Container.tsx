import { useRouter } from 'next/router'
import Presenter from './Presenter'
import useBookmarkSimilarity from '@hooks/useBookmarkSimilarity'
import SimilarityList from './SimilarityList'
import SimilarityDetail from './SimilarityDetail'
import SimilarityHelp from './SimilarityHelp'

const Container: React.VFC = () => {
    const router = useRouter()
    const { ids } = router.query
    const hooks = useBookmarkSimilarity((Boolean(ids) && ids.length > 0) ? ids[0] : '')
    const { selectedBookmarkSimilarity } = hooks
    const similarityList = (<SimilarityList {...hooks} />)
    const similarityDetail =
        !selectedBookmarkSimilarity ? (<SimilarityHelp />) :
            (<SimilarityDetail bookmarkSimilarity={selectedBookmarkSimilarity} />)
    return (
        <Presenter similarityList={similarityList} similarityDetail={similarityDetail} detailSelected={Boolean(selectedBookmarkSimilarity)}/>
    )
}

export default Container