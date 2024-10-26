My Shop Web Application - README

Overview
My Shop is a simple e-commerce web application where users can browse products, add items to their shopping cart, adjust item quantities, and remove items directly from the product grid or the shopping cart view. The application is built using HTML, SASS, CSS (with Bootstrap), and JavaScript. It also supports local storage to save the user's cart between sessions.

Features
    Product Catalog: Browse various categories of products including TVs, laptops, home appliances, and more.
    Shopping Cart: Add, remove, and update product quantities from both the product grid and the shopping cart.
    Grid View Actions: Directly add, remove, or adjust item quantities in the grid view without navigating to a separate cart page.
    Responsive Design: Fully responsive layout, optimized for both mobile and desktop.
    Toast Notifications: Display notifications for actions like adding/removing products.
    Confirmation Modals: Ask for confirmation before removing items from the cart.
    Local Storage: The cart persists between page reloads or browser sessions.

Getting Started

Prerequisites
To run this project locally, you'll need:
    A modern web browser (Google Chrome, Mozilla Firefox, etc.)
    Internet connection to load external Bootstrap and icon libraries.

Installation
    Open the Project: Navigate to the project folder and open the index.html file in your browser.

How to Use
    1. Browse Products
    Products are displayed in a grid format on the homepage. Each product shows its name, description, price, and category.
    Scroll down to explore more products.
    2. Add, Update, or Remove Products from Grid
    You can directly add items to your cart by clicking the Add to cart button on each product in the grid.
    To update quantities, use the up/down buttons that appear after a product has been added to the cart.
    To remove an item, click the Remove button next to the product or reduce the quantity to zero.
    3. Cart Updates in Real-Time
    All updates made in the grid view are reflected immediately in the shopping cart, with notifications informing you of the changes.
    4. Persistent Cart
    Your cart is automatically saved in the browser's local storage, so it will be restored when you revisit the website.

File Structure
    index.html: Main HTML file for the structure of the website.
    css/main.css: Custom CSS styles for the project.
    js/main.js: Main JavaScript file that contains logic for the cart, product display, toasts, modals, and more.
    images/: Directory containing placeholder images for products and icons.

Dependencies
    This project relies on several third-party libraries:
        Bootstrap: For responsive layout, components, and modals.
        Bootstrap Icons: For icons used across the UI (like the shopping cart and trash bin).
        Popper.js: For Bootstrap's dropdown functionality.
        All these libraries are loaded via CDN.

Future Improvements
    Add a backend to manage product data and orders.
    Implement user authentication for personalized experiences.
    Add a search feature to filter products by name or category.

License
    This project is licensed under the MIT License.

Contributing
Feel free to open issues or submit pull requests to help improve the project!