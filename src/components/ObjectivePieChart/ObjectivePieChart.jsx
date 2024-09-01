import { PieChart, Pie, Cell, Label, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';
import './ObjectivePieChart.css'
const ObjectivePieChart = ({ score }) => {
    const data = [
        { name: 'Achieved', value: score },
        { name: 'Remaining', value: 1 - score }
    ];

    const COLORS = ['#E60000', 'transparent'];
    function renderCustomLabel  (){return (
        <text
            x="50%"
            y="50%"
            fill="#000"
            textAnchor="middle"
            dominantBaseline="middle"
            style={{ fontSize: '24px', fontWeight: 'bold' }}
        >
            <tspan x="50%" dy="0">{`${(score * 100).toFixed(0)}%`}</tspan>
            <tspan x="50%" dy="1.2em" fill="#74798c" style={{ fontSize: '16px' }}>de votre Objectif</tspan>
        </text>
)};
    return (
<div className='heigh-pie'>
    <ResponsiveContainer>
<p className='Score'> Score</p>
        <PieChart width={248} height={240}>

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
             content={renderCustomLabel}
             position={'center'}
                />

            </Pie>
        </PieChart>
        </ResponsiveContainer>
        </div>
    );
};

ObjectivePieChart.propTypes = {
    score: PropTypes.number.isRequired,
};

export default ObjectivePieChart;
