import Modal from "./Modal.js";

class InputModal extends Modal {
  constructor(options, currentValue) {
    // Call the base class constructor to handle common modal functionality
    super({
      title: options.title || "Confirmation",
      body: `<input type="text" class="form-control" value="${currentValue}">`,
    });
    this.confirmText = options.confirmText || "Save";
    this.cancelText = options.cancelText || "Cancel";
    this.onSave = options.onSave || function () {};
    this.onCancel = options.onCancel || function () {};
  }

  createModal() {
    // Call the base class `createModal` method to set up basic structure
    super.createModal();

    // Create confirm and cancel buttons
    const footer = this.modal.querySelector(".modal-footer");
    const saveButton = document.createElement("button");
    const cancelButton = document.createElement("button");
    const input = this.modal.querySelector(".form-control");

    saveButton.textContent = this.confirmText;
    saveButton.classList.add("btn", "btn-success");
    saveButton.addEventListener("click", () => {
      this.onSave(input.value);
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
    footer.appendChild(saveButton);
  }
}

export default InputModal;
