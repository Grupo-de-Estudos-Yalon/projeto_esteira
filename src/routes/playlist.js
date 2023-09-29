const router = require('express').Router();
const { MongoMissingCredentialsError } = require('mongodb');
const playlist = require('../models/Playlist');
const SpotifyUtils = require('../utils/spotifyUtils')

router.route('/playlist/genres')
    // to retrieve resource
    .get(async function (req, res, next) {
        res.status(200).send(await spotifyUtils.getGenres());
    });


router.route('/playlist/form')
    .get(async function (req, res) {
        try {
            SpotifyUtils.criarPlaylistNoSpotify()
        //     let playlistDTO = ({
        //         name: req.body.nome,
        //         genero: req.body.genero,
        //         embrazamento: req.body.embrazamento,
        //         altura: req.body.altura,
        //         duracao: req.body.duracao,
        //         velocidade: req.body.velocidade
        //     });

        //     CriarPlaylist(playlistDTO);



        //     playlist.save()
        //     /*
        //    Jayro, implemente a função que cria a Playlist recebendo os dados acima
        //    criarPlaylist()
        //    */
            // return res.json({ message: `playlist ${nome} salva com sucesso!` })



        }
        catch (error) {
            console.log(error)
        }

    });

    router.route('')

module.exports = router;

