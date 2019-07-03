var http = require('http')
var chalk = require('chalk');
var path = require('path');
var route = require('./helper/route')
var conf = require('./config/defaultConfig');


var server = http.createServer((req, res) => {
    var url = req.url;
    var method = req.method.toUpperCase();
    switch (method) {
        case "POST":

            break;

        default:
            break;
    }
    if (url == '/apps') {
        route.app(req, res);
    } else if (url == '/website') {
        route.website(req, res);
    } else if (url == '/download') {

    } else if (url == '/njdzjk') {
        route.njdzjk(req, res);

    } else {
        var filePath = path.join(conf.root, url);
        route.download(req, res, filePath);
    }
})

server.listen(conf.port, conf.hostname, () => {
    var addr = `http://${conf.hostname}:${conf.port}`;
    console.log(`Server started at ${chalk.green(addr)}`);
})
