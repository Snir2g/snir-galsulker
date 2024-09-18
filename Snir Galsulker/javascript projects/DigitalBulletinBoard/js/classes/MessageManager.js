import Message from "./Message.js";

class MessageManager {
  constructor() {
    this.messages = [];
  }
  addMessage(text) {
    this.messages.push(new Message(text));
  }
  deleteMessage(id) {
    this.messages = this.tasks.filter((message) => message.id != id);
  }
  updateMessageText(id, newText) {
    let indexToUpdate = this.messages.findIndex((message) => message.id == id);
    this.messages[indexToUpdate].text = newText;
  }
}

export default MessageManager;
// export {TaskManager, num}
