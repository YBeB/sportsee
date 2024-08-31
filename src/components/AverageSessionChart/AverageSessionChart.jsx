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
        <div className="chart-section" style={{ backgroundColor: '#ff0101', padding: '0px', borderRadius: '5px' }}>
            <h2 style={{ color: '#fff', marginBottom: '5px' }}>Durée moyenne des sessions</h2>
            <ResponsiveContainer width='100%' height={140}>
                <LineChart data={sessions}>
                    <XAxis dataKey="day" stroke="#fff" />
                    <YAxis hide={true} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                        type="monotone"
                        dataKey="sessionLength"
                        stroke="#fff"
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
