import { VFC } from "react";

type Props = {
    Input: React.ReactNode
    Preview: React.ReactNode,
    Submit: React.ReactNode,
    Cancel: React.ReactNode,
    GroupDropdown: React.ReactNode,
    errorMessage?: string
}

const Width = 300

const Presenter: VFC<Props> = ({
    Input,
    Preview,
    GroupDropdown,
    Submit,
    Cancel,
    errorMessage
}) => (
    <div className='w-full h-full flex items-center justify-center' >
        <div style={{ width: Width }}>
            <h3 className=' text-primary-main font-bold text-lg mt-8'>ブックマークを新規追加</h3>
            <div className='mt-8 w-full'>
                {GroupDropdown}
            </div>
            <div className='bg-white rounded shadow focus:shadow-outline mt-4 border-primary-border border w-full' >
                {Input}
            </div>
            {errorMessage && (
                <div className='text-secondary-main mt-4 w-full text-sm'>
                    {errorMessage}
                </div>
            )}
            <div className='mt-4 w-full' >
                {Preview}
            </div>
            <div className='flex items-end justify-end mt-4 w-full'>
                <div>{Cancel}</div>
                <div className='ml-2'>{Submit}</div>
            </div>
        </div>
    </div>
)
export default Presenter