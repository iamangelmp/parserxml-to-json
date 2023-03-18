const dictionary = require("../models/nosql/dictionary.model.js");
const XLSX = require("xlsx");

const checkMessage = async (req, res, next) => {
  const msg = req.body.msg;
  const dataArray = await proccessData(msg);

  // si la answare de dataArray es un mensaje de error, regresar un objeto JSON con estatus 500
  if (typeof dataArray.answare == "string") {
    return res.status(500).json({ error: dataArray });
  }

  res.json(dataArray);
};

//covierte cadenas a arreglos
const convertArray = (msj) => {
  return String(msj).split(",");
};

//El objeto que retorna la petición
const proccessData = async (msj) => {
  try {
    const keyword = await dictionary.find({});
    let dataMsgObj = {
      message: msj,
      keywords: [],
      question: [],
      answare: [],
      comments: [],
    };

    for (faq of keyword) {
      for (let i = 0; i <= faq.keywords.length; i++) {
        if (msj.includes(faq.keywords[i]) && msj != "" && msj != " ") {
          dataMsgObj.answare.push(faq.answare);
          dataMsgObj.comments.push(faq.comments);
          dataMsgObj.question.push(faq.question);
          dataMsgObj.keywords.push(faq.keywords);
        }
      }
    }

    return processAnsware(dataMsgObj);
  } catch (error) {
    return processAnsware({ error: error });
  }
};

const processAnsware = (dataObj) => {
  let msg = `No he podido entender tu requerimiento ☹️.En unos momentos uno de nuestros asesores te va a apoyar con tu requerimiento`;

  //elimina respuestas, preguntas y comentarios duplicados
  dataObj.question = deleteDuplicates([...dataObj.question]);
  dataObj.comments = deleteDuplicates([...dataObj.comments]);

  dataObj.answare.length == 0
    ? (dataObj.answare = msg)
    : (dataObj.answare = deleteDuplicates([...dataObj.answare]));

  return dataObj;
};

const deleteDuplicates = (array_duplied) => {
  return array_duplied.filter((item, index) => {
    return array_duplied.indexOf(item) === index;
  });
};

const createDictionary = async (req, res, next) => {
  const file = req.files.file;

  var workbook = XLSX.read(file.data);
  var wsnames = workbook.SheetNames[0];
  var worksheet = workbook.Sheets[wsnames];

  var jsa = await parseData(XLSX.utils.sheet_to_json(worksheet));

  await dictionary.insertMany(jsa);

  return res.json(jsa);
};

const parseData = async (objects_array) => {
  let objects_parsed = [];
  objects_array.forEach((element) => {
    const {
      ID,
      Pregunta,
      Respuesta,
      Keywrod,
      "Comentarios Seguros el Roble": comments,
    } = element;
    let parsed_array = {
      ID: ID,
      question: Pregunta,
      answare: Respuesta,
      keywords: convertArray(Keywrod),
      comments: comments,
    };
    objects_parsed.push(parsed_array);
  });

  return objects_parsed;
};

module.exports = { checkMessage, createDictionary };
