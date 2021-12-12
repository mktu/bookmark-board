import { LoadingImg } from '@components/Common/Image'

const Loader: React.VFC = () => (
    <div className='flex items-center'>
        <LoadingImg width={100} height={100} />
        <div className='ml-2 text-primary-main'>LINE連携処理を行なっています</div>
    </div>
)

export default Loader