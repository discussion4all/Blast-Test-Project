import { Link, useHistory } from "react-router-dom";

const Header = ({showMenu}) => {
    return(
        <div  className="nax-bar-main ">
            <p>Quiz Portal</p>
            {showMenu && (
                <nav>
                <ul>
                    <li>
                    <Link to={`/question/studySession`}>Study Session</Link>
                    </li>
                    <li>
                    <Link to={`/question/quizSession`}>Quiz Session</Link>
                    </li>
                </ul>
            </nav>
            )}
        </div>
    )
}

export default Header;