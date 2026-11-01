import './tdashboard.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from './lib/supabaseClient';

function TDashboard() {

    const [applications, setApplications] = useState([]);
    const [teacherName, setTeacherName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    async function testTeacherLogin() {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: 'mahairfan2005@gmail.com',
            password: ''
        });

        if (error) {
            alert(error.message);
        } else {
            alert('Teacher logged in successfully!');
            window.location.reload();
        }
    }
    useEffect(() => {
        async function fetchApplications() {

            // Check whether a teacher is logged in
            const { data: { user }, error: userError } =
                await supabase.auth.getUser();

            if (userError || !user) {
                setError('Please log in to view assigned applications.');
                setLoading(false);
                return;
            }
            const { data: teacher, error: teacherError } = await supabase
                .from('teachers')
                .select('full_name')
                .eq('id', user.id)
                .single();

            if (teacherError) {
                setError(teacherError.message);
            } else {
                setTeacherName(teacher.full_name);
            }

            // Fetch only applications assigned to this teacher
            const { data, error: fetchError } = await supabase
                .from('applications')
                .select(`
                    id,
                    application_type,
                    created_at,
                    status,
                    students(full_name)
                `)
                .eq('teacher_id', user.id)
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

    // Calculate statistics
    const totalApplications = applications.length;

    const pendingApplications = applications.filter(
        app => app.status === 'Pending'
    ).length;

    const approvedApplications = applications.filter(
        app => app.status === 'Approved'
    ).length;

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
                    <Link to="/teacher">
                        Logout
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
                    <span className="teacher-avatar">
                        {teacherName || 'T'}
                    </span>
                </header>

                {/* Statistics */}
                <section className="teacher-stats">

                    <div className="teacher-card">
                        <h3>Total Applications</h3>
                        <p className="teacher-number">
                            {loading ? '...' : totalApplications}
                        </p>
                        <span>Received from students</span>
                    </div>

                    <div className="teacher-card">
                        <h3>Pending Requests</h3>
                        <p className="teacher-number">
                            {loading ? '...' : pendingApplications}
                        </p>
                        <span>Require your attention</span>
                    </div>

                    {/* <div className="teacher-card">
                        <h3>Approved</h3>
                        <p className="teacher-number">
                            {loading ? '...' : approvedApplications}
                        </p>
                        <span>Successfully processed</span>
                    </div> */}

                </section>

                {/* Recent Applications */}
                <section className="teacher-applications">
                    <h2>Recent Student Applications</h2>

                    {loading ? (
                        <p>Loading applications...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : applications.length === 0 ? (
                        <p>No applications assigned to you yet.</p>
                    ) : (
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
                                {applications.map(app => (
                                    <tr key={app.id}>
                                        <td>
                                            {app.students?.full_name || 'Student'}
                                        </td>

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
                                            <span className={`teacher-status ${app.status.toLowerCase()}`}>
                                                {app.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    <Link to="/teacher" className="teacher-view-btn">
                        View Applications
                    </Link>
                </section>

            </main>
        </div>
    );
}

export default TDashboard;
