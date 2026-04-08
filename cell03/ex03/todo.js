// todo.js

const FT_LIST_ID = 'ft_list';
const COOKIE_NAME = 'todoList';

// Load todos from cookies when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadTodos();
    
    // Add event listener to "New" button
    const newBtn = document.getElementById('new-btn');
    newBtn.addEventListener('click', createNewTodo);
});

// Create a new todo
function createNewTodo() {
    const task = prompt("What needs to be done?");
    
    if (task === null) return; // User clicked Cancel
    
    const trimmedTask = task.trim();
    if (trimmedTask === '') {
        alert("Task cannot be empty!");
        return;
    }
    
    addTodoToList(trimmedTask);
    saveTodos();
}

// Add todo element to the top of the list
function addTodoToList(text) {
    const ftList = document.getElementById(FT_LIST_ID);
    
    const todoDiv = document.createElement('div');
    todoDiv.className = 'todo-item';
    todoDiv.textContent = text;
    
    // Click to delete
    todoDiv.addEventListener('click', () => {
        if (confirm(`Delete this task?\n\n"${text}"`)) {
            todoDiv.remove();
            saveTodos();
            
            // Show empty message if no todos left
            if (ftList.children.length === 0) {
                showEmptyMessage();
            }
        }
    });
    
    // Insert at the top
    if (ftList.firstChild) {
        ftList.insertBefore(todoDiv, ftList.firstChild);
    } else {
        ftList.appendChild(todoDiv);
    }
    
    // Remove empty message if it exists
    const emptyMsg = document.querySelector('.empty-message');
    if (emptyMsg) emptyMsg.remove();
}

// Save todos to cookie
function saveTodos() {
    const ftList = document.getElementById(FT_LIST_ID);
    const todos = [];
    
    Array.from(ftList.children).forEach(todo => {
        if (todo.classList.contains('todo-item')) {
            todos.push(todo.textContent);
        }
    });
    
    // Save as cookie (expires in 30 days)
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30);
    
    document.cookie = `${COOKIE_NAME}=${encodeURIComponent(JSON.stringify(todos))}; expires=${expiryDate.toUTCString()}; path=/`;
}

// Load todos from cookie
function loadTodos() {
    const ftList = document.getElementById(FT_LIST_ID);
    ftList.innerHTML = ''; // Clear existing content
    
    const cookieValue = getCookie(COOKIE_NAME);
    
    if (cookieValue) {
        try {
            const todos = JSON.parse(decodeURIComponent(cookieValue));
            
            // Add todos in reverse order so newest appears on top
            for (let i = todos.length - 1; i >= 0; i--) {
                addTodoToList(todos[i]);
            }
        } catch (e) {
            console.error("Failed to load todos from cookie");
        }
    }
    
    // Show empty message if no todos
    if (ftList.children.length === 0) {
        showEmptyMessage();
    }
}

// Get cookie by name
function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

// Show empty state message
function showEmptyMessage() {
    const ftList = document.getElementById(FT_LIST_ID);
    
    const emptyDiv = document.createElement('div');
    emptyDiv.className = 'empty-message';
    emptyDiv.textContent = "No tasks yet. Click 'New' to add one!";
    
    ftList.appendChild(emptyDiv);
}