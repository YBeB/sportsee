
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts';
import './PerformanceRadarChart.css'
import PropTypes from 'prop-types';

function PerformanceRadarChart  ({ performance }) {
//Traduction des differents attribut 
    const translationMap = {
        cardio: 'Cardio',
        energy: 'Energie',
        endurance: 'Endurance',
        strength: 'Force',
        speed: 'Vitesse',
        intensity: 'Intensité'
    };


    const desiredOrder = ['Intensité', 'Vitesse', 'Force', 'Endurance', 'Energie', 'Cardio'];

// Réorganiser et traduire les données en fonction de l'ordre souhaité
const data = desiredOrder.map(frenchMetric => {
    // Trouver la métrique correspondante en anglais
    let englishMetric;
    for (let key in translationMap) {
        if (translationMap[key] === frenchMetric) {
            englishMetric = key;
            break;
        }
    }

    // Trouver la clé de type dans les données de performance
    let kindKey;
    for (let key in performance.kind) {
        if (performance.kind[key] === englishMetric) {
            kindKey = key;
            break;
        }
    }

    // Trouver les données de la métrique
    let metricData;
    for (let i = 0; i < performance.data.length; i++) {
        if (performance.data[i].kind === Number(kindKey)) {
            metricData = performance.data[i];
            break;
        }
    }

 // Retourner le sujet et la valeur, avec une valeur par défaut de 0 si aucune donnée n'est trouvée
    return {
        subject: frenchMetric,
        A: metricData ? metricData.value : 0
    };
});




    return (
        <div className='performanRaadar'>
            <ResponsiveContainer>
<RadarChart cx={131} cy={131} outerRadius={87}  data={data}>
            <PolarGrid gridType='polygon' radialLines={false} stroke='white' />
            <PolarAngleAxis dataKey="subject"   radius={120} tick={{ fill: 'white', fontSize: 12}}  />
            <Radar name="Performance" dataKey="A" stroke="transparent" fill="#FF0101" fillOpacity={0.7} />
        </RadarChart>
        </ResponsiveContainer>
        </div>
    );
};

PerformanceRadarChart.propTypes = {
    performance: PropTypes.shape({
        kind: PropTypes.objectOf(PropTypes.string).isRequired,
        data: PropTypes.arrayOf(
            PropTypes.shape({
                value: PropTypes.number.isRequired,
                kind: PropTypes.number.isRequired,
            })
        ).isRequired,
    }).isRequired,
};

export default PerformanceRadarChart;
