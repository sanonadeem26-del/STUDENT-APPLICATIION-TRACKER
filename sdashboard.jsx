import './sdashboard.css';
import { Link } from 'react-router-dom';

function Dashboard() {
    return (
        <div className="student-dashboard">

            {/* Sidebar */}
            <aside className="student-sidebar">
                <h2>Student Portal</h2>

                <nav>
                    <Link to="/sdashboard" className="active">
                        Dashboard
                    </Link>
                    <Link to="/student">
                        New Application
                    </Link>
                    <Link to="/">
                        Home
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="student-main">

                <header className="student-header">
                    <div>
                        <h1>Student Dashboard</h1>
                        <p>Welcome back! Manage your applications here.</p>
                    </div>
                    <span className="student-avatar">S</span>
                </header>

                {/* Statistics */}
                <section className="student-stats">

                    <div className="student-card">
                        <h3>Total Applications</h3>
                        <p className="student-number">12</p>
                        <span>Applications submitted</span>
                    </div>

                    <div className="student-card">
                        <h3>Pending</h3>
                        <p className="student-number">4</p>
                        <span>Awaiting a response</span>
                    </div>

                    <div className="student-card">
                        <h3>Approved</h3>
                        <p className="student-number">6</p>
                        <span>Successfully approved</span>
                    </div>

                </section>

                {/* Recent Applications */}
                <section className="student-applications">
                    <h2>Recent Applications</h2>

                    <table>
                        <thead>
                            <tr>
                                <th>Application Type</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>Leave Request</td>
                                <td>26 Oct 2026</td>
                                <td>
                                    <span className="status pending">
                                        Pending
                                    </span>
                                </td>
                            </tr>

                            <tr>
                                <td>Assignment Extension</td>
                                <td>24 Oct 2026</td>
                                <td>
                                    <span className="status approved">
                                        Approved
                                    </span>
                                </td>
                            </tr>

                            <tr>
                                <td>Attendance Issue</td>
                                <td>22 Oct 2026</td>
                                <td>
                                    <span className="status rejected">
                                        Rejected
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <Link to="/student" className="new-application-btn">
                        + Create New Application
                    </Link>
                </section>

            </main>
        </div>
    );

}

export default Dashboard;