const AnalyzeGroupThreshold = 3


const NotFound: React.VFC = () => (
    <div className='p-4 text-primary-main'>
        <h4 className='my-2'>現在、ご提案できる内容はありません。</h4>
        <p className="text-sm">
            <span role='img' aria-label='info' className="mr-1">■</span>
            <span>分析の対象については、{AnalyzeGroupThreshold}ブックマーク以上の登録が行われているグループとなります。</span>
        </p>
        <p className="text-sm">
            <span role='img' aria-label='info' className="mr-1">■</span>
            <span>分析は毎週日曜日の00時に実施されます。</span>
        </p>
    </div>
)

export default NotFound