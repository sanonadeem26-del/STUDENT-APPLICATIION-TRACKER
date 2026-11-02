// Load environment variables
require('dotenv').config();

console.log("Supabase URL loaded:", !!process.env.SUPABASE_URL);

// Import packages
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

// Create Express app
const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use(express.json());

// Connect to Supabase
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

// Dashboard statistics API
app.get('/api/student/dashboard-stats', async (req, res) => {
    try {
        const { data: applications, error } = await supabase
            .from('applications')
            .select('id, status');

        if (error) {
            throw error;
        }

        const totalApplications = applications.length;

        const pendingApplications = applications.filter(
            app => app.status === 'Pending'
        ).length;

        const approvedApplications = applications.filter(
            app => app.status === 'Approved'
        ).length;

        res.json({
            totalApplications,
            pendingApplications,
            approvedApplications
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'Unable to fetch statistics'
        });
    }
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});