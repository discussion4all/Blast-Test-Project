import login from '../components/login/login';
import dashboard from '../components/dashboard/dashboard';

const routes = [
    {
        path : "/",
        Component : login
    },
    {
        path : "/dashboard",
        Component : dashboard
    }
];

export default routes;

