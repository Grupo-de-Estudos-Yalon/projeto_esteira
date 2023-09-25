const Utils = require('./utils')
const axios = require('axios').default;

require('dotenv').config()


var token = {
    bearer: "",
    expires: ""
}

function tokenExpired(){
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

function AdicionaMusicaNaPlaylist(){ 
    tempoPlaylist = 0
    i = 0
    while(tempoPlaylist < playlistDTO.duracao) {
        adicionaNoSpotify(musicas[i]); 
        i++;
        tempoPlaylist =+ musicas[i].tempo;
}

function getSongsByGenreAndBPM(playlistDTO) {
    "devolve um array com objetos do tipo música"
    
    //Aqui a parte do código que vai criar a playlist no Spotify
    
    //ao final dessa iteração, certamente o tempo da playlist não será identico ao requisitado no DTO,
    // portando é interessante passarmos o tempo da playlist populada para o o DTO no final do processo.
    //não só o tempo, mas todas as músicas contidas dentro dessa playlist.

    }
    
}

async function criarPlaylistNoSpotify() {
    try {
        const data = {
            "name": "New Playlist",
            "description": "New playlist description",
            "public": true
       }
        await authenticate();
        const response = await axios.post(`https://api.spotify.com/v1/users/Duranpepeu/playlists`, data ,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token.bearer}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
}


function criarPlaylist(playlistDTO) {
    
    const bpm = Utils.calcularBPM(playlistDTO.altura, playlistDTO.velocidade)
    //ler a API para verificar como as buscas por música podem ser feitas.

    criarPlaylistNoSpotify(); 


}




module.exports = { authenticate, getGenres, criarPlaylist, criarPlaylistNoSpotify }