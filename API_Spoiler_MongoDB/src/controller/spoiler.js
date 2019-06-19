const Spoiler = require("../model/spoiler");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

app.use(bodyParser.json());
app.use(express.json());

exports.buscarUm = (request, response, next) => {
  Spoiler.findById(request.params.id)
    .then(result => {
      response.send(result);
    })
    .catch(err => {
      response.status(400).send(err);
    });
};

exports.buscarTodos = (request, response, next) => {
  Spoiler.find()
    .then(result => {
      response.send(result);
    })
    .catch(err => {
      response.status(400).send(err);
    });
};

exports.criar = (request, response, next) => {
  const titulo = request.body.titulo;
  const espoliador = request.body.espoliador;
  const descricao = request.body.descricao;

  const spoiler = new Spoiler({
    titulo: titulo,
    espoliador: espoliador,
    descricao: descricao
  });

  spoiler.save(function(err, spoiler) {
    if (err) return console.error(err);
    response.send(spoiler);
  });
};

exports.atualizar = (request, response, next) => {
  const id = request.params.id;

  Spoiler.findByIdAndUpdate(id, request.body, { new: true }, (err, spoiler) => {
    if (err) return response.status(500).send(err);
    return response.send(spoiler);
  });
};

exports.excluir = (request, response, next) => {
  const id = request.params.id;

  Spoiler.findByIdAndDelete(id)
    .then(() => {
      response.send();
    })
    .catch(err => response.status(400).send(err));
};
