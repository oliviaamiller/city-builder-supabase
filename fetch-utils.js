/* eslint-disable no-console */
const SUPABASE_URL = 'https://tofautcphrzfbtskjrda.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MTMzNDc2MiwiZXhwIjoxOTU2OTEwNzYyfQ.ojYy8Yrg_SDpDGTSnb2SqWygbv2mr77X1SOxzhRqFOs';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function getUser() {
    return client.auth.session();
}


export async function checkAuth() {
    const user = await getUser();

    if (!user) location.replace('../'); 
}

export async function redirectIfLoggedIn() {
    if (await getUser()) {
        location.replace('./cities');
    }
}

export async function signupUser(email, password){
    const response = await client.auth.signUp({ email, password });
    
    return response.user;
}

export async function signInUser(email, password){
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return window.location.href = '../';
}


export async function fetchCity() {
    const currentUserId = client.auth.user().id;

    const response = await client
        .from('cities')
        .select()
        .match({ user_id: currentUserId })
        .single();

    return checkError(response);
    
}

export async function createDefaultCity() {
    const response = await client
        .from('cities')
        .insert([{
            name: '',
            waterfront: '',
            skyline: '',
            castle: '',
            slogans: [],
        }])
        .single();
    return checkError(response);
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
