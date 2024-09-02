import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export function fetchUserData(userId) {
    return axios.get(`${BASE_URL}/user/${userId}`)
        .then(response => response.data.data)
        .catch(error => {
            console.error("Erreur avec user data:", error);
            throw error;
        });
}

export function fetchUserActivity(userId) {
    return axios.get(`${BASE_URL}/user/${userId}/activity`)
        .then(response => response.data.data)
        .catch(error => {
            console.error("Erreur avec user activity:", error);
            throw error;
        });
}

export function fetchUserPerformance(userId) {
    return axios.get(`${BASE_URL}/user/${userId}/performance`)
        .then(response => response.data.data)
        .catch(error => {
            console.error("Erreur avec user performance:", error);
            throw error;
        });
}

export function fetchUserAverageSessions(userId, getDayLetter) {
    return axios.get(`${BASE_URL}/user/${userId}/average-sessions`)
        .then(response => {
            if (response.data && response.data.data && response.data.data.sessions) {
                return response.data.data.sessions.map(session => ({
                    day: getDayLetter(session.day),
                    sessionLength: session.sessionLength,
                }));
            } else {
                console.error("Données des sessions moyennes manquantes dans la réponse de l'API");
                return [];
            }
        })
        .catch(error => {
            console.error("Erreur avec user average sessions:", error);
            throw error;
        });
}
