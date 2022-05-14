import { useState } from 'react'
import { TextButton } from '@components/Common/Button'
import Container from './Conatiner'
import RecentDialog from './Dialog'

const ShowMore: React.FC = () => {
    const [show, setShow] = useState(false)
    return (
        <>
            <TextButton onClick={()=>{setShow(true)}}>
                ...さらに表示する
            </TextButton>
            {show && (
                <RecentDialog open={true} onClose={() => { setShow(false) }}>
                    <Container />
                </RecentDialog>
            )}
        </>
    )
}

export default ShowMore