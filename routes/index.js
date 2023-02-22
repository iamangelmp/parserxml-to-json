var express = require('express');
var router = express.Router();
const {findPolizasClienteByNit, findPolizaRequerimientosByNIT, findPolizaRequerimientosByDPI, findRequerimientosByLlavePoliza} = require('../controllers/parser.controller.js')

require('dotenv').config()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/findPolizasClienteByNit/:pNIT', findPolizasClienteByNit );

router.post('/findPolizaRequerimientosByNIT/:pNIT', findPolizaRequerimientosByNIT)

router.post('/findPolizaRequerimientosByDPI/:pDPI', findPolizaRequerimientosByDPI)

router.post('/findRequerimientosByLlavePoliza/:pLlavePoliza', findRequerimientosByLlavePoliza)


module.exports = router;
