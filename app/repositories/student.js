const Model = require('app/models/student');

const getStudents = async (options = {}) => {
  const filter = {
    $and: [{}],
  };
  const projection = {
    _id: 0,
    nama: 1,
    nim_tpb: 1,
    nim_jur: 1,
    tipe: 1,
    unit_organisasi: 1,
  };

  if (options.email) {
    projection.email_std = 1;
    projection.email_real = 1;
  }
  
  if (options.nama) {
    filter.$and.push({
      nama: {
        $regex: options.nama,
        $options: 'i',
      }
    });
  }

  if (options.nim) {
    filter.$and.push({
      $or: [
        { nim_tpb: { $regex: options.nim }},
        { nim_jur: { $regex: options.nim }}
      ]
    });
  }

  if (options.nim_tpb) {
    filter.$and.push({
      nim_tpb: {
        $regex: '^' + options.nim_tpb + options.angkatan
      }
    });
  }

  if (options.nim_jur) {
    filter.$and.push({
      nim_jur: {
        $regex: '^' + options.nim_jur + options.angkatan,  
      }
    });
  }

  const docs = await Model.find(filter, projection)
    .limit(options.count)
    .skip(options.count * options.page)
    .exec();

  return docs;
}

module.exports = {
  getStudents
}