import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './App.jsx';
import Student from './student.jsx';
import Teacher from './teacher.jsx';
import Dashboard from './sdashboard.jsx';
import TDashboard from './tdashboard.jsx';

function Switch() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Register />} />
                <Route path="/student" element={<Student />} />
                <Route path="/teacher" element={<Teacher />} />
                <Route path="/sdashboard" element={<Dashboard />} />
                <Route path="/tdashboard" element={<TDashboard />} />


            </Routes>
        </BrowserRouter>
    );
}

export default Switch;
