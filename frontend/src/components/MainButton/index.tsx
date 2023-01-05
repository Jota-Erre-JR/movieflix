import './styles.css'

type Props = {
    text: string;
  }
  
  const MainButton = ({text} : Props) => {

    return(
        <>
        <div className="post-review-button">
        <button type="button" className="btn btn-post-review">
          <p>{text}</p>
        </button>
        </div>
        </>
    )
}

export default MainButton;