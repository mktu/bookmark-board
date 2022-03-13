import React from "react"
import ContentLoader from "react-content-loader"

const XOffset = 30
const YOffset = 20
const BoxHeight = 40
const BoxWidth = 30
const XSpacing = 10
const YSpacing = 10

const Placeholder = (props) => (
    <div className='overflow-hidden'>
        <ContentLoader
            speed={2}
            width={800}
            height={1000}
            viewBox="0 0 800 1000"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            {...props}
        >
            {[...Array(12)].map((_, i) => (
                <React.Fragment key={i}>
                    <rect x={XOffset} y={YOffset + BoxHeight * i + YSpacing * i} rx="3" ry="3" width={BoxWidth} height={BoxHeight} />
                    <rect x={XOffset + BoxWidth + XSpacing} y={YOffset + BoxHeight * i + YSpacing * i} rx="3" ry="3" width="90%" height={BoxHeight} />
                </React.Fragment>
            ))}
        </ContentLoader>
    </div>
)

export default Placeholder