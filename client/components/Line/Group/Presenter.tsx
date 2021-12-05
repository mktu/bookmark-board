import {useState} from 'react'
type Props = {
    groups: React.ReactNode,
    submit: React.ReactNode,
    cancel: React.ReactNode,
}

const Presenter: React.VFC<Props> = ({
    groups,
    submit,
    cancel
}) => {
    const [footerHeight, setFooter] = useState<number>()
    return (
        <div>
            <p className='my-2 font-semibold text-primary-main'>登録先グループを選択してください</p>
            <ul>
                {groups}
            </ul>
            <div style={{
                height: footerHeight ? footerHeight : undefined
            }} />
            <div className='fixed bottom-0 left-0 p-4 w-full bg-white border-t border-primary-border' ref={(r) => {
                if (r) {
                    // set height only once because input height may change when url image shows
                    setFooter(b => !b ? r.clientHeight : b)
                }
            }}>
                <div className='flex justify-center items-center'>
                    <div className='flex flex-1 justify-center mr-2'>{cancel}</div>
                    <div className=' flex flex-1 justify-center'>{submit}</div>
                </div>
            </div>
        </div>
    )
}

export default Presenter