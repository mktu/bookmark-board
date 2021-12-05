import React from "react"
import ContentLoader from "react-content-loader"

const BookmarkPlaceholder = () => (
  <ContentLoader 
    speed={2}
    width={400}
    height={500}
    viewBox="0 0 400 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="200" y="15" rx="2" ry="2" width="150" height="50" /> 
    <rect x="50" y="80" rx="2" ry="2" width="300" height="125" /> 
    <rect x="50" y="220" rx="2" ry="2" width="300" height="125" /> 
    <rect x="50" y="360" rx="2" ry="2" width="300" height="125" />
  </ContentLoader>
)

export default BookmarkPlaceholder

