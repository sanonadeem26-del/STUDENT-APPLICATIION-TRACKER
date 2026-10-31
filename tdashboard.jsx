import './tdashboard.css';
import { Link } from 'react-router-dom';

function TDashboard() {
    return (
        <div className="teacher-dashboard">
            {/* Sidebar */}
            <aside className="teacher-sidebar">
                <h2>Teacher Portal</h2>

                <nav>
                    <Link to="/tdashboard" className="active">
                        Dashboard
                    </Link>
                    <Link to="/teacher">
                        Applications
                    </Link>
                    <Link to="/">
                        Home
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="teacher-main">

                <header className="teacher-header">
                    <div>
                        <h1>Teacher Dashboard</h1>
                        <p>Review and manage student applications.</p>
                    </div>
                    <span className="teacher-avatar">T</span>
                </header>

                {/* Statistics */}
                <section className="teacher-stats">

                    <div className="teacher-card">
                        <h3>Total Applications</h3>
                        <p className="teacher-number">24</p>
                        <span>Received from students</span>
                    </div>

                    <div className="teacher-card">
                        <h3>Pending Requests</h3>
                        <p className="teacher-number">8</p>
                        <span>Require your attention</span>
                    </div>

                    <div className="teacher-card">
                        <h3>Approved</h3>
                        <p className="teacher-number">12</p>
                        <span>Successfully processed</span>
                    </div>

                </section>

                {/* Recent Applications */}
                <section className="teacher-applications">
                    <h2>Recent Student Applications</h2>

                    <table>
                        <thead>
                            <tr>
                                <th>Student</th>
                                <th>Application Type</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>Ali Ahmed</td>
                                <td>Leave Request</td>
                                <td>26 Oct 2026</td>
                                <td>
                                    <span className="teacher-status pending">
                                        Pending
                                    </span>
                                </td>
                            </tr>

                            <tr>
                                <td>Sara Khan</td>
                                <td>Assignment Extension</td>
                                <td>25 Oct 2026</td>
                                <td>
                                    <span className="teacher-status approved">
                                        Approved
                                    </span>
                                </td>
                            </tr>

                            <tr>
                                <td>Usman Malik</td>
                                <td>Attendance Issue</td>
                                <td>24 Oct 2026</td>
                                <td>
                                    <span className="teacher-status pending">
                                        Pending
                                    </span>
                                </td>
                            </tr>

                        </tbody>
                    </table>

                    <Link to="/teacher" className="teacher-view-btn">
                        View Applications
                    </Link>
                </section>

            </main>
        </div>
    );
}

export default TDashboard;