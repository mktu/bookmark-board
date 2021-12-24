import { SvgIconButton } from '@components/Common/Button'
import ChevronLeft from '@components/Common/Icon/ChevronLeft'
import ChevronRight from '@components/Common/Icon/ChevronRight'

export const renderArrowNext = (clickHandler: () => void, hasNext: boolean) => (
    <SvgIconButton disabled={!hasNext} className='absolute top-1/2 right-0 z-50 w-8 h-8 stroke-2' onClick={clickHandler}>
        <ChevronRight className='stroke-primary-main hover:stroke-primary-dark'/>
    </SvgIconButton>
)

export const renderArrowPrev = (clickHandler: () => void, hasPrev: boolean) => (
    <SvgIconButton disabled={!hasPrev} className='absolute top-1/2 left-0 z-50 w-8 h-8 stroke-2' onClick={clickHandler}>
        <ChevronLeft className='stroke-primary-main hover:stroke-primary-dark'/>
    </SvgIconButton>
)