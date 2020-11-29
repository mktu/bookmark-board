import React from 'react'

import { Logo } from '../Common/Logo'
import { ContainedButton } from '../Common/Button'
import { BookmarksMainImg } from '../Common/Image'

type Props = {
    handleLogin : ()=>void
}

const Presenter = ({
    handleLogin
}: Props) => {
    return (
        <div className='w-screen flex flex-col mt-12'>
            <div className='w-full flex flex-row p-8 justify-center'>
                <div className='w-2/6 break-words mr-16 mt-16'>
                    <h1 className=' text-primary-700 text-2xl p-4 font-bold'>ブックマークをより価値あるものへ</h1>
                    <article className='ov'>ブックマークを集約し、仲間で内容を精査し、適切に絞り込む事で、より有益なブックマークリストに成長させることを目的としたサービスです</article>
                    <div className='p-4'>
                        <ContainedButton onClick={handleLogin}>
                            すぐに始める
                        </ContainedButton>
                    </div>
                </div>
                <div>
                    <BookmarksMainImg width={450} height={400}/>
                </div>
            </div>
        </div>
    )
}

export default Presenter;