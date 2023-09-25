const router = require('express').Router();
const spotifyUtils = require('../utils/spotifyUtils')

router.route('/playlist/genres')
    // to retrieve resource
    .get(async function(req, res) {
        res.status(200).send(await spotifyUtils.getGenres());
    });

module.exports = router;