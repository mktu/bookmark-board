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
            <div className='flex justify-between items-end w-full'>
                <LoginIcon className='w-10 h-10' />
                <OutlinedButton onClick={onClickLogin}>認証する</OutlinedButton>
            </div>

            {hideMessage ? (
                <div className='flex justify-end items-center mt-2'>
                    <Help className='w-5 h-5 stroke-primary-main' />
                    <TextButton fontType='none' className='text-sm underline' onClick={() => {
                        setMessageVisibility('line-integration', false)
                        setVisibility(false)
                    }}>
                        LINE連携について
                    </TextButton>
                </div>
            ) : (
                <div className='flex relative flex-col justify-center mt-4 w-full'>
                    <div className='flex-1 p-2 mr-2 mb-2 w-full text-sm text-primary-400 rounded border border-primary-border border-dotted'>
                        <span role='img' aria-label='right' className='mr-1'>💡</span>
                        <span>LINE連携することで、Bookmark-Board公式アカウントとのチャットを通してブックマーク登録できるようになります</span>
                    </div>
                    <SvgIconButton className='absolute -top-1 -right-1 w-5 h-5' onClick={() => {
                        setMessageVisibility('line-integration', true)
                        setVisibility(true)
                    }} ><XCircle className='bg-white stroke-primary-400' /></SvgIconButton>
                </div>
            )}
        </div>
    )
}

export default LineLogin