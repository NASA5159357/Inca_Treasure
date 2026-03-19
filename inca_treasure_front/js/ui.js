// 显示提示框
function showTips(text) {
  const tipsBox = document.getElementById('tips-box');
  tipsBox.textContent = text;
  tipsBox.style.display = 'block';
  // 3秒后隐藏
  setTimeout(() => {
    tipsBox.style.display = 'none';
  }, 3000);
}

// 渲染房间列表（对接张三的后端数据）
function renderRoomList(roomList) {
  const container = document.getElementById('room-list-container');
  if (!roomList || roomList.length === 0) {
    container.innerHTML = '<div style="text-align:center; color:#999;">暂无可用房间</div>';
    return;
  }
  // 拼接房间项HTML
  let html = '';
  roomList.forEach(room => {
    html += `
      <div class="room-item">
        <div class="room-item-info">
          <div class="room-item-id">房间号：${room.roomId}</div>
          <div class="room-item-player">玩家数：${room.playerCount}/8</div>
        </div>
        <button class="btn join-room-btn" data-roomid="${room.roomId}">加入</button>
      </div>
    `;
  });
  container.innerHTML = html;

  // 绑定加入房间按钮事件
  document.querySelectorAll('.join-room-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const roomId = this.getAttribute('data-roomid');
      document.getElementById('room-id-input').value = roomId;
      // 触发加入按钮点击
      document.getElementById('join-room').click();
    });
  });
}

// 渲染玩家信息（对接张三的后端数据）
function renderPlayerInfo(playerList) {
  const container = document.getElementById('player-info-container');
  let html = '';
  playerList.forEach(player => {
    html += `
      <div class="player-item">
        <div class="player-name">${player.name}</div>
        <div class="player-score">得分：${player.score}</div>
        <div class="player-status">${player.isCurrentTurn ? '当前回合' : ''}</div>
      </div>
    `;
  });
  container.innerHTML = html;
}

// 添加翻牌日志项
function addLogItem(log) {
  const container = document.getElementById('log-container');
  const logItem = document.createElement('div');
  logItem.className = 'log-item';
  logItem.textContent = `【${new Date().toLocaleTimeString()}】${log.playerName}翻出：${log.cardType}（${log.desc}）`;
  container.appendChild(logItem);
  // 滚动到最新日志
  container.scrollTop = container.scrollHeight;
}