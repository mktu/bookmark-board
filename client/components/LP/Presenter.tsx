import React from 'react'

import { ContainedButton } from '../Common/Button'
import FolderOpen from '../Common/Icon/FolderOpen'
import Chat from '../Common/Icon/Chat'
import Share from '../Common/Icon/Share'
import Book from '../Common/Icon/Book'
import { LpBubble, LpApp, LpPubApp } from '../Common/Image'

type Props = {
    handleLogin: () => void
}

const Presenter = ({
    handleLogin
}: Props) => {
    return (
        <article className='w-screen flex flex-col mt-8' style={{
            backgroundImage: `url('/untitled.svg')`,
            backgroundRepeat: 'repeat',
        }}>
            <section className='w-full flex flex-row p-8 justify-center'>
                <div className='mx-12 w-2/6 break-words mt-8 flex flex-col items-center justify-center'>
                    <h1 className=' text-primary-700 text-2xl p-4 font-bold'>ブックマークを親しい人と共有したい</h1>
                    <p>
                        友達や家族と好きなものを共有したい。そんな時に役立つものを目指したシンプルなブックマークサービスです
                        もちろん、共有なしの個人利用もできます！
                    </p>
                    <div className='my-8'>
                        <ContainedButton onClick={handleLogin}>
                            サインイン/サインアップする
                        </ContainedButton>
                    </div>
                </div>
            </section>
            <section className='w-full flex flex-row p-8 justify-center'>
                <div className='border border-primary-border rounded overflow-hidden'><LpApp width='720px' height='394px' /></div>
                <div className='mx-12 w-2/6 break-words mt-8 flex flex-col '>
                    <h1 className=' text-primary-700 text-2xl p-4 font-bold'>自分のブックマークリストとして</h1>
                    <p className=''>
                        リストを個人もしくは複数の友人と使うために
                        目的に応じてカスタマイズすることができます
                    </p>
                    <div>
                        <div className='flex items-center my-2 text-primary-dark text-lg'>
                            <FolderOpen className='w-6 mr-2 stroke-primary-main' strokeWidth={1.5} />
                            <p>グループ</p>
                        </div>
                        <div className='px-2 py-1'>
                            目的や分野に応じたグループ付をすることができます。またカラーリングによって、グループの中でもさらにリストを細分化することができます
                        </div>
                    </div>
                    <div>
                        <div className='flex items-center my-2 text-primary-dark text-lg'>
                            <Chat className='w-6 mr-2 stroke-primary-main' strokeWidth={1.5} />
                            <p>ひとこと</p>
                        </div>
                        <div className='px-2 py-1'>
                            ブックマークしたURLに対して、ひとこと自分なりのコメントを記載することで、そのブックマークを識別する手助けとすることができます
                        </div>
                    </div>
                </div>
            </section>

            <section className='w-full flex p-8 justify-center'>
                <div className='mx-12 w-1/2 break-words flex flex-col'>
                    <div className='flex items-center my-8'>
                        <h1 className='mx-4 text-primary-700 text-2xl p-4 font-bold'>人と共有するブックマークリストとして</h1>
                    </div>

                    <p className=''>
                        作成したブックマークリストは、自分が共有したい人と共有することができます
                    </p>
                    <div>
                        <div className='flex items-center my-2 text-primary-dark text-lg'>
                            <Share className='w-6 mr-2 stroke-primary-main' strokeWidth={1.5} />
                            <p>共同編集</p>
                        </div>
                        <div className='px-2 py-1'>
                            共有したい人をブックマークリストの共同編集者として招待することで、一緒にそのブックマークを充実させることができます。誰かと一緒に情報を収集したい際などに便利です
                        </div>
                    </div>
                    <div>
                        <div className='flex items-center my-2 text-primary-dark text-lg'>
                            <Book className='w-6 mr-2 stroke-primary-main' strokeWidth={1.5} />
                            <p>公開ページ</p>
                        </div>
                        <div className='px-2 py-1'>
                            公開ページを作成することで、ログインしていない人向けにもブックマークリストを公開することができます。自分が収集したブックマーク集を
                        </div>
                    </div>
                </div>
                <div className='border border-primary-border rounded overflow-hidden'><LpPubApp width='457px' height='544px' /></div>
            </section>
            
        </article>
    )
}

export default Presenter;