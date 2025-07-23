

const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");



function addTask() {
   if(inputBox.value === ''){
        alert("You must write something!");
   } 
   else{
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";  
    li.appendChild(span);
   }

   inputBox.value = "";
   saveData();
}

listContainer.addEventListener("click", function(e){
   if(e.target.tagName === "LI"){
      e.target.classList.toggle("checked");
      saveData()
   }
   else if(e.target.tagName === "SPAN"){
      e.target.parentElement.remove();  
      saveData(); 
   }
}, false)

function saveData(){
   localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(){
   listContainer.innerHTML = localStorage.getItem("data");
}

showTask()

inputBox.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});






// ADD THIS TO THE END OF YOUR script.js file:

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
document.addEventListener('dblclick', function() {
    if (!document.fullscreenElement) {
        // Enter fullscreen
        document.documentElement.requestFullscreen().catch(err => {
            console.log(`Error attempting to enable fullscreen: ${err.message}`);
        });
    } else {
        // Exit fullscreen
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