import bicycle from '../../assets/bicycle.svg';
import swim from '../../assets/swim.svg';
import weight from '../../assets/weight.svg';
import yoga from '../../assets/yoga.svg';
import './Aside.css';

function Aside() {
    return (
        <aside className="aside">
            <nav className="aside-nav">
            <img src={yoga} alt="Yoga icon" />
                <img src={swim} alt="Swim icon" />
                <img src={bicycle} alt="Bicycle icon" />
                <img src={weight} alt="Weight icon" />

            </nav>
            
            <p className='copyright'>Copiryght, SportSee 2020</p>
        </aside>
    );
}

export default Aside;
