import consumer from "./consumer"

const chatRoom = consumer.subscriptions.create("ChatChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
    console.log('聊天服务器已建立连接')
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
    console.log('聊天服务器已断开连接')
  },

  received(data) {
    window.datamgs = data.message
    // Called when there's incoming data on the websocket for this channel
    const msgsElem = document.querySelector('#messages');
    const div = document.createElement('div');
    div.innerHTML = data.message;
    msgsElem.append(...div.childNodes);
  },

  speak(message) {
    this.perform('speak', { message })
  },
});

window.addEventListener('keypress', e => {
  if (e.target.tagName.toLowerCase() === 'input' && e.target.getAttribute('data-behavior') === 'room_speaker' && e.code === 'Enter') {
    if (e.target.value) {
      chatRoom.speak(e.target.value);
      e.target.value = '';
    }
    e.preventDefault();
    e.stopPropagation();
  }
});
