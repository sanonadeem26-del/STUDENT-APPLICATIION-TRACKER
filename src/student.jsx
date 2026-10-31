import logo from "./assets/uet.jpg";
import './student.css';
import { Link } from 'react-router-dom';

function Student() {
    return (
        <>
            <div className="sheader">
                {<img src={logo} alt="University logo" width="150"
                />}
            </div>
            <div className="sbody">
                <h1 className="question">
                    ENTER YOUR REGISTRATION NUMBER:
                </h1>

                <input
                    className="ik"
                    type="text"
                    placeholder="e.g. 2024-CE-84"
                />

                <h1 className="question1">
                    ENTER YOUR PASSWORD:
                </h1>

                <input
                    className="ik2"
                    type="password"
                    placeholder="********">

                </input>

                <div className="d">
                    <Link to="/sdashboard">
                        <button className="login2">
                            LOGIN
                        </button>
                    </Link>

                </div>





                <br />
                <br />

                <Link to="/">Back to Home</Link>
            </div>
        </>
    );
}

export default Student;
