import React from "react"
import ContentLoader from "react-content-loader"

const ProfilePlaceholder = () => (
    <ContentLoader
        speed={2}
        width={400}
        height={250}
        viewBox="0 0 400 250"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="115" y="210" rx="2" ry="2" width="140" height="25" />
        <circle cx="175" cy="100" r="96" />
    </ContentLoader>
)

export default ProfilePlaceholder

