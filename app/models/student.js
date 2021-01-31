const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ModelSchema = new Schema({
  username: {
    type: String,
  },
  nim_tpb: {
    type: String,
    index: true,
  },
  nim_jur: {
    type: String,
    index: true,
  },
  nama: {
    type: String,
    index: true
  },
  tipe: {
    type: String,
  },
  unit_organisasi: {
    type: String
  },
  email_std: {
    type: String,
  },
  email_real: {
    type: String
  },
});

const Model = mongoose.model('Student', ModelSchema);

module.exports = Model;