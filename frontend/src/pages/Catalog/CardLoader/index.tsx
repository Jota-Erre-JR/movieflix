import ContentLoader from "react-content-loader"
import './styles.css'

const CardLoader = () => (
  <div className="card-loader-container">
  <ContentLoader 
    speed={2}
    width={300}
    height={300}
    viewBox="0 0 300 300"
    backgroundColor="#ecebeb"
    foregroundColor="#d6d2d2"
    
  >
    <rect x="0" y="0" rx="0" ry="0" width="300" height="20" />
    <rect x="0" y="25" rx="0" ry="0" width="300" height="255" />
    </ContentLoader>
  </div>
)

export default CardLoader;