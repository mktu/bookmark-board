import { VFC, useState, useEffect } from 'react'
import LoginIcon from '@components/Common/Icon/LineLogin'
import Help from '@components/Common/Icon/Help'
import { OutlinedButton, SvgIconButton, TextButton } from '@components/Common/Button'
import XCircle from '@components/Common/Icon/XCircle'
import { isMessageHidden, setMessageVisibility } from '@utils/localStorages/messages'

type Props = {
    onClickLogin: () => void,
}

const LineLogin: VFC<Props> = ({
    onClickLogin,
}) => {
    const [hideMessage, setVisibility] = useState(false)
    useEffect(() => {
        setVisibility(isMessageHidden('line-integration'))
    }, [])
    return (
        <div>
            <div className='flex w-full items-end justify-between'>
                <LoginIcon className='h-10 w-10' />
                <OutlinedButton onClick={onClickLogin}>認証する</OutlinedButton>
            </div>

            {hideMessage ? (
                <div className='mt-2 flex items-center justify-end'>
                    <Help className='h-5 w-5 stroke-primary-main' />
                    <TextButton fontType='none' className='text-sm underline' onClick={() => {
                        setMessageVisibility('line-integration', false)
                        setVisibility(false)
                    }}>
                        LINE連携について
                    </TextButton>
                </div>
            ) : (
                <div className='relative mt-4 flex w-full flex-col justify-center'>
                    <div className='mr-2 mb-2 w-full flex-1 rounded border border-dotted border-primary-border p-2 text-sm text-primary-400'>
                        <span role='img' aria-label='right' className='mr-1'>💡</span>
                        <span>LINE連携することで、Bookmark-Board公式アカウントとのチャットを通してブックマーク登録できるようになります</span>
                    </div>
                    <SvgIconButton className='absolute -top-1 -right-1 h-5 w-5' onClick={() => {
                        setMessageVisibility('line-integration', true)
                        setVisibility(true)
                    }} ><XCircle className='rounded-full bg-white stroke-primary-400' /></SvgIconButton>
                </div>
            )}
        </div>
    )
}

export default LineLogin