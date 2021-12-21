var express = require('express');
var cors = require('cors');
var wkhtmltopdf = require('wkhtmltopdf');
var fs = require('fs');
var app = express();

app.use(cors());

app.get('/:id', function (req, res, next) {
	const url = `http://localhost:3000/render/${req.params.id}`;
	res.attachment('out.pdf');
	wkhtmltopdf(url).pipe(res);
});

app.listen(9002, function () {
	console.log('server started on http://localhost:9002');
});
