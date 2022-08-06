type Props = {
    bookmarkList: React.ReactNode
}

const Presenter: React.FC<Props> = ({
    bookmarkList
}) => (
    <div className='mb-4 w-full p-4' style={{ height: 512 }}>
        <div className='border-b border-primary-border font-semibold text-primary-main'>最近登録したブックマーク</div>
        <div className='relative h-full w-full overflow-y-auto'>
            {bookmarkList}
        </div>
    </div>
)

export default Presenter