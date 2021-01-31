const service = require('./service');
const mysql = require('./mysql');
const mongo = require('./mongo');
const jurusan = require('./jurusan');
const fakultas = require('./fakultas');

module.exports = {
  ...service,
  ...mysql,
  ...jurusan,
  ...fakultas,
  ...mongo,
}