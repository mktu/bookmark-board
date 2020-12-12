import React, { useContext, useState } from 'react'
import { TextInput, TextArea } from '../Common/Input'
import { Label } from '../Common/Label'
import { useProfile } from '../../modules/profileSlice'
import Avatar from '../Common/Avatar'
import FirebaseContext from '../../context/FirebaseContext'

type Props = {

}

const Profile: React.FC<Props> = () => {
    const profile = useProfile()
    const { clientService } = useContext(FirebaseContext)
    const [progress, setProgress] = useState(0)
    const [status, setStatus] = useState<LoadStatus['status']>('loaded')
    const [error, setError] = useState<Error>()
    return (
        <div className='w-full h-full p-6'>
            <div className='w-full flex'>
                <div>
                    <Avatar src={profile.image} width='192px' height='192px'/>
                    <div className='flex items-center justify-center p-4'>
                        {status === 'loading' && (
                            <label className='py-2 px-4 text-primary-300 rounded border'>
                                更新中...{progress}%
                            </label>
                        )}
                        {status === 'loaded' && (
                            <label className='py-2 px-4 cursor-pointer rounded border text-primary-main hover:text-primary-dark border-primary-main hover:border-primary-dark' htmlFor='file-upload'>
                                変更
                                <input id="file-upload" type='file' className='hidden' onChange={(e) => {
                                    if (!e.target.files || e.target.files.length === 0) {
                                        return
                                    }
                                    setStatus('loading')
                                    setProgress(0)
                                    clientService.uploadProfileImage(
                                        profile.id,
                                        e.target.files[0],
                                        (url) => {
                                            clientService.updateProfile(
                                                profile.id,
                                                { image: url },
                                                () => {
                                                    setStatus('loaded')
                                                }
                                            )
                                        },
                                        (progress) => {
                                            setProgress(Math.round(progress))
                                        },
                                        (e) => {
                                            setError(e)
                                            setStatus('failed')
                                        }
                                    )
                                }
                                } />
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
                    <TextInput id='name' value={profile.name} handleSubmit={(value) => {
                        clientService.updateProfile(profile.id, {
                            name: value
                        })
                    }} />
                    <Label htmlFor='comment' className='mt-4'>COMMENT</Label>
                    <TextArea id='comment' borderType='square' value={profile.comment} minRows={4} handleSubmit={(value)=>{
                        clientService.updateProfile(profile.id, {
                            comment: value
                        })
                    }}/>
                    <div className='flex justify-end my-2'>
                        <p className=' text-primary-400 text-xs'>{profile.lastUpdate && `更新日時   ${(new Date(profile.lastUpdate).toLocaleString())}`}</p>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Profile