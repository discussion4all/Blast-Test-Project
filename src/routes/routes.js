import login from '../components/login/login';
import dashboard from '../components/dashboard/dashboard';
import audio from '../components/dashboard/audio';
import Answerdisplay from '../components/dashboard/answerdisplay';

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
    },
    {
        path : "/answer",
        Component : Answerdisplay
    }
];

export default routes;

