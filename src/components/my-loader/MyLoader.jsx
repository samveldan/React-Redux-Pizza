import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={280}
    height={459}
    viewBox="0 0 280 459"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="133" y="125" rx="0" ry="0" width="1" height="0" /> 
    <rect x="7" y="0" rx="7" ry="7" width="260" height="260" /> 
    <rect x="0" y="278" rx="7" ry="7" width="280" height="24" /> 
    <rect x="0" y="324" rx="7" ry="7" width="280" height="85" /> 
    <rect x="0" y="417" rx="7" ry="7" width="280" height="30" />
  </ContentLoader>
)

export default MyLoader