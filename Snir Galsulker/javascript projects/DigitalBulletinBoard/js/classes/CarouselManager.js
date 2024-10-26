import MessageManager from "./MessageManager.js";

class CarouselManager {
  constructor(carouselContainerId, progressBarHeight) {
    this.messageManager = new MessageManager();
    this.carouselContainer = document.getElementById(carouselContainerId);
    this.progressBar = this.createProgressBar(progressBarHeight);
    this.toastContainer = null;
    this.carouselElement = null;
    this.intervalId = null;
    this.carousel = null;
    this.isInitialize = false;
  }

  createProgressBar(height) {
    const progressDiv = document.createElement("div");
    progressDiv.classList.add("progress");
    progressDiv.style.height = height;

    const progressBar = document.createElement("div");
    progressBar.classList.add("progress-bar");
    progressBar.setAttribute("role", "progressbar");
    progressBar.style.width = "0%";
    progressBar.setAttribute("aria-valuenow", "0");
    progressBar.setAttribute("aria-valuemin", "0");
    progressBar.setAttribute("aria-valuemax", "100");

    progressDiv.appendChild(progressBar);
    this.carouselContainer.appendChild(progressDiv);
    return progressBar;
  }

  addMessage(message) {
    this.messageManager.addMessage(message);

    if (!this.isInitialize) {
      this.initializeCarousel();
    }

    this.showAllMessages();
  }

  removeMessage(id) {
    this.messageManager.deleteMessage(id);

    if (!this.isInitialize) {
      this.initializeCarousel();
    }

    this.showAllMessages();
  }

  initializeCarousel() {
    this.carouselElement = document.createElement("div");
    this.carouselElement.classList.add("carousel", "slide");
    this.carouselElement.setAttribute("data-bs-ride", "false");

    this.toastContainer = document.createElement("div");
    this.toastContainer.classList.add("carousel-inner");
    this.toastContainer.setAttribute("id", "toast-container");

    this.carouselElement.appendChild(this.toastContainer);
    this.carouselContainer.appendChild(this.carouselElement);

    this.carousel = new bootstrap.Carousel(this.carouselElement, {
      interval: false,
    });
  }

  createCarouselItemElement(message) {
    const individualCarouselItemHTML = `
        <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="toast-header">
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            <strong class="me-auto fs-3">הודעה ממועד הבית</strong>
            <small class="text-body-secondary fs-5">29.9.24</small>
          </div>
          <div class="toast-body fs-3">${message.text}</div>
        </div>
      `;

    const carouselItem = document.createElement("div");
    if (this.messageManager.messages.length === 0) {
      carouselItem.classList.add("active"); // Only add "active" if messages.length is 0
    }
    carouselItem.innerHTML = individualCarouselItemHTML;
    return carouselItem;
  }

  showAllMessages() {
    this.toastContainer.innerHTML = "";
    for (let message in this.messageManager.messages) {
      const carouselItemElement = this.createCarouselItemElement(message);
      this.toastContainer.appendChild(carouselItemElement);
    }

    this.startCarouselTransition();
  }

  startCarouselTransition() {
    const interval = 5000; // משך כל שקופית
    let elapsed = 0;
    const progressUpdateInterval = 100; // זמן עידכון הפרוגרס

    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    if (this.messageManager.messages.length > 1) {
      this.intervalId = setInterval(() => {
        elapsed += progressUpdateInterval;
        const progressPercentage = (elapsed / interval) * 100;
        this.progressBar.style.width = `${progressPercentage}%`;

        if (elapsed >= interval) {
          this.carousel.next();
          elapsed = 0;
        }
      }, progressUpdateInterval);
    }
  }
}

export default CarouselManager;
