// declare any global variables
let currentUser;
// Page Elements
let userModal;
let btn;
let closeBtn;

// declare classes
class Task {
  constructor(name, description, project, priority, dueDate, complete) {
    this.name = name;
    this.description = description;
    this.project = project;
    this.priority = priority;
    this.dueDate = dueDate;
    this.complete = complete;
  }
}

class Project {
  constructor(name, description, user, tasks) {
    this.name = name;
    this.description = description;
    this.user = user;
    this.tasks = tasks;
  }

  // function for # of incomplete tasks
}

class User {
  constructor(name, projects) {
    this._name = name;
    this.projects = projects;
  }

  name() {
    return this._name;
  }
}

// Identify page elements
document.addEventListener("DOMContentLoaded", (event) => {
	userModal = document.getElementById("user-modal");
	btn = document.getElementById("open-modal")
	closeBtn = document.getElementById("close-user-modal")

	initialize();	
})

function initialize() {
	// TODO: move this probably to a separate function and trigger if currentUser = null
	btn.addEventListener("click", () => {
		userModal.style.display = "block";
	})
		
	closeBtn.addEventListener("click", () => {
		userModal.style.display = "none";
		console.log("closeBtn clicked")
	})

	window.addEventListener("click", (event) => {
		if (event.target == userModal) {
			userModal.style.display = "none";
		};
	})
}

/* 
Things we need to do:
submit new task
create new user
fetch list of tasks
fetch list of projects
display list of tasks
show modal window when editing task
save edited task
create new project
delete task
set task priority

fetch user set of data
promp for user to enter new name or select from existing users

shortcut buttons on each task line:
	mark complete
	schedule
	edit
*/
