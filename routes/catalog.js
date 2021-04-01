var express = require('express');
var router = express.Router();

// Require controller modules.
var game_controller = require('../controllers/gameController');
var designer_controller = require('../controllers/designerController');
var year_controller = require('../controllers/yearController');
var category_controller = require('../controllers/categoryController');

// GAME ROUTES //
router.get('/', game_controller.index);

router.get('/games', game_controller.game_list);

/// DESIGNER ROUTES ///

// GET request for creating designer. NOTE This must come before route for id (i.e. display author).
// router.get('/author/create', author_controller.author_create_get);

// // POST request for creating Author.
// router.post('/author/create', author_controller.author_create_post);

// Get requet for new designer form
router.get('/designer/create', designer_controller.designer_create_get);

// POST request for creating Designer.
router.post('/designer/create', designer_controller.designer_create_post);

// GET request for one designer.
router.get('/designer/:id', designer_controller.designer_detail);

// GET request for list of all designers.
router.get('/designers', designer_controller.designer_list);

// Category routes

router.get('/categories', category_controller.category_list);

router.get('/category/:id', category_controller.category_detail);

// Year routes

router.get('/years', year_controller.year_list);

module.exports = router;
