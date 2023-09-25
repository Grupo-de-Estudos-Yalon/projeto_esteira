const router = require('express').Router();
const { MongoMissingCredentialsError } = require('mongodb');
const playlist = require('../models/Playlist');
const spotifyUtils = require('../utils/spotifyUtils')

router.route('/playlist/genres')
    // to retrieve resource
    .get(async function(req, res, next) {
        res.status(200).send(await spotifyUtils.getGenres());
    });

module.exports = router;

router.route('playlist/form')
    .post (async function(req, res)) {
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
            return res.json({message: `playlist ${nome} salva com sucesso!`})

           
           
        }
        catch(error) {
             console.log(error)
        }

    }
