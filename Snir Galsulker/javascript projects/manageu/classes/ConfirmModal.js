import Modal from "./Modal.js";

class ConfirmModal extends Modal {
  constructor(options) {
    // Call the base class constructor to handle common modal functionality
    super({
      title: options.title || "Confirmation",
      body: options.message || "Are you sure?",
    });

    this.confirmText = options.confirmText || "Confirm";
    this.cancelText = options.cancelText || "Cancel";
    this.onConfirm = options.onConfirm || function () {};
    this.onCancel = options.onCancel || function () {};
  }

  createModal() {
    // Call the base class `createModal` method to set up basic structure
    super.createModal();

    // Create confirm and cancel buttons
    const footer = this.modal.querySelector(".modal-footer");
    const confirmButton = document.createElement("button");
    const cancelButton = document.createElement("button");

    confirmButton.textContent = this.confirmText;
    confirmButton.classList.add("btn", "btn-primary");
    confirmButton.addEventListener("click", () => {
      this.onConfirm();
      this.hide();
    });

    cancelButton.textContent = this.cancelText;
    cancelButton.classList.add("btn", "btn-secondary");
    cancelButton.addEventListener("click", () => {
      this.onCancel();
      this.hide();
    });

    // Append buttons to footer
    footer.appendChild(cancelButton);
    footer.appendChild(confirmButton);
  }
}

export default ConfirmModal;
