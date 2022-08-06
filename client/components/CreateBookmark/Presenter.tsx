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
    <div className='flex h-full w-full items-center justify-center' >
        <div style={{ width: Width }}>
            <h3 className=' mt-8 text-lg font-bold text-primary-main'>ブックマークを新規追加</h3>
            <div className='mt-8 w-full'>
                {GroupDropdown}
            </div>
            <div className='mt-4 w-full rounded border border-primary-border bg-white shadow focus:ring' >
                {Input}
            </div>
            {errorMessage ? (
                <div className='mt-4 w-full text-sm text-secondary-main'>
                    {errorMessage}
                </div>
            ) : (
                <div className='mt-4 w-full' >
                    {Preview}
                </div>
            )}
            <div className='mt-4 flex w-full items-end justify-end'>
                <div>{Cancel}</div>
                <div className='ml-2'>{Submit}</div>
            </div>
        </div>
    </div>
)
export default Presenter