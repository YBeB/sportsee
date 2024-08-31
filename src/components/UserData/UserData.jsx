import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import ObjectivePieChart from "../ObjectivePieChart/ObjectivePieChart";
import PerformanceRadarChart from "../PerformanceRadarChart/PerformanceRadarChart";
import ActivityBarChart from "../ActivityBarChart/ActivityBarChart";
import NutritionInfo from "../NutritionInfo/NutritionInfo";
import AverageSessionsChart from "../AverageSessionChart/AverageSessionChart";
import Header from "../Header/Header";
import "./UserData.css";

import Aside from "../Aside/Aside";
const UserData = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [userActivity, setUserActivity] = useState(null);
  const [userPerformance, setUserPerformance] = useState(null);
  const [userAverageSessions, setUserAverageSessions] = useState(null);

  const getDayLetter = (dayNumber) => {
    const days = ["L", "M", "M", "J", "V", "S", "D"];
    return days[dayNumber - 1];
  };
  useEffect(() => {
    axios
      .get(`http://localhost:3000/user/${userId}`)
      .then((response) => setUserData(response.data.data))
      .catch((error) => console.error("Erreur avec  user data:", error));

    axios
      .get(`http://localhost:3000/user/${userId}/activity`)
      .then((response) => setUserActivity(response.data.data))
      .catch((error) => console.error("Erreur avec  user activity:", error));

    axios
      .get(`http://localhost:3000/user/${userId}/performance`)
      .then((response) => setUserPerformance(response.data.data))
      .catch((error) => console.error("Erreur avec  user performance:", error));
    axios
      .get(`http://localhost:3000/user/${userId}/average-sessions`)
      .then((response) => {
        console.log("API response for average sessions:", response.data);
        if (
          response.data &&
          response.data.data &&
          response.data.data.sessions
        ) {
          const formattedSessions = response.data.data.sessions.map(
            (session) => ({
              day: getDayLetter(session.day),
              sessionLength: session.sessionLength,
            })
          );
          setUserAverageSessions(formattedSessions);
        } else {
          console.error(
            "Données des sessions moyennes manquantes dans la réponse de l'API"
          );
          setUserAverageSessions([]);
        }
      })
      .catch((error) =>
        console.error("Erreur avec user average sessions:", error)
      );
  }, [userId]);

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
