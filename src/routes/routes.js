import login from '../components/login/login';
import dashboard from '../components/dashboard/dashboard';
import Answerdisplay from '../components/dashboard/answerdisplay';
//route components for routing application
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
        path : "/answer",
        Component : Answerdisplay
    }
];

export default routes;

