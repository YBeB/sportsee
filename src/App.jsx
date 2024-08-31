
import {
    BrowserRouter as Router,
    Route,
    Routes,
    useParams
} from 'react-router-dom';
import UserData from './components/UserData/UserData';
import './App.css'
const ProfilePage = () => {
    const { userId } = useParams();
    return <UserData userId={Number(userId)} />;
};

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/profile/:userId" element={<ProfilePage />} />
                <Route path="/" element={<h1>Selectionné un utilisateur</h1>} />
            </Routes>
        </Router>
    );
};

export default App;
