const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movies');

router.get('/', movieController.getMovies);
router.get('/:id', movieController.getMovie);
router.post('/add', movieController.addMovie);
router.patch('/modify/:id', movieController.modifyMovie);
router.put('/update/:id', movieController.updateMovie);
router.delete('/remove/:id', movieController.removeMovie);

module.exports = router;
