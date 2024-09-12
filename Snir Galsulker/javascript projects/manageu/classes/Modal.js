class Modal {
  constructor(options = {}) {
    this.title = options.title || "Modal Title";
    this.body = options.body || "Modal Body";
    this.modal = null;
  }

  createModal() {
    const modal = document.createElement("div");
    modal.classList.add("modal", "fade");
    modal.tabIndex = -1;
    modal.role = "dialog";
    modal.innerHTML = `
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${this.title}</h5>
                        <button type="button" class="btn-close" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>${this.body}</p>
                    </div>
                    <div class="modal-footer">
                        <!-- Footer can be customized by subclasses -->
                    </div>
                </div>
            </div>
        `;

    // Add modal to the DOM
    document.body.appendChild(modal);
    this.modal = modal;

    // Close button functionality
    const closeButton = modal.querySelector(".btn-close");
    closeButton.addEventListener("click", () => {
      this.hide();
    });

    // Bootstrap modal hide event listener
    modal.addEventListener("hidden.bs.modal", () => {
      this.destroy();
    });

    // Initialize Bootstrap modal (no jQuery)
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
