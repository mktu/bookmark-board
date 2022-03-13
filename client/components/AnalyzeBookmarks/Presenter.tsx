import Split from 'react-split'
import { checkIsTouch } from '@utils/dnd'

type Props = {
    similarityList : React.ReactNode,
    similarityDetail : React.ReactNode,
    detailSelected : boolean
}

const isTouch = checkIsTouch()

const Presenter: React.VFC<Props> = ({
    similarityList,
    similarityDetail,
    detailSelected
}) => isTouch ? (
    <div className='flex overflow-x-hidden flex-row w-full h-full'>
        {detailSelected ? similarityDetail : similarityList}
    </div>
) : (
    <Split className='flex flex-row w-full h-full bg-white' gutterAlign="center" sizes={[70, 30]} minSize={[256, 512]}
        gutter={(_, direction) => {
            const gutterElement = document.createElement('div')
            gutterElement.className = `gutter gutter-${direction} w-[2px] bg-primary-border hover:cursor-col-resize hover:w-4 hover:border-x hover:border-secondary-border hover:bg-secondary-light transition-all delay-300 duration-300 ease-in-out`
            return gutterElement
        }}
        gutterStyle={() => ({})}
    >
        <div className={`h-full w-full`}>{similarityList}</div>
        <div className={`h-full w-full border-primary-border`}>{similarityDetail}</div>
    </Split>
)

export default Presenter