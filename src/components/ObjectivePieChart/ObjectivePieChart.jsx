import { PieChart, Pie, Cell, Label } from 'recharts';
import PropTypes from 'prop-types';
import './ObjectivePieChart.css'
const ObjectivePieChart = ({ score }) => {
    const data = [
        { name: 'Achieved', value: score },
        { name: 'Remaining', value: 1 - score }
    ];

    const COLORS = ['#E60000', 'transparent'];

    return (
<div className='heigh-pie'>
<p className='Score'> Score</p>
        <PieChart width={258} height={250}>

         <Pie
                   data={data}
                   startAngle={90}
                   endAngle={450}
                   cx="50%"
                   cy="50%"
                   innerRadius={95}
                   outerRadius={110}
                   dataKey="value"
                   cornerRadius={10}
                >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                <Label
                    value={`${(score * 100).toFixed(0)}% `}
                    position="center"
                    fill="#000"
                    style={{ fontSize: '24px', fontWeight: 'bold' }}
           
                />

            </Pie>
        </PieChart>

        </div>
    );
};

ObjectivePieChart.propTypes = {
    score: PropTypes.number.isRequired,
};

export default ObjectivePieChart;
