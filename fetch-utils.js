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
    
    const response = await client
        .from('cities')
        .select()
        .single();

    return checkError(response);
    
}

export async function createDefaultCity() {
    const response = await client
        .from('cities')
        .insert([{
            name: '',
            waterfront_id: '',
            skyline_id: '',
            castle_id: '',
            slogans: [],
        }])
        .single();
    return checkError(response);
}

export async function updateName(newName) {

    //fetch logged in user to have access to their info
    const user = await getUser();

    const response = await client 
    // update in the cities table
        .from('cities')
    // update the name 
        .update({ name: newName })
    // for this specific user
        .match({ user_id: user.user.id })
    // only for this one key, don't return an array
        .single();

    return checkError(response);

}

export async function updateSlogans(newSlogan) {

    //fetch logged in user to have access to their info
    const user = await getUser();

    const response = await client
    //update in the cities table
        .from('cities')
    //update the slogans
        .update({ slogans: newSlogan })
    // for this specific user
        .match({ user_id: user.user.id })
    // only for this one key, don't return array
        .single();

    return checkError(response);
}

export async function updateWaterfront(newWaterfront) {

    //fetch logged in user to have access to their info
    const user = await getUser();

    const response = await client
    //update in the cities table
        .from('cities')
    //update the waterfront
        .update({ waterfront_id: newWaterfront })
    // for this specific user
        .match({ user_id: user.user.id })
    // only for this key, don't return array
        .single();

    return checkError(response);
}

export async function updateSkyline(newSkyline) {

    //fetch logged in user to have access to their info
    const user = await getUser();

    const response = await client
    //update in the cities table
        .from('cities')
    //update the waterfront
        .update({ skyline_id: newSkyline })
    // for this specific user
        .match({ user_id: user.user.id })
    // only for this key, don't return array
        .single();

    return checkError(response);
}

export async function updateCastle(newCastle) {

    //fetch logged in user to have access to their info
    const user = await getUser();

    const response = await client
    //update in the cities table
        .from('cities')
    //update the waterfront
        .update({ castle_id: newCastle })
    // for this specific user
        .match({ user_id: user.user.id })
    // only for this key, don't return array
        .single();

    return checkError(response);
}





function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
