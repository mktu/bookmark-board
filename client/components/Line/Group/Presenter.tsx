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
            <div className='fixed bottom-0 left-0 w-full border-t border-primary-border bg-white p-4' ref={(r) => {
                if (r) {
                    // set height only once because input height may change when url image shows
                    setFooter(b => !b ? r.clientHeight : b)
                }
            }}>
                <div className='flex items-center justify-center'>
                    <div className='mr-2 flex flex-1 justify-center'>{cancel}</div>
                    <div className=' flex flex-1 justify-center'>{submit}</div>
                </div>
            </div>
        </div>
    )
}

export default Presenter