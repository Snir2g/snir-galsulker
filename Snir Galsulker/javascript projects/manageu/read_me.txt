TO-DO List Application

Overview
    This is a simple yet powerful TO-DO list application built using HTML, JavaScript (ES6 Modules), and Bootstrap 5. It allows users to manage their daily tasks by adding new tasks, updating, deleting, marking them as completed, and viewing tasks in two categories: Active and Completed. The app also uses localStorage to save tasks persistently, so they remain available even after a page refresh.

Features
    Task Management:
        Add new tasks by typing into the input box and either pressing the Enter key or clicking the "+" button.
        Active tasks appear in the "Active" section.
        Completed tasks move to the "Completed" section.

    Task Editing:
        Update task descriptions by clicking the pencil icon.
        Mark tasks as completed by clicking the check icon.
        Undo completed tasks by clicking the arrow icon.

    Task Deletion:
        Delete tasks by clicking the trash icon. A confirmation modal appears before deletion.

    Persistence:
        All tasks are stored in the browser’s localStorage so that tasks are not lost on page reloads.

Technologies Used
    HTML5: Used for structuring the page.
    Bootstrap 5: For styling and layout responsiveness.
    FontAwesome: Used for icons within the app (e.g., pencil, trash, check, etc.).
    JavaScript (ES6 Modules): Implements the business logic of the app, including task creation, updates, deletion, and interaction with the DOM.
    LocalStorage: For saving tasks locally on the user's device.

Installation and Setup
    Clone or download the project to your local machine.
    Ensure all files, including index.html, scripts.js, and the classes folder (containing TaskManager.js, ConfirmModal.js, and InputModal.js), are in the correct structure.
    Open index.html in any modern browser to start using the application.

How to Use
    Add a New Task:
        Type the description of the task in the input field and press "Enter" or click the "+" button.

    View Active and Completed Tasks:
        Active tasks will show under the "Active" section.
        Completed tasks will show under the "Completed" section.

    Complete, Undo, or Update Tasks:
        Mark a task as complete by clicking the checkmark icon.
        Undo a completed task by clicking the undo icon (arrow).
        Update a task by clicking the pencil icon and typing the new task description.

    Delete a Task:
        Click the trash icon to delete a task. A confirmation prompt will appear before deletion.

File Structure
    index.html: The main HTML file containing the structure of the app.
    scripts.js: The main JavaScript file handling all functionalities like task creation, update, delete, and task rendering.
    classes/TaskManager.js: Contains the TaskManager class which manages all task-related operations.
    classes/ConfirmModal.js: Handles the confirmation modal logic for task deletion.
    classes/InputModal.js: Handles the modal for updating task descriptions.

Browser Support
    The app works on all modern browsers (Chrome, Firefox, Safari, Edge). As it uses localStorage, it requires browsers that support this feature.

License
    This project is free and open-source. Feel free to modify or use it as needed.