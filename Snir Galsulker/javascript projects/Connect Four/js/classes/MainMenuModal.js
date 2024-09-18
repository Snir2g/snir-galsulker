import Modal from "./Modal.js";

class MainMenuModal extends Modal {
  constructor(onClickStart) {
    // Call the base class constructor to handle common modal functionality
    super(`
                      <header>
                        <h1>
                          <span class="connect-text">Connect</span>
                          <span class="four-text">4</span>
                          <i class="fa-solid fa-list-check"></i>
                        </h1>
                      </header>
                      <div class="vstack gap-2 col-md-5 mx-auto mt-4">
                        <button type="button" id="startNewGame" class="btn btn-success">Start new Game</button>
                      </div>`);
    this.onClickStart = onClickStart;
  }

  createModal() {
    // Call the base class `createModal` method to set up basic structure
    super.createModal();

    const modalBody = this.modal.querySelector(".modal-body");

    const startNewGame = this.modal.querySelector("#startNewGame");

    startNewGame.addEventListener("click", () => {
      this.onClickStart();
      this.hide();
    });
  }
}

export default MainMenuModal;
