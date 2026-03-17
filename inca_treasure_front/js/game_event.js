// 绑定游戏操作事件（翻牌、继续、离开）
function bindGameEvents(roomId, playerId) {
  // 1. 翻牌按钮
  document.getElementById('flip-card').addEventListener('click', function() {
    // 发送翻牌请求给后端（张三）
    socket.emit('flipCard', {
      roomId: roomId,
      playerId: playerId
    }, function(res) {
      if (res.code !== 200) {
        showTips('翻牌失败：' + res.msg);
      }
    });
  });

  // 2. 继续按钮
  document.getElementById('continue-btn').addEventListener('click', function() {
    socket.emit('makeDecision', {
      roomId: roomId,
      playerId: playerId,
      decision: 'continue' // 继续
    }, function(res) {
      if (res.code === 200) {
        showTips('选择继续');
      } else {
        showTips('操作失败：' + res.msg);
      }
    });
  });

  // 3. 离开按钮
  document.getElementById('leave-btn').addEventListener('click', function() {
    socket.emit('makeDecision', {
      roomId: roomId,
      playerId: playerId,
      decision: 'leave' // 离开
    }, function(res) {
      if (res.code === 200) {
        showTips('选择离开，结算宝石');
      } else {
        showTips('操作失败：' + res.msg);
      }
    });
  });
}