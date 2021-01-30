import React from 'react'
import { ContainedButton } from '../../Common/Button'

export const Title = '利用を始める'

export const Content: React.FC<{ handleLogin: () => void }> = ({
    handleLogin
}) => (
    <p>
        <div>Googleのアカウントがあれば無料で開始することができます。早速ブックマークの登録を行いましょう！</div>
        <div className='my-4 w-full flex justify-center'>
            <ContainedButton onClick={handleLogin}>サインイン・サインアップする</ContainedButton>
        </div>
    </p>
)
