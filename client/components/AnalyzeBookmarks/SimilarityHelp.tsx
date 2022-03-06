import Image from 'next/image'
import AnalysisImage from 'public/undraw_file_analysis_8k9b.svg'

const SimilarityHelp: React.VFC = () => {
    return (
        <div className='flex flex-col items-center p-6 w-full'>
            <h1 className='text-2xl font-bold text-primary-main'>Bookmark Advice</h1>
            <div className=''>
                <Image width={300} height={350} src={AnalysisImage} />
            </div>
            <h3 className='my-2 font-semibold text-primary-main'>
                <span role='img' aria-label='suprise'>✨</span>
                <span>ブックマークの分類をお手伝いします</span>
            </h3>
            <ul className='px-16 text-sm'>
                <li>
                    <span>■ 気付かぬ間に類似するグループが2つできていた</span>
                    <span role='img' aria-label='suprise'>😲</span></li>
                <li>
                    <span>■ 適当なグループに登録したブックマークを放置したまま埋もれてしまった</span>
                    <span role='img' aria-label='confuse'>😥</span></li>
            </ul>
            <p className='px-16 my-2 text-sm'>...ブックマーク間の類似度をもとに、そういった類似グループや外れたブックマークを抽出し、相応しいグループを提案します</p>
            <p className='flex justify-end px-16 w-full text-sm'>
                    <span role='img' aria-label='details' className='mr-2'>👉</span>
                    <a href='#dsf'>詳細はこちら</a>
                
            </p>
        </div>
    )
}

export default SimilarityHelp