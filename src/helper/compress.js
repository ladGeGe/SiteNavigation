var {
    createGzip,
    createDeflate
} = require('zlib');

module.exports = (rs, req, res) => {
    const acceptEndcoding = req.headers['accept-encoding'];
    if (!acceptEndcoding || !acceptEndcoding.match(/\b(gzip|deflate)\b/)) {
        return rs;
    } else if (acceptEndcoding.match(/\bgzip\b/)) {
        res.setHeader('Content-Encoding', 'gzip');
        return rs.pipe(createGzip());
    } else if (acceptEndcoding.match(/\bdeflate\b/)) {
        res.setHeader('Content-Encoding', 'bdeflate');
        return rs.pipe(createDeflate())
    }
}
