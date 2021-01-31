const jurusan = require('./jurusan').jurusan;
const fakultas = require('./fakultas').fakultas;
const nJur = jurusan.length;
const nFak = fakultas.length;


class query {
	constructor(raw) {
		this.raw = raw;
		this.nim = "";
		this.tpb = "";
		this.s1 = "";
		this.angkatan = "";
	}

	/**
	 * extract fakultas.nim from raw
	 * @return {query} this, raw purged from fakultas.nama and this.tpb set
	 */
	getTPB() {

		for (let i = 0; i < nFak; i++) {
			// build regex to match fakultas.nama
			let nama = new RegExp(`\\b${fakultas[i]["nama"]}\\b`, 'i');

			// if raw match with fakultas.nama
			if (this.raw.match(nama)) {
				this.tpb = fakultas[i]["nim"]; //set nim tpb
				this.raw = this.raw.replace(nama, ""); //purge fakultas.nama from raw

				break;
			}

		}

		return this;
	}

	/**
	 * extract jurusan.nim from raw
	 * @return {query} this, raw purged from jurusan.nama and this.s1 set
	 */
	getS1() {

		for (var i = 0; i < nJur; i++) {
			// find matching jurusan.nama
			var nama = new RegExp(`\\b${jurusan[i]["nama"]}\\b`, 'i');
			//if raw match with jurusan.nama
			if (this.raw.match(nama)) {
				this.s1 = fakultas[i]["nim"]; // set nim s1
				this.raw = raw.replace(nama, ""); // purge jurusan.nama from raw

				break; 
			}

			// if there is no match in jurusan.nama, search for match in jurusan.etc
			var etclen = jurusan[i]["etc"].length;
			for (var j = 0; j < etclen; j++) {
				var etc = new RegExp(`\\b${jurusan[i]["etc"][j]}\\b`, 'i');
				// if raw match with any of these etc
				if (this.raw.match(etc)) {
					this.s1 = jurusan[i]["nim"]; //set nim s1
					this.raw = this.raw.replace(etc, ""); // purge etc from raw

					break
				}
			}
			if (this.s1.length > 0) {break;}

		}

		return this;
	}

	/**
	 * extract angkatan from raw
	 * @return {query} this, raw purged from angkatan, angkatan set
	 */
	getAngkatan() {
		let re4 = /\b20\d\d\b/; // regex to match 4 digits angkatan, relevant for 20XX
		let re2 = /\b(1|2)\d\b/; // regex to match 2 digits angkatan, relevant for 201X and 202X

		// if raw match re4
		if (this.raw.match(re4)) {
			this.angkatan = this.raw.match(re4)[0].replace(/20/,""); // set angkatan
			this.raw = this.raw.replace(re4, ""); // purge angkatan from raw

			return this;
		}

		// if not match with re4, try re2
		if (this.raw.match(re2)) {
			this.angkatan = this.raw.match(re2)[0]; // set angkatan
			this.raw = this.raw.replace(re2, ""); // purge angkatan from raw

		}

		return this;

	}


	/**
	 * extract everything above and prepare raw
	 * @return {query} this, everything set and prepared
	 */
	extract() {
		// set everything
		this.getTPB().getS1().getAngkatan();

		// get nim from raw
		if (this.raw.match(/\d+/)) {
			this.nim = this.raw.match(/\d+/)[0]; // set nim
			this.raw = this.raw.replace(/\d+/, "");
		}

		// prepare raw
		// replace whitespace with %
		this.raw = this.raw.replace(/\s+/g,"%");

		this.raw = `%${this.raw}%`;
		this.nim = `%${this.nim}%`;
		this.tpb = `${this.tpb}%`;
		this.s1 = `${this.s1}%`;
		this.angkatan = this.angkatan.length>0? `${this.angkatan}___` : "%";

		return this;
	}

}


module.exports = query;
