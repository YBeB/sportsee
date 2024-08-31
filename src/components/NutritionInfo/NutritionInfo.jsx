import calories from '../../assets/calories.svg'
import protein from '../../assets/protein.svg'
import carbs from '../../assets/carbs.svg'
import fat from '../../assets/fat.svg'
import './NutritionInfo.css'
import PropTypes from 'prop-types';

function NutritionInfo  ({ keyData })  {
    return (
        <div className="nutrition-info">
            <div className="nutrition-item">
                <img src={calories}/>
                <div className='information-nutrition'>
                <h3>{keyData.calorieCount} kcal</h3>
                <p>Calories</p>
                </div>
            </div>
            <div className="nutrition-item">
            <img src={protein}/>
            <div className='information-nutrition'>
                <h3>{keyData.proteinCount} g</h3>
                <p>Protéines</p>
                </div>
            </div>
            <div className="nutrition-item">
            <img src={carbs}/>
            <div className='information-nutrition'>
            <h3>{keyData.carbohydrateCount} g</h3>
                <p>Glucides</p>
</div>
            </div>
            <div className="nutrition-item">
            <img src={fat}/>
            <div className='information-nutrition'>
            <h3>{keyData.lipidCount} g</h3>
                <p>Lipides</p>
                </div>
            </div>
        </div>
    );
};

NutritionInfo.propTypes = {
    keyData: PropTypes.shape({
        calorieCount: PropTypes.number.isRequired,
        proteinCount: PropTypes.number.isRequired,
        carbohydrateCount: PropTypes.number.isRequired,
        lipidCount: PropTypes.number.isRequired,
    }).isRequired,
};

export default NutritionInfo;
