import { useInView } from 'react-intersection-observer'

type Props = {
    groupList: React.ReactNode,
    refinements: React.ReactNode,
}

const Presenter: React.FC<Props> = ({
    refinements,
    groupList,
}) => {
    const { ref, inView } = useInView()
    return (
        <div className='flex flex-col w-full h-full bg-primary-light border-r border-primary-border md:bg-white'>
            <div ref={ref} className='py-1 px-0 text-primary-main bg-white'>
                {refinements}
            </div>
            <div className='overflow-y-auto md:bg-white'>
                {groupList}
            </div>
            {!inView && (
                <div className='fixed top-0 left-0 z-20 w-full text-primary-main bg-white border-primary-border shadow' >
                    {refinements}
                </div>
            )}

        </div>
    )
}

export default Presenter