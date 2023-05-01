import { SvgIconButton } from '@components/Common/Button'
import ChevronLeft from '@components/Common/Icon/ChevronLeft'
import ChevronRight from '@components/Common/Icon/ChevronRight'

export const renderArrowNext = (clickHandler: () => void, hasNext: boolean) => (
    <SvgIconButton aria-label='next' disabled={!hasNext} className='absolute right-0 top-1/2 z-50 h-8 w-8 stroke-2' onClick={clickHandler}>
        <ChevronRight className='stroke-primary-main hover:stroke-primary-dark'/>
    </SvgIconButton>
)

export const renderArrowPrev = (clickHandler: () => void, hasPrev: boolean) => (
    <SvgIconButton aria-label='prev' disabled={!hasPrev} className='absolute left-0 top-1/2 z-50 h-8 w-8 stroke-2' onClick={clickHandler}>
        <ChevronLeft className='stroke-primary-main hover:stroke-primary-dark'/>
    </SvgIconButton>
)