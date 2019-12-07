#!/usr/bin/node

const express = require('express');
const cors = require('cors');
const mysql = require("mysql");
const solver = require("./24solver");
const port = 6969;
const dbname = 'NIMFinder';
const dbuname = 'guest';


const dbConn = mysql.createConnection({
	host: 'localhost',
	user: dbuname,
	password: '',
	database: dbname
});


const app = express();
app.use(cors());
app.use(express.static('public'));
app.use('/public', express.static('public'));

app.get('/nim', (req, res) => {
	res.sendFile('./public/index.html', {root: __dirname});
});

app.get('/nims/:id', (req, res, next) => {

	nama = tpb = s1 = s2 = s3 = '%' + req.params.id.split(" ").join("%") + '%';

	dbConn.query("SELECT * FROM nim WHERE nama LIKE ? OR tpb LIKE ? OR s1 LIKE ? OR s2 LIKE ? OR s3 LIKE ?", 
		[nama, tpb, s1, s2, s3],
		(err, results, fields) => {
			if (err) {
				res.status(500).send({message: "something went wrong :("});
			} else if (results.length > 0){
				res.status(200).send({message: "we found something", count: results.length, data: results});
			} else {
				res.send({message: "nothing found :(", count : 0});
			}
		});

});

app.get('/24solver/:a/:b/:c/:d', (req, res, next) => {

	var nums = [req.params.a, req.params.b, req.params.c, req.params.d];
	var check = 0;

	nums.forEach(n => {
		if(n %1 !== 0) {
			check++;
		}
	});

	if (check === 0) {
		result = solver.evaluate(nums);
		res.send({message:"you fcking cheater", count: result.length, data: result});
	} else {
		res.send({message: "if you are going to cheat, at least do it right bro"});
	}
});

app.listen(port);
console.log(`listening on port ${port}`);
