
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

async function getGenres() {
    try {

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

async function getUserId(token) {
    try {

        const response = await axios.get(`https://api.spotify.com/v1/me `,
            {
                headers: {
                    Authorization : `Bearer ${token}`
                }
            }
        );
        id = response.data.id;
        return id;
    } catch (error) {
        console.error(error);
    }
}

async function buscarTitulosPorBPM(token) {

    try {
        const response = await axios.get(`https://api.spotify.com/v1/recommendations?limit=50&seed_genres=german&min_tempo=130&max_tempo=140`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        
        const tracks = response.data.tracks.map(track => {
            return track.uri
        });
        return tracks;
    } catch (error) {
        console.error(error);
    }

}

async function CriarPlaylist(id, token) {

    try {

        const data = {
            name: "Playlist de Duran",
            description: "duran eh top",
            public: true
        }
        const response = await axios.post(`https://api.spotify.com/v1/users/${id}/playlists
            `, data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const playlistId = response.data.id
        return playlistId;

    } catch (error) {
        console.error(error);
    }

}

async function adicionaMusicas(playlistId, token, tracks) {
        
        try {
            const data = {
                "uris":  tracks 
                ,
                "position": 0
            }
            const response = await axios.post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
    
            } 
        catch (error) {
            console.error(error);
        }
        
    ;
   
}



module.exports = {getGenres, buscarTitulosPorBPM, getUserId, CriarPlaylist, adicionaMusicas}