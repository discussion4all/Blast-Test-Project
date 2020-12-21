import login from '../components/login';
import dashboard from '../components/dashboard';

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

