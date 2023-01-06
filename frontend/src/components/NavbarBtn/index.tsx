import './styles2.css'

type Props = {
    text: string;
  }
  
  const NavbarBtn = ({text} : Props) => {
    return(
        <div>
        <button className="btn btn-primary btn-logout">
            <p>{text}</p>
        </button>
        </div>
    )
}

export default NavbarBtn;