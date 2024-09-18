class Message {
  constructor(text) {
    this.id = Math.floor(Math.random() * 1001);
    this.text = text;
  }
}

export default Message;
