import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ObjectivePieChart from "../ObjectivePieChart/ObjectivePieChart";
import PerformanceRadarChart from "../PerformanceRadarChart/PerformanceRadarChart";
import ActivityBarChart from "../ActivityBarChart/ActivityBarChart";
import NutritionInfo from "../NutritionInfo/NutritionInfo";
import AverageSessionsChart from "../AverageSessionChart/AverageSessionChart";
import Header from "../Header/Header";
import "./UserData.css";
import { fetchUserData, fetchUserActivity, fetchUserPerformance, fetchUserAverageSessions } from "../service/apiService";
import Aside from "../Aside/Aside";


function UserData ({ userId })  {
  const [userData, setUserData] = useState(null);
  const [userActivity, setUserActivity] = useState(null);
  const [userPerformance, setUserPerformance] = useState(null);
  const [userAverageSessions, setUserAverageSessions] = useState(null);
  const [error, setError] = useState(null);

  const getDayLetter = (dayNumber) => {
    const days = ["L", "M", "M", "J", "V", "S", "D"];
    return days[dayNumber - 1];
  };

  useEffect(() => {
    Promise.all([
      fetchUserData(userId).then(setUserData),
      fetchUserActivity(userId).then(setUserActivity),
      fetchUserPerformance(userId).then(setUserPerformance),
      fetchUserAverageSessions(userId, getDayLetter).then(setUserAverageSessions)
    ])
    .catch(error => {
      setError("Nous n'avons pas pu trouver les informations pour cet utilisateur. Veuillez vérifier l'ID et réessayer.");
    });
  }, [userId]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!userData || !userActivity || !userPerformance || !userAverageSessions) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div className="Lower-Body">
        <Aside />
        <div className="Stats-body">
          <h1 className="hello-text">
            Bonjour{" "}
            <span className="red-name">{userData.userInfos.firstName}</span>{" "}
          </h1>
          <p className="congratulation-text">
            Félicitation ! Vous avez explosé vos objectifs hier 👏
          </p>
          <div className="performance">
            <div className="flex-performance">
              <ActivityBarChart activity={userActivity} />
              <div className="flex-perf">
                <AverageSessionsChart sessions={userAverageSessions} />

                <PerformanceRadarChart performance={userPerformance} />

                <ObjectivePieChart
                  score={userData.todayScore || userData.score}
                />
              </div>
            </div>
            <NutritionInfo keyData={userData.keyData} />
          </div>
        </div>
      </div>
    </div>
  );
};

UserData.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default UserData;
