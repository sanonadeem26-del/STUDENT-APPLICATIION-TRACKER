import logo from "./assets/uet.jpg";
import './teacher.css';
import { Link } from 'react-router-dom';

function Teacher() {
    return (
        <>
            <div className="theader">
                {<img
                    src={logo}
                    alt="University logo"
                    width="150"
                />}
            </div>
            <div className="tbody">
                <h1 className="answer">
                    ENTER YOUR FACULTY NUMBER:
                </h1>

                <input
                    className="it"
                    type="text"
                    placeholder="e.g. CE3"
                />

                <h1 className="answer1">
                    ENTER YOUR PASSWORD:
                </h1>

                <input
                    className="it2"
                    type="password"
                    placeholder="********">

                </input>
                <div className="c">
                    <Link to="/tdashboard">
                        <button className="login1">
                            LOGIN
                        </button>
                    </Link>

                </div>

                <br />
                <br />

                <div className="x">
                    <Link to="/"> Back to Home</Link>
                </div>
            </div>
        </>
    );
}

export default Teacher;