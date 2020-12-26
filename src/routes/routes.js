
import home from '../components/home/home';
import question from '../components/question/question';
import answerdisplay from '../components/question/answerdisplay';

//route components for routing application

const routes = [
    {
        path : "/",
        Component : home
    },
    {
        path : "/question/:session",
        Component : question
    },
    {
        path : "/answer",
        Component : answerdisplay
    }
];

export default routes;

