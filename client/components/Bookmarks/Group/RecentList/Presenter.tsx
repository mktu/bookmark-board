type Props = {
    bookmarkList: React.ReactNode
}

const Presenter: React.FC<Props> = ({
    bookmarkList
}) => (
    <div className='p-4 mb-4 w-full'  style={{ height: 512 }}>
        <div className='font-semibold text-primary-main border-b border-primary-border'>最近登録したブックマーク</div>
        <div className='overflow-y-auto relative w-full h-full'>
            {bookmarkList}
        </div>
    </div>
)

export default Presenter