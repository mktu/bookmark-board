import { useInView } from 'react-intersection-observer'

type Props = {
    groupList: React.ReactNode,
    refinements: React.ReactNode,
    searchFilter: React.ReactNode
}

const Presenter: React.FC<Props> = ({
    refinements,
    groupList,
    searchFilter
}) => {
    const { ref, inView } = useInView()
    return (
        <div className='flex h-full w-full flex-col bg-primary-light md:bg-white'>
            <div ref={ref} className='bg-white py-1 px-0 text-primary-main'>
                {refinements}
            </div>
            <div className='w-full overflow-hidden'>{searchFilter}</div>
            <div className='overflow-y-auto md:bg-white'>
                {groupList}
            </div>
            {!inView && (
                <div className='fixed top-0 left-0 z-20 w-full border-primary-border bg-white text-primary-main shadow' >
                    {refinements}
                </div>
            )}

        </div>
    )
}

export default Presenter