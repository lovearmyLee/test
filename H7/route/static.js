





/***
 * static.js 静态文件路由控制 2018-10-17 14:40:59
 * 
 * 先写处理静态文件请求的路由static。
 * 这个路由的逻辑很简单，只要客户端想要请求某个静态文件（css/js/图片），
 * 就将被请求的文件发送给客户端即可。代码如下所示。
 * 有以下几点需要注意的地方，首先，客户端请求文件，
 * 需要判断文件是否存在，如果存在才将其发送给客户端，
 * 不存在则作其他处理（这里我暂时没做其他处理）。
 * 其次，将文件响应给客户端的时候，需要设置好http报头的MIME type，
 * 这样文件发过去之后客户端才能识别出文件类型从而正确使用。
 * 最后，像图片、音频等多媒体文件需要用二进制的读写方式，
 * 所以在响应图片的时候记得加上"binary"
 * 
 */

var fs = require('fs');
var path = require('path');

var MIME = {};
MIME[".css"] = "text/css";
MIME[".js"] = "text/js";
MIME[".jpg"] = "image/jpeg";
MIME[".jpeg"] = "image/jpeg";
MIME[".png"] = "image/png";
MIME[".gif"] = "image/gif";

function get(pathname, res) {
    if (fs.existsSync(pathname)) {
      var extname = path.extname(pathname);
      res.writeHead(200, {'Content-Type': MIME[extname]});
      fs.readFile(pathname, (err, data) => {
        if (err) {
          console.log(err);
          res.end();
        } else {
          if (isImage(extname)) {
            res.end(data, "binary");// 二进制文件需要加上binary
          } else {
            res.end(data.toString());
          }
        }
      });
    }
}

// 根据拓展名判断是否为图片
function isImage(extname) {
    if (extname === '.jpg' || extname === '.jpeg' ||
      extname === '.png' || extname === '.gif') {
      return true;
    }
    return false;
}

// 提供给其他模块使用的接口
module.exports = {
    get: get
};
  


