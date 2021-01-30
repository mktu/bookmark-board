import React from 'react'
import { LpApp } from '../../Common/Image/Lp'

export const Title = 'ブックマークを親しい人と共有したい'

export const Content: React.ReactNode = (
    <p>
        友達や家族と好きなものを共有したい。そんな時に役立つものを目指したシンプルなブックマークサービスです
        もちろん、共有なしの個人利用もできます！
    </p>
)
// 16:9
// 4:17
export const Image = <>
    <div className='hidden md:block'>
        <LpApp width={720} height={405} />
    </div>
    <div className='md:hidden shadow-lg'>
        <LpApp width={512} height={280}/>
    </div>
</>
