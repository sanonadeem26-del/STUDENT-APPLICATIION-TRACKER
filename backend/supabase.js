const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

function createUserClient(accessToken) {
    return createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_ANON_KEY,
        {
            global: {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        }
    );
}

module.exports = createUserClient;
