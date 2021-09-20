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
    <div className='flex justify-center items-center w-full h-full' >
        <div style={{ width: Width }}>
            <h3 className=' mt-8 text-lg font-bold text-primary-main'>ブックマークを新規追加</h3>
            <div className='mt-8 w-full'>
                {GroupDropdown}
            </div>
            <div className='mt-4 w-full bg-white rounded border border-primary-border focus:ring shadow' >
                {Input}
            </div>
            {errorMessage && (
                <div className='mt-4 w-full text-sm text-secondary-main'>
                    {errorMessage}
                </div>
            )}
            <div className='mt-4 w-full' >
                {Preview}
            </div>
            <div className='flex justify-end items-end mt-4 w-full'>
                <div>{Cancel}</div>
                <div className='ml-2'>{Submit}</div>
            </div>
        </div>
    </div>
)
export default Presenter