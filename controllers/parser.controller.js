const axios = require('axios')
const createInstance = require('../config/conn.js')


/**
 * Consulta de pólizas por NIT
 * ej: 4548335-3
*/
const findPolizasClienteByNit = async (req, res, next) => {
  try {
    const pNIT = req.params.pNIT;
    const instance = await createInstance();
    const { data:{data} } = await instance.get('/findPolizasClienteByNit', { params: { pNIT: pNIT } });
  
    res.json(data[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error');
  }
}



/**
 * Consulta de póliza con requerimientos por NIT
 * 4548335-3
*/
const findPolizaRequerimientosByNIT = async(req, res, next)=>{
  try {
    const pNIT = req.params.pNIT;
    const instance = await createInstance();
    const {data:{data}} = await instance.get('/findPolizaRequerimientosByNIT', { params: { pNIT: pNIT } });
    
    res.json(data[0])
  } catch (error) {
    console.error(error);
    res.status(500).send('Error');
  }
}



/**
 * Consulta Póliza con requerimiento por DPI
 * 2423632530101
*/
const findPolizaRequerimientosByDPI = async(req, res, next)=>{
  try {
    const pDPI = req.params.pDPI;
    const instance = await createInstance();
    const {data:{data}} = await instance.get('/findPolizaRequerimientosByDPI', { params: { pDPI: pDPI } });  
    
    res.json(data[0])
  } catch (error) {
    console.error(error);
    res.status(500).send('Error');
  }
  
}



/**
 * Consulta Póliza con requerimiento por DPI
 * 2423632530101
*/
const findRequerimientosByLlavePoliza = async(req, res, next)=>{
  try {
    const pLlavePoliza = req.params.pLlavePoliza;
    const instance = await createInstance();
    const {data:{data}} = await instance.get('/findRequerimientosByLlavePoliza', { params: { pLlavePoliza: pLlavePoliza } });  
    
    res.json(data[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error');
  }
  
}





module.exports = { findPolizasClienteByNit, findPolizaRequerimientosByNIT, findPolizaRequerimientosByDPI, findRequerimientosByLlavePoliza };