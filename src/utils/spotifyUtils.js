
const axios = require('axios').default;
require('dotenv').config()

async function authenticate() {
    const data = `grant_type=client_credentials&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`
    try {
        const response = await axios.post(`https://accounts.spotify.com/api/token`, data,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

async function getGenres(){
    try {
        const token = await authenticate();
        const response = await axios.get(`https://api.spotify.com/v1/recommendations/available-genre-seeds`,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${token.access_token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
module.exports = { authenticate, getGenres }