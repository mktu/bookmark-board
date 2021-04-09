import React from 'react'
import FolderOpen from '../../Common/Icon/FolderOpen'
import Share from '../../Common/Icon/Share'
import { LpComment, LpShare, LpGroup } from '../../Common/Image/Lp'
import Template from '../../Common/Icon/Template'

export const Title = 'FEATURES'

export const Topics = [
    {
        icon: <FolderOpen className='w-8' />,
        name: 'グループ',
        content: (
            <div>
                <p>
                    目的や分野に応じたブックマークグループを最大50まで作成することができます。
                    また、それぞれのグループに対して50までのブックマークを登録することが可能です。一度登録したブックマークを別のグループに移動させることも可能です
                </p>
                <div className='relative flex justify-end mt-4' style={{ width: '100%', height: '300px' }}>
                    <LpGroup />
                </div>
            </div>
        )
    },
    {
        icon: <Share className='w-8 stroke-primary-main' />,
        name: '共同編集',
        content: (
            <div>
                <p>
                    共有したい人をブックマークリストの共同編集者として招待することで、一緒にそのブックマークを充実させることができます。誰かと一緒に情報を収集したい際などに便利です
                </p>
                <div className='relative mt-4 flex justify-end' style={{ width: '100%', height: '300px' }}>
                    <LpShare />
                </div>
            </div>
        )
    },
    {
        icon: <Template className='w-8 stroke-primary-main' />,
        name: '整理整頓',
        content: (
            <div className='flex flex-col'>
                <p>
                    ブックマークに対して、ひとことコメントやカラーなどを設定し、コンテンツを自分好みにカスタマイズすることができます。
                    自分なりの色やコメントを記載することで、そのブックマークを識別する手助けとすることができます
                </p>
                <div className='relative mt-4 w-full' style={{height:'300px', width : '100%'}}>
                    <LpComment />
                </div>
            </div>
        )
    },
]

