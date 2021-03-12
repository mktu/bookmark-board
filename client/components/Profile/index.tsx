import React from 'react'
import { toast } from 'react-toastify';
import TextInput from '../Common/Input/TextInput'
import TextArea from '../Common/Input/TextArea'
import { Label } from '../Common/Label'
import TwitterIcon from '../Common/Icon/Twitter'
import { ContainedButton } from '../Common/Button'
import Avatar from '../Common/Avatar/NextImage'
import useProfileContainer from './useProfileContainer'
import { TwitterUrl } from '../../utils/constants'

const Profile: React.FC = () => {
    const {
        profile,
        progress,
        error,
        status,
        handleChangeFile,
        updateProfile,
        handleSubmit,
        hasChange
    } = useProfileContainer()
    return (
        <div className='w-full h-full p-6'>
            <div className='w-full md:flex'>
                <div className='flex flex-col items-center'>
                    <Avatar 
                        src={profile.image} 
                        width={192} 
                        height={192} 
                        name={profile.name} />
                    <div className='flex items-center justify-center p-4'>
                        {status === 'loading' && (
                            <label className='py-2 px-4 text-primary-300 rounded border'>
                                更新中...{progress}%
                            </label>
                        )}
                        {status === 'loaded' && (
                            <label className='py-2 px-4 cursor-pointer rounded border text-primary-main hover:text-primary-dark border-primary-main hover:border-primary-dark' htmlFor='file-upload'>
                                画像を変更
                                <input id="file-upload" type='file' className='hidden' onChange={handleChangeFile} />
                            </label>
                        )}
                        {status === 'failed' && (
                            <label className='py-2 px-4 text-secondary-main'>
                                {error.name}
                            </label>
                        )}
                    </div>
                </div>
                <div className='p-4'>
                    <TextInput className='my-2' label='NAME' id='name' value={profile.name} onChange={(e)=>{updateProfile('name')(e.target.value)}} />
                    <Label className='my-2'>SNS</Label>
                    <div className='flex items-center'>
                        <div><TwitterIcon width='48px' height='48px' /></div>
                        <div className='mx-2 text-primary-300'>{TwitterUrl}</div>
                        <TextInput placeholder='@アカウント名のみ入力' className='w-full' id='twitter' value={profile.twitter} onChange={(e)=>{updateProfile('twitter')(e.target.value)}} />
                    </div>
                    <TextArea className='my-2' label='COMMENT' id='comment' value={profile.comment} border='outlined' minRows={4} onChange={(e)=>{updateProfile('comment')(e.target.value)}} />
                    <div className='flex flex-col items-end justify-cenrter my-2'>
                        <ContainedButton disabled={!hasChange} className='my-2' onClick={()=>{
                            handleSubmit(()=>{
                                toast.success('プロファイルを変更しました')
                            })
                        }}>更新する</ContainedButton>
                        <p className='text-primary-400 text-xs'>{profile.lastUpdate && `更新日時   ${(new Date(profile.lastUpdate).toLocaleString())}`}</p>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Profile