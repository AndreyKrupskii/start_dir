import express  from 'express';
import favicon from 'serve-favicon';
import cookieParser from 'cookie-parser';
import path from 'path';
import bodyParser from 'body-parser';
import getLogger from './libs/getLogger';

/*
	******************************
	Application init
	********************************
*/
const app = express();
const log = getLogger(module);

// Application uses
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './../../public')));
// app.use(favicon(path.join(__dirname, './../../public', 'favicon.ico')));

app.use(function(req, res, next) {
	var status = 404;
	var message = 'I have some troubles with looking for your request. I\'m so sorry =(';
	var err = new Error();
	next(err);
});

app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	if(res.req.headers['x-requested-with'] == 'XMLHttpRequest'){
		res.json(err);
	} else{
		res.json(err);
	}
});

const port = process.env.PORT || 2016;
app.listen(port, () => {
	log.info(`Server listening on: ${port}`);
});