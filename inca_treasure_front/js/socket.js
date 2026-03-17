// 全局Socket对象（对接张三的Node.js+Socket.io后端）
let socket;

// 初始化Socket连接
function initSocket() {
  // 张三的后端地址（本地测试：localhost:3000）
  const backendUrl = 'http://localhost:3000';
  socket = io(backendUrl, {
    reconnection: true, // 断线自动重连
    reconnectionAttempts: 5, // 重连次数
    reconnectionDelay: 1000 // 重连间隔
  });

  // 连接成功
  socket.on('connect', function() {
    showTips('已连接到服务器');
  });

  // 连接失败
  socket.on('disconnect', function() {
    showTips('与服务器断开连接，正在重连...');
  });

  // 重连成功
  socket.on('reconnect', function() {
    showTips('重连成功，继续游戏');
    // 重连后重新获取房间列表/游戏状态
    socket.emit('getRoomList');
  });

  // 连接错误
  socket.on('connect_error', function(err) {
    showTips('连接服务器失败：' + err.message);
  });
}

// 页面加载时初始化Socket
document.addEventListener('DOMContentLoaded', function() {
  initSocket();
});