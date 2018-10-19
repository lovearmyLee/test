

/***
 * server.js 启动服务脚本 2018-10-17 14:25:11
 * 
 * 代码中使用正则表达式来判定客户端request是否是在请求静态文件，
 * 如果是，则交给专门处理静态文件请求的路由static去处理，
 * 否则交给普通请求的路由器api去处理。
 * 普通请求根据它的HTTP方法来判断使用get或者post。
 * 最后，设置服务器监听3000端口，
 * server.js的代码就算完成了
 * */ 



var http = require('http')
var url = require('url')
var api = require('./route/api')
var static  = require('./route/static')


// 匹配静态文件夹路径的正则表达式，用于判定请求是否为静态文件请求
var staticExp = /\/public\/(img|css|js)\/[a-z0-9]*\.(jpg|png|gif|css|js)/;

http.createServer((req,res) =>{

    var pathname = url.parse(req.url).pathname;
    if(staticExp.test(pathname)){// 静态文件请求交由static处理
        static.get(__dirname + pathname, res);
    }else if(req.method == 'POST'){// 处理普通post请求
        api.post(req, res);
    }else{// 处理普通get请求
        api.get(req, res);
    }
}).listen(9999)

console.log('[Server Info] Start server at http://localhost:9999/');