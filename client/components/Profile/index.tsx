import React from 'react'
import { TextInput, TextArea } from '../Common/Input'
import { Label } from '../Common/Label'
import Avatar from '../Common/Avatar'
import useProfileContainer from './useProfileContainer'

type Props = {

}

const Profile: React.FC<Props> = () => {
    const {
        profile,
        progress,
        error,
        handleChangeImage,
        updateProfile
    } = useProfileContainer()
    return (
        <div className='w-full h-full p-6'>
            <div className='w-full flex'>
                <div>
                    <Avatar src={profile.image} width='192px' height='192px' name={profile.name} usePlaceholder />
                    <div className='flex items-center justify-center p-4'>
                        {status === 'loading' && (
                            <label className='py-2 px-4 text-primary-300 rounded border'>
                                更新中...{progress}%
                            </label>
                        )}
                        {status === 'loaded' && (
                            <label className='py-2 px-4 cursor-pointer rounded border text-primary-main hover:text-primary-dark border-primary-main hover:border-primary-dark' htmlFor='file-upload'>
                                変更
                                <input id="file-upload" type='file' className='hidden' onChange={handleChangeImage} />
                            </label>
                        )}
                        {status === 'failed' && (
                            <label className='py-2 px-4 text-secondary-main'>
                                {error.name}
                            </label>
                        )}
                    </div>
                </div>
                <div className='p-4 w-1/3'>
                    <Label htmlFor='name'>NAME</Label>
                    <TextInput id='name' value={profile.name} handleSubmit={updateProfile('name')} />
                    <Label htmlFor='comment' className='mt-4'>COMMENT</Label>
                    <TextArea id='comment' borderType='square' value={profile.comment} minRows={4} handleSubmit={updateProfile('comment')} />
                    <div className='flex justify-end my-2'>
                        <p className=' text-primary-400 text-xs'>{profile.lastUpdate && `更新日時   ${(new Date(profile.lastUpdate).toLocaleString())}`}</p>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Profile