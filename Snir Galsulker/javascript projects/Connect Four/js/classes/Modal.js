class Modal {
  constructor(body) {
    this.modal = null;
    this.body = body;
  }

  createModal(options) {
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.tabIndex = -1;
    modal.role = "dialog";

    modal.innerHTML = `
            <div class="modal-dialog modal-fullscreen" role="document">
              <div class="modal-content">
                <div class="modal-body text-center">
                  ${this.body}
                </div>
              </div>
            </div>
        `;

    // Add modal to the DOM
    document.body.appendChild(modal);
    this.modal = modal;

    // Close button functionality
    try {
      const closeButton = modal.querySelector(".close");
      closeButton.addEventListener("click", () => {
        this.hide();
      });
    } catch (e) {}
    // Bootstrap modal hide event listener
    modal.addEventListener("hidden.bs.modal", () => {
      this.destroy();
    });

    // Initialize Bootstrap modal
    this.bootstrapModal = new bootstrap.Modal(modal);
  }

  show() {
    if (!this.modal) {
      this.createModal();
    }
    this.bootstrapModal.show();
  }

  hide() {
    if (this.modal) {
      this.bootstrapModal.hide();
    }
  }

  destroy() {
    if (this.modal) {
      this.modal.remove();
      this.modal = null;
    }
  }
}
export default Modal;
