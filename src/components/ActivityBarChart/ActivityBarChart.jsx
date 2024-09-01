import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';
import './ActivityBarChart.css'

function CustomTooltip({ active, payload }) {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip" style={{ backgroundColor: '#e60000', padding: '5px', borderRadius: '5px', color: '#fff' }}>
                <p>{`${payload[0].value} kg`}</p>
                <p>{`${payload[1].value} kCal`}</p>
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

function ActivityBarChart({ activity }) {

    const numberedSessions = activity.sessions.map((session, index) => ({
        ...session,
        day: index + 1,
    }));

    return (
        <div className='activity-flex-bar' style={{ backgroundColor: '#fbfbfb', padding: '1px', borderRadius: '10px' }}>
            <ResponsiveContainer>
                <p className="activity">Activité quotidienne</p>
                <BarChart
                    data={numberedSessions}
                    margin={{
                        top: 5, right: 30, left: 35, bottom: 56,
                    }}
                    barSize={7}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="day" />
                    <YAxis orientation="right" tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                        verticalAlign="top"
                        align="right"
                        iconType="circle" 
                        payload={[
                            { value: 'Poids (kg)', type: 'circle', color: '#282D30' },
                            { value: 'Calories brûlées (kCal)', type: 'circle', color: '#E60000' },
                        ]}
                    />
                    <Bar dataKey="kilogram" fill="#282D30" radius={[10, 10, 0, 0]} />
                    <Bar dataKey="calories" fill="#E60000" radius={[10, 10, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

ActivityBarChart.propTypes = {
    activity: PropTypes.shape({
        sessions: PropTypes.arrayOf(
            PropTypes.shape({
                day: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
                kilogram: PropTypes.number.isRequired,
                calories: PropTypes.number.isRequired,
            })
        ).isRequired,
    }).isRequired,
};

export default ActivityBarChart;
