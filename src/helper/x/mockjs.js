var mock = require('mockjs');
var Random = mock.Random;


// "websites": [{
//     "id": 1,
//     "title": "机动车信息管理平台",
//     "url": "http://10.36.17.178/iVmp/Web"
// }]



var data = mock.mock({
    'websites|1-10': [{
        'id|+1': 1,
        'title': Random.csentence(),
        'url': Random.url()
    }]
})


console.log(JSON.stringify(data));
