$(document).ready(function() {

    const $ftList = $('#ft_list');

    // Load saved tasks on page load
    loadTasksFromCookie();

    // "New" button click
    $('#newBtn').on('click', function() {
        const taskText = prompt("New TO DO:");

        if (taskText && taskText.trim() !== "") {
            addTaskToTop(taskText.trim());
        }
    });

    // Click on any task to delete it
    $ftList.on('click', '.todo-item', function() {
        if (confirm("Do you want to remove this TO DO?")) {
            $(this).remove();
            saveTasksToCookie();
        }
    });

    // Add new task at the TOP of the list
    function addTaskToTop(text) {
        const $task = $('<div>')
            .addClass('todo-item')
            .text(text);

        $ftList.prepend($task);   // Put at the top
        saveTasksToCookie();
    }

    // Save current list to cookie
    function saveTasksToCookie() {
        const tasks = [];

        $('.todo-item').each(function() {
            tasks.push($(this).text());
        });

        // Cookie expires in 7 days
        document.cookie = `todoList=${JSON.stringify(tasks)}; path=/; max-age=${7 * 24 * 60 * 60}`;
    }

    // Load tasks from cookie
    function loadTasksFromCookie() {
        const cookies = document.cookie.split(';');

        for (let cookie of cookies) {
            const [name, value] = cookie.trim().split('=');

            if (name === 'todoList' && value) {
                try {
                    const savedTasks = JSON.parse(value);

                    // Add tasks in reverse so newest stays on top
                    for (let i = savedTasks.length - 1; i >= 0; i--) {
                        addTaskToTop(savedTasks[i]);
                    }
                } catch (e) {
                    console.warn("Invalid todo cookie data");
                }
                return;
            }
        }
    }

});