

const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");



function makeTaskEditable(taskElement) {
    const currentText = taskElement.firstChild.textContent;
    
    // Create input element
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;
    input.className = 'edit-input';
    
    // Replace task text with input
    taskElement.firstChild.textContent = '';
    taskElement.insertBefore(input, taskElement.querySelector('span'));
    
    // Focus and select all text
    input.focus();
    input.select();
    
    // Handle saving the edit
    function saveEdit() {
        const newText = input.value.trim();
        if (newText === '') {
            alert("Task cannot be empty!");
            input.focus();
            return;
        }
        
        // Remove input and restore text
        input.remove();
        taskElement.firstChild.textContent = newText;
        saveData();
    }
    
    // Save on Enter key
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            saveEdit();
        }
    });

    input.addEventListener('blur', saveEdit);

        input.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            input.remove();
            taskElement.firstChild.textContent = currentText;
        }
    });
}

function addTask() {
    if(inputBox.value === ''){
        alert("You must write something!");
    } 
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        li.setAttribute("draggable", "true");
        addDragEvents(li);
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";  
        li.appendChild(span);
    }

    inputBox.value = "";
    saveData();
    toggleClearButton();
}

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        // Check if we're not clicking on the edit input
        if (!e.target.querySelector('.edit-input')) {
            e.target.classList.toggle("checked");
            saveData();
        }
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();  
        saveData(); 
        toggleClearButton();
    }
}, false);


function saveData(){
   localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(){
   listContainer.innerHTML = localStorage.getItem("data");
    Array.from(listContainer.children).forEach(item => {
        if (item.tagName === "LI") {
            item.setAttribute("draggable", "true");
            addDragEvents(item);
            
        }
    });
    toggleClearButton();
}

showTask()


const clearAllBtn = document.getElementById('clear-all-btn');

clearAllBtn.addEventListener('click', function() {
    if (confirm("Are you sure you want to clear all tasks? This cannot be undone.")) {
        listContainer.innerHTML = "";
        saveData();
        toggleClearButton(); // This line is new
    }
});


inputBox.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});






let draggedItem = null;

function addDragEvents(item) {
    item.addEventListener("dragstart", function () {
        draggedItem = item;
        setTimeout(() => item.style.display = "none", 0);
    });

    item.addEventListener("dragend", function () {
        setTimeout(() => {
            draggedItem.style.display = "block";
            draggedItem = null;
        }, 0);
        saveData();
    });

    item.addEventListener("dragover", function (e) {
        e.preventDefault();
    });

    item.addEventListener("dragenter", function (e) {
        e.preventDefault();
        this.style.borderTop = "2px dashed #aaa";
    });

    item.addEventListener("dragleave", function () {
        this.style.borderTop = "";
    });

    item.addEventListener("drop", function () {
        this.style.borderTop = "";
        listContainer.insertBefore(draggedItem, this);
    });
}



function toggleClearButton() {
    const clearRow = document.querySelector('.clear-row');
    if (listContainer.children.length > 0) {
        clearRow.classList.add('show');
    } else {
        clearRow.classList.remove('show');
    }
}

// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', function() {
    body.classList.toggle('dark-mode');
    
    // Update button icon and save preference
    if (body.classList.contains('dark-mode')) {
        themeToggle.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
});



// ADD THIS TO THE END OF YOUR script.js file:

// Fullscreen functionality on double-click
document.addEventListener('dblclick', function(e) {
    // Check if double-click is on a task item
    if (e.target.tagName === 'LI' && e.target.parentElement.id === 'list-container') {
        e.preventDefault(); // Prevent fullscreen
        makeTaskEditable(e.target);
        return;
    }
    
    // Original fullscreen functionality for other areas
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log(`Error attempting to enable fullscreen: ${err.message}`);
        });
    } else {
        document.exitFullscreen().catch(err => {
            console.log(`Error attempting to exit fullscreen: ${err.message}`);
        });
    }
});

// Optional: Add escape key to exit fullscreen
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && document.fullscreenElement) {
        document.exitFullscreen();
    }
});