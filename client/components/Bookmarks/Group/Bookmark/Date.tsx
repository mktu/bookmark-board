import React from 'react'
import { numberToDateTime } from '../../../../utils'

type Props = {
    lastUpdate?: number,
    created: number,
    loading : boolean
}

const Date: React.FC<Props> = ({
    lastUpdate,
    created,
    loading
}) => (
        <div>
            {loading ? (
                <p className=' text-primary-main text-xs'>更新中...</p>
            ) : (
                    <p className=' text-primary-main text-xs'>{lastUpdate && `更新日時   ${numberToDateTime(lastUpdate)}`}</p>
                )}
            <p className=' text-primary-main text-xs'>{`作成日時   ${numberToDateTime(created)}`}</p>
        </div>
    )

export default Date