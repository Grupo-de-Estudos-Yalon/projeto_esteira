
const axios = require('axios').default;
require('dotenv').config()

var token = {
    bearer: "",
    expires: "0"
}

function tokenExpired() {
    return token.expires <= new Date()
}

const generateRandomString = (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}

const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}


const sha256 = async (plain) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(plain)
    return crypto.subtle.digest('SHA-256', data)
}

async function authenticate() {

    if (tokenExpired()) {
        const codeVerifier = generateRandomString(64);
        const hashed = await sha256(codeVerifier)
        const codeChallenge = base64encode(hashed);
        const data = `grant_type=client_credentials&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`
        try {
            const response = await axios.post(`https://accounts.spotify.com/api/token`, data,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            );
            token.bearer = response.data.access_token
            const expires = new Date()
            const expires_in = response.data.expires_in * 10
            expires.setTime(expires.getTime() + expires_in)
            token.expires = expires
            return token.bearer;
        } catch (error) {
            console.error(error);
        }
    } else {
        return token.bearer
    }
}

async function getGenres() {
    try {

        await authenticate();
        const response = await axios.get(`https://api.spotify.com/v1/recommendations/available-genre-seeds`,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${token.bearer}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
module.exports = { authenticate, getGenres }