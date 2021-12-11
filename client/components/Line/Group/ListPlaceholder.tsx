import React from 'react'
import ContentLoader from 'react-content-loader'

const CheckboxList = props => (
    <div className='p-4'>
        <ContentLoader
            uniqueKey='group-list-placeholder'
            speed={2}
            width={400}
            height={400}
            viewBox="0 0 400 400"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            {...props}
        >
            {[...Array(7)].map((_, i) => (
                <rect key={i} x="35" y={10 + 35 * i} rx="5" ry="5" width="250" height="10" />
            ))}
            {[...Array(7)].map((_, i) => (
                <rect key={i} x="3" y={5 + 35 * i} rx="4" ry="4" width="20" height="20" />
            ))}
        </ContentLoader>
    </div>
)

CheckboxList.metadata = {
    name: 'Manuela Garcia',
    github: 'ManuelaGar',
    description: 'This is a checkbox list loader.',
    filename: 'CheckboxList',
}

export default CheckboxList