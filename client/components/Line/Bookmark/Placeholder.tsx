import React from "react"
import ContentLoader from "react-content-loader"

const Placeholder = (props) => (
  <ContentLoader 
    speed={2}
    width={400}
    height={800}
    viewBox="0 0 400 800"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="20" y="20" rx="2" ry="2" width="350" height="50" /> 
    <rect x="20" y="100" rx="2" ry="2" width="350" height="200" /> 
    <circle cx="60" cy="380" r="40" /> 
    <circle cx="160" cy="380" r="40" />
    <rect x="20" y="450" rx="2" ry="2" width="350" height="50" /> 
    <rect x="20" y="530" rx="2" ry="0" width="350" height="50" /> 
    <rect x="20" y="610" rx="2" ry="0" width="350" height="50" /> 

  </ContentLoader>
)

export default Placeholder