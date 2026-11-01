import { supabase } from './supabaseClient';

async function testConnection() {
    const { data, error } = await supabase
        .from('students')
        .select('*');

    if (error) {
        console.log('Supabase connection error:', error.message);
    } else {
        console.log('Supabase connected successfully!');
        console.log(data);
    }
}

testConnection();