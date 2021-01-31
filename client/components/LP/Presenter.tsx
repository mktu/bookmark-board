import React, { useState } from 'react'

import { ContainedButton } from '../Common/Button'
import FolderOpen from '../Common/Icon/FolderOpen'
import Chat from '../Common/Icon/Chat'
import Share from '../Common/Icon/Share'
import Book from '../Common/Icon/Book'
import { LpApp, LpPubApp, LpComment, LpGroup } from '../Common/Image'

type Props = {
    handleLogin: () => void
}

const Presenter = ({
    handleLogin
}: Props) => {
    const [showLpComment, setShowLpComment] = useState(false)
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
                </div>
                <span className='inline-block shadow-lg overflow-hidden'>
                    <LpApp width='800px' height='438px' />
                </span>
            </section>
            <section className='w-full flex p-8 justify-center items-center'>

            </section>
            <section className='w-full flex p-8 justify-center items-center'>
                {/* <div>
                    <span className={`inline-block shadow-lg overflow-hidden ${showLpComment && 'w-0'}`}>
                        <LpGroup width='500' height='255'/>
                    </span>
                    <span className={`inline-block border border-primary-border overflow-hidden ${!showLpComment && 'w-0'}`}>
                        <LpComment width='500' height='95'/>
                    </span>
                </div> */}
                <div className='mx-12 break-words flex-1' style={{ maxWidth: '50%' }}>
                    <h1 className='text-primary-700 text-2xl px-4 font-bold mb-8'>ブックマークリストとして</h1>
                    <p className=''>
                        リストを個人もしくは複数の友人と使うために
                        目的に応じてカスタマイズすることができます
                    </p>
                    <div className='hover:bg-primary-hover' onMouseOver={() => { setShowLpComment(false) }} onFocus={() => { setShowLpComment(false) }}>
                        <div className='flex items-center my-2 text-primary-dark text-lg'>
                            <FolderOpen className='w-6 mr-2 stroke-primary-main' strokeWidth={1.5} />
                            <p>グループ</p>
                        </div>
                        <div className='px-2 py-1'>
                            目的や分野に応じたブックマークグループを最大50まで作成することができます。
                            また、それぞれのグループに対して50までのブックマークを登録することが可能です。一度登録したブックマークを別のグループに移動させることも容易です
                        </div>
                    </div>
                    <div className='' onMouseOver={() => { setShowLpComment(true) }} onFocus={() => { setShowLpComment(true) }}>
                        <div className='flex items-center my-2 text-primary-dark text-lg'>
                            <Chat className='w-6 mr-2 stroke-primary-main' strokeWidth={1.5} />
                            <p>表示のカスタマイズ</p>
                        </div>
                        <div className='px-2 py-1'>
                            ブックマークに対して、ひとことコメントやカラーリングなどを設定し、コンテンツを自分好みにカスタマイズすることができます。
                            ブックマークしたURLに対して、ひとこと自分なりのコメントを記載することで、そのブックマークを識別する手助けとすることができます
                        </div>
                        <div className={`overflow-hidden my-8 flex justify-center`}>
                            <LpComment />
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
                            公開ページを作成することで、ログインしていない人向けにもブックマークリストを公開することができます。自分がまとめたブックマーク集を誰かに紹介したいときに有効です
                        </div>
                    </div>
                </div>
                <div className='border border-primary-border rounded overflow-hidden'><LpPubApp width='457px' height='544px' /></div>
            </section>


            <section className='w-full flex p-8 justify-center items-center'>

            </section>
            <div className='my-8'>
                <div className='mx-12 w-1/2 break-words flex flex-col'>
                    始め方
            </div>
                <ContainedButton onClick={handleLogin}>
                    サインイン/サインアップする
                        </ContainedButton>
            </div>
        </article>
    )
}

export default Presenter;