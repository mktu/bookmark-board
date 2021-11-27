type Props = {
    groups : React.ReactNode,
    error ?:string
}

const Presenter : React.VFC<Props> = ({
    groups,
    error
})=> (
    <div>
        <p className='my-2 font-semibold text-primary-main'>登録先グループを選択してください</p>
        {error && (
            <div className='text-secondary-main'>{error}</div>
        )}
        <ul>
            {groups}
        </ul>
        <div className='fixed bottom-0 left-2 w-full bg-white'>
            登録
        </div>
    </div>
)

export default Presenter