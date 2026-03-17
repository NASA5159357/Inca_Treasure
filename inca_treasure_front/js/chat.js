// 绑定聊天事件
function bindChatEvents(roomId, playerId) {
  // 发送聊天按钮
  document.getElementById('send-chat').addEventListener('click', function() {
    const input = document.getElementById('chat-input');
    const content = input.value.trim();
    if (!content) {
      showTips('请输入聊天内容');
      return;
    }
    // 发送聊天消息给后端（张三）
    socket.emit('sendChat', {
      roomId: roomId,
      playerId: playerId,
      content: content
    });
    // 清空输入框
    input.value = '';
  });

  // 监听后端推送的聊天消息
  socket.on('chatMessage', function(chat) {
    const chatContent = document.getElementById('chat-content');
    const chatItem = document.createElement('div');
    chatItem.style.margin = '5px 0';
    chatItem.innerHTML = `<strong>${chat.playerName}</strong>：${chat.content}`;
    chatContent.appendChild(chatItem);
    // 滚动到最新消息
    chatContent.scrollTop = chatContent.scrollHeight;
  });

  // 回车发送聊天
  document.getElementById('chat-input').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      document.getElementById('send-chat').click();
    }
  });
}