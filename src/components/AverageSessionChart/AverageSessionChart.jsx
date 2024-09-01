import PropTypes from 'prop-types';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './AverageSessionChart.css';

function CustomTooltip({ active, payload }) {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '5px', borderRadius: '5px', color: '#000' }}>
                <p>{`${payload[0].value} min`}</p>
            </div>
        );
    }

    return null;
}


CustomTooltip.propTypes = {
    active: PropTypes.bool,
    payload: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.number,
        })
    ),
};

function AverageSessionsChart  ({ sessions })  {

    return (
        
        <div className="chart-section" style={{background: "linear-gradient(to right, #ff0000 70%, #e60000 70%, #e60000 100%)", borderRadius: '5px' ,  }}>
        <h2 style={{ color: '#fff',opacity:'0.5' , fontSize:'15px',width:'120px',display:'flex',justifyContent:'center' }}>Durée moyenne des sessions</h2>
        <ResponsiveContainer width="100%" height="60%">
            <LineChart 
                data={sessions} 
                margin={{ top: 56, right: 0, left: 0, bottom: 9 }} // Augmenter la marge en bas pour remonter l'axe X
            >
                    <defs>
    <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#fff" stopOpacity={0.1} />
        <stop offset="100%" stopColor="#fff" stopOpacity={1} />
    </linearGradient>
</defs>
                <XAxis 
                    dataKey="day" 
                    stroke="#fff" 
            opacity={0.5}
            axisLine={false}
                />
                <YAxis hide={true} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                    type="monotone"
                    dataKey="sessionLength"
                    
                stroke="url(#lineGradient)"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 8, strokeWidth: 0 }}
                />
            </LineChart>
        </ResponsiveContainer>
    </div>
    );
};

AverageSessionsChart.propTypes = {
    sessions: PropTypes.arrayOf(
        PropTypes.shape({
            day: PropTypes.string.isRequired,
            sessionLength: PropTypes.number.isRequired,
        })
    ).isRequired,
};

export default AverageSessionsChart;
