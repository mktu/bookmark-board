import { useInView } from 'react-intersection-observer'

type Props = {
    input: React.ReactNode,
    addButton: React.ReactNode,
    groupList: React.ReactNode,
    error?: string
}

const Presenter: React.FC<Props> = ({
    input,
    addButton,
    groupList,
    error
}) => {
    const { ref, inView } = useInView()
    const showError = error && (<div className='py-2 px-4 text-xs text-secondary-main'>{error}</div>)
    const groupInput = (
        <div className='flex justify-between items-center'>
            <div className='p-1 w-full'>
                {input}
            </div>
            <div>
                {addButton}
            </div>
        </div>
    )
    return (
        <div className='flex flex-col w-full h-full bg-primary-light border-r border-primary-border md:bg-white'>
            <div ref={ref} className='p-2 text-primary-main bg-white shadow md:p-1 md:shadow-none'>
                {groupInput}
                {showError}
            </div>
            <div className='overflow-y-auto md:bg-white'>
                {groupList}
            </div>
            {!inView && (
                <div className='fixed top-0 left-0 z-20 p-2 w-full text-primary-main bg-white border-primary-border shadow' >
                    {groupInput}
                    {showError}
                </div>
            )}

        </div>
    )
}

export default Presenter