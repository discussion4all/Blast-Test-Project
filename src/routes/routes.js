import login from '../components/login/login';
import dashboard from '../components/dashboard/dashboard';
import audio from '../components/dashboard/audio';

const routes = [
    {
        path : "/",
        Component : login
    },
    {
        path : "/dashboard",
        Component : dashboard
    },
    {
        path : "/audio",
        Component : audio
    }
];

export default routes;

