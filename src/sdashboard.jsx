
import './sdashboard.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from './lib/supabaseClient';

function Dashboard() {

    const [applications, setApplications] = useState([]);
    const [studentName, setStudentName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchApplications() {

            // Check whether a student is logged in
            const { data: { user }, error: userError } =
                await supabase.auth.getUser();

            if (userError || !user) {
                setError('Please log in to view your applications.');
                setLoading(false);
                return;
            }

            // Fetch student's name
            const { data: student, error: studentError } = await supabase
                .from('students')
                .select('full_name')
                .eq('id', user.id)
                .single();

            if (studentError) {
                console.log('Student name error:', studentError.message);
            } else {
                setStudentName(student.full_name);
            }

            // Fetch only this student's applications
            const { data, error: fetchError } = await supabase
                .from('applications')
                .select('id, application_type, created_at, status')
                .eq('student_id', user.id)
                .order('created_at', { ascending: false });

            if (fetchError) {
                setError(fetchError.message);
            } else {
                setApplications(data || []);
            }

            setLoading(false);
        }

        fetchApplications();
    }, []);

    // Calculate dashboard statistics
    const totalApplications = applications.length;

    const pendingApplications = applications.filter(
        app => app.status === 'Pending'
    ).length;

    const approvedApplications = applications.filter(
        app => app.status === 'Approved'
    ).length;

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

                    <Link to="/student">
                        Logout
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

                    <span className="student-avatar">
                        {studentName || 'S'}
                    </span>
                </header>

                {/* Statistics */}
                <section className="student-stats">

                    <div className="student-card">
                        <h3>Total Applications</h3>
                        <p className="student-number">
                            {loading ? '...' : totalApplications}
                        </p>
                        <span>Applications submitted</span>
                    </div>

                    <div className="student-card">
                        <h3>Pending</h3>
                        <p className="student-number">
                            {loading ? '...' : pendingApplications}
                        </p>
                        <span>Awaiting a response</span>
                    </div>

                    <div className="student-card">
                        <h3>Approved</h3>
                        <p className="student-number">
                            {loading ? '...' : approvedApplications}
                        </p>
                        <span>Successfully approved</span>
                    </div>

                </section>

                {/* Recent Applications */}
                <section className="student-applications">
                    <h2>Recent Applications</h2>

                    {loading ? (
                        <p>Loading applications...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : applications.length === 0 ? (
                        <p>No applications submitted yet.</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>Application Type</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {applications.map(app => (
                                    <tr key={app.id}>
                                        <td>{app.application_type}</td>

                                        <td>
                                            {new Date(app.created_at).toLocaleDateString(
                                                'en-GB',
                                                {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    year: 'numeric'
                                                }
                                            )}
                                        </td>

                                        <td>
                                            <span className={`status ${app.status.toLowerCase()}`}>
                                                {app.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    <Link to="/student" className="new-application-btn">
                        + Create New Application
                    </Link>
                </section>

            </main>
        </div>
    );
}

export default Dashboard;
