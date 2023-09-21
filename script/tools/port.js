/*
 * @LastEditTime: 2022-02-11 17:02:45
 * @Description: 找到一个可用端口
 */
const net = require('net');

const findPort = async function (port) {
  function portUsed(port) {
    return new Promise((resolve) => {
      let server = net.createServer().listen(port, 'localhost');
      server.on('listening', function () {
        server.close();
        resolve(false);
      });
      server.on('error', function (err) {
        if (err.code == 'EADDRINUSE') resolve(true);
      });
    });
  }
  let res = await portUsed(port);
  if (res) {
    return findPort(port + 1);
  } else {
    return port;
  }
};
module.exports.findPort = findPort;
