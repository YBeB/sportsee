import logo from '../../assets/logo.svg';
import './Header.css'


function Header(){

return(
    <header>
<img className='logo' src={logo} ></img>


<li>Accueil</li>
<li>Profil</li>
<li>Réglage</li>
<li>Communauté</li>





</header>
)


}

export default Header