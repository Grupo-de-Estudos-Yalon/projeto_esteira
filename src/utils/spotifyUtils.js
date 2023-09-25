
const axios = require('axios').default;
require('dotenv').config()
require('../routes/playlist')

var token = {
    bearer: "",
    expires: ""
}

function tokenExpired() {
    return token.expires < new Date()
}

async function authenticate() {
    if (tokenExpired()) {
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
            expires = new Date()
            expires_in = response.data.expires_in * 10
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