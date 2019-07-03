var fs = require('fs');
var path = require('path');
var Handlebars = require('handlebars');
var util = require('util');
var chalk = require('chalk');
var http = require('http');
var conf = require('../config/defaultConfig');
var compress = require('./compress');

var promisify = util.promisify;
var stat = promisify(fs.stat);
var readdir = promisify(fs.readdir);
var readfile = promisify(fs.readFile);


module.exports = {
    download: async (req, res, filePath) => {
        try {
            var stats = await stat(filePath)
            if (stats.isFile()) {
                var extname = path.extname(filePath)
                    .toLowerCase();
                res.statusCode = 200;

                // var mimePath = path.join(__dirname, '../config/mime.json')
                // let data = await readfile(mimePath);
                // var Mime = JSON.parse(data) || 'text/html;charset=UTF8';
                // res.setHeader('Content-Type', `${Mime[extname]}`);

                // fs.readFile(mimePath, (err, data) => {
                //     if (err) throw err;
                //     var Mime = JSON.parse(data) || 'text/html;charset=UTF8';
                //     res.setHeader('Content-Type', `${Mime[extname]}`);
                // })

                getMime(extname, Mime => {
                    console.log(chalk.red(extname, Mime));
                    res.setHeader('Content-Type', `${Mime}`);
                    // fs.createReadStream(filePath).pipe(res);
                    let rs = fs.createReadStream(filePath);
                    if (filePath.match(conf.compress)) {
                        rs = compress(rs, req, res);
                    }
                    rs.pipe(res);
                })

                // let rs = fs.createReadStream(filePath);
                // if (filePath.match(conf.compress)) {
                //     rs = compress(rs, req, res);
                // }


                // res.setHeader('Content-Type', 'text/plain; charset=utf-8');

            } else if (stats.isDirectory()) {
                var files = await readdir(filePath)
                var tplPath = path.join(__dirname, '../template/download.tpl');
                var source = fs.readFileSync(tplPath);
                var template = Handlebars.compile(source.toString());
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html; charset=utf-8');
                var dirs = path.relative(conf.root, filePath);
                var data = {
                    title: path.basename(filePath),
                    files: files,
                    dirs: dirs ? `/${dirs}` : ''
                }
                res.end(template(data))
            }

        } catch (error) {
            console.log(error);
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end(`${filePath} is not a directory or file`);
        }
    },
    app: (req, res) => {
        var tplPath = path.join(__dirname, '../template/apps.tpl');
        var source = fs.readFileSync(tplPath);
        var template = Handlebars.compile(source.toString());
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        getApps('http://localhost:3000/apps', appsData => {
            var data = {
                appsData
            };
            res.end(template(data));
        })
    },
    website: (req, res) => {
        var tplPath = path.join(__dirname, '../template/website.tpl');
        var source = fs.readFileSync(tplPath);
        var template = Handlebars.compile(source.toString());
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        getApps('http://localhost:3000/websites', websiteData => {
            var data = {
                websiteData
            };
            res.end(template(data));
        })
    },
    njdzjk:(req,res)=>{
        var tplPath = path.join(__dirname, '../template/njdzjk.tpl');
        var source = fs.readFileSync(tplPath);
        var template = Handlebars.compile(source.toString());
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        getApps('http://localhost:3000/websites', websiteData => {
            var data = {
                websiteData
            };
            res.end(template(data));
        })
    }
}

async function getMime(extname, fn) {
    var mimePath = path.join(__dirname, '../config/mime.json')
    let data = await readfile(mimePath);
    var Mime = JSON.parse(data) || 'text/html;charset=UTF8';
    fn(Mime[extname]);
}

async function getApps(url, fn) {
    http.get(url, res => {
        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => {
            rawData += chunk;
        });
        res.on('end', () => {
            try {
                fn(JSON.parse(rawData))
            } catch (e) {
                console.error(e.message);
            }
        });
    }).on('error', e => {
        console.log('error:', e);
    })

}
