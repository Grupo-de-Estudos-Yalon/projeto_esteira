const router = require('express').Router();
const { MongoMissingCredentialsError } = require('mongodb');
const playlist = require('../models/Playlist');
<<<<<<< HEAD
const SpotifyUtils = require('../utils/spotifyUtils')
=======
const spotifyUtils = require('../utils/spotifyUtils')
>>>>>>> master

router.route('/playlist/genres')
    // to retrieve resource
    .get(async function (req, res, next) {
        res.status(200).send(await spotifyUtils.getGenres());
    });


<<<<<<< HEAD
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
=======
router.route('playlist/form')
    .post(async function (req, res) {
        try {

            let playlistDTO = ({
                name: req.body.nome,
                genero: req.body.genero,
                embrazamento: req.body.embrazamento,
                altura: req.body.altura,
                duracao: req.body.duracao,
                velocidade: req.body.velocidade
            });

            CriarPlaylist(playlistDTO);



            playlist.save()
            /*
           Jayro, implemente a função que cria a Playlist recebendo os dados acima
           criarPlaylist()
           */
            return res.json({ message: `playlist ${nome} salva com sucesso!` })
>>>>>>> master



        }
        catch (error) {
            console.log(error)
        }

    });

module.exports = router;

