import { useState } from 'react'

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
    const [footerHeight, setFooter] = useState<number>()
    return (
        <div className='flex flex-col w-full h-full bg-white border-r border-primary-border'>
            <div className='hidden md:flex flex-row justify-between items-center p-1 text-primary-main border-primary-border'>
                <div className='p-2 w-full'>
                    {input}
                </div>
                <div>
                    {addButton}
                </div>
            </div>
            {error && (<div className='hidden md:block py-2 px-4 text-xs text-secondary-main'>{error}</div>)}
            <div className='overflow-y-auto mt-2 md:mt-0 h-full'>
                {groupList}
            </div>
            <div className='md:hidden' style={{
                height: footerHeight ? footerHeight : undefined
            }} />
            <div className='flex md:hidden fixed bottom-0 z-20 items-center p-4 w-full text-primary-main bg-white border-t border-primary-border' ref={(r) => {
                if (r) {
                    // set height only once because input height may change when url image shows
                    setFooter(b => !b ? r.clientHeight : b)
                }
            }}>
                <div className='w-full'>
                    {input}
                    {error && (<div className='md:hidden px-4 text-xs text-secondary-main'>{error}</div>)}
                </div>
                <div className='mx-1 ml-auto'>
                    {addButton}
                </div>

            </div>
        </div>
    )
}

export default Presenter