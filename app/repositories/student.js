const Model = require('app/models/student');

const getStudents = async (options = {}) => {
  const filter = {
    $and: [{}],
  };
  const projection = {};
  
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