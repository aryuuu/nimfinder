const studentRepo = require('app/repositories/student');
const {
  jurusan,
  fakultas,
} = require('app/configs');

const RE_4 = /\b20\d\d\b/;
const RE_2 = /\b(1|2)\d\b/;

const getStudents = async (query = {}) => {
  const options = {
    count: 10,
    page: 0,
    angkatan: '',
  };
  
  if (query.count) {
    options.count = parseInt(query.count);
  }

  if (query.page) {
    options.page = parseint(query.page) - 1;
  }

  if (query.email == 'true') {
    options.email = true;
  }

  if (query.q) {
    const angkatan4 = query.q.match(RE_4);

    if (angkatan4) {
      options.angkatan = angkatan4[0].replace(/20/, '');
      query.q = query.q.replace(RE_4, '');
    } else {
      const angkatan2 = query.q.match(RE_2);

      if (angkatan2) {
        options.angkatan = angkatan2[0];
        query.q = query.q.replace(RE_2, '');
      }

    }
    
    fakultas.some(fak => {
      const fakultasRE = new RegExp(`\\b${fak.nama}\\b`, 'i');
      const match = query.q.match(fakultasRE);

      if (match) {
        options.nim_tpb = fak.nim;
        query.q = query.q.replace(fakultasRE, '');
      }

      return match;
    });

    jurusan.some(jur => {
      const jurusanRE = new RegExp(`\\b${jur.nama}\\b`, 'i');
      let match = query.q.match(jurusanRE);

      if (match) {
        options.nim_jur = jur.nim;
        query.q = query.q.replace(jurusanRE, '');
      } else {
        jur.etc.some(e => {
          const etcRE = new RegExp(`\\b${e}\\b`, 'i');
          const etcMatch = query.q.match(etcRE);

          if (etcMatch) {
            options.nim_jur = jur.nim;
            query.q = query.q.replace(etcRE, '');

          }

          match = etcMatch;
          return etcMatch;
        });
      }

      return match;
    })    

    const nimMatch = query.q.match(/\d+/);
    if (nimMatch) {
      options.nim = nimMatch[0];
      query.q = query.q.replace(/\d+/, '');
    }

    options.nama = query.q.replace(/\s+/g, '.*');
  }

  const result = await studentRepo.getStudents(options);
  return result;
}

module.exports = {
  getStudents,
}