// var express = require('express');
// var path = require('path');
// var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');

// var routes = require('./routes/index');
// var users = require('./routes/users');

// var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// // uncomment after placing your favicon in /public
// //app.use(favicon(__dirname + '/public/favicon.ico'));
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', routes);
// app.use('/users', users);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// // error handlers

// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(function(err, req, res, next) {
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });





// var express = require('express')
// var app = express()

// app.get('/', function (req, res) {
//   res.send('Hello World!')
// })

// var server = app.listen(3000, function () {

//   var host = server.address().address
//   var port = server.address().port

//   console.log('Example app listening at http://%s:%s', host, port)

// })

// module.exports = app;






var http = require('http'); // server library â€” built-in
var fs = require('fs');     // file system library â€” built-in
var mime = require('mime');
// Create a web server that, when a page request comes in, 
// e.g. "http://localhost:3000/index.html",
// passes it to a callback function to generate a response:
var server = http.createServer(
    function(request, response)
    {
        var filePath = './' + (request.url == '/' ? '/index.html' : request.url);
        // Check the file status:
        fs.exists(filePath, 
            function(exists)
            {
                if (exists)
                    fs.readFile(filePath,
                        function(error, data)
                        {
                            if (error)
                            {
                                response.writeHead(500, { 'Content-Type': 'text/plain' });
                                response.end('Error 500: Internal Server Error');
                            }
                            else
                            {
                                response.writeHead(200, 
                                    { 'Content-Type':  mime.lookup(filePath), 'Content-Length': data.length } 
                                );
                                response.end(data);
                            }
                        }
                    )
                else
                {
                    response.writeHead(404, { 'Content-Type': 'text/plain' });
                    response.end('Error 404: resource not found.');
                }
            }
        );
    }
);

// Start up the web server:
server.listen(3000, function() { console.log("Server listening on port 3000."); } );
