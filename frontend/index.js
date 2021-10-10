// declare any global variables
let currentUser = null;
let activeProject = null;
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
	incompleteTasks() {
		let incompleteTaskArr = [];
		for (const task of this.tasks) {
			if (task.complete === false) {
				incompleteTaskArr.push(task)
			} 
		}
		return incompleteTaskArr;
	}
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
	if(currentUser === null) {
		showUserModal();
	}
}

function showUserModal() {
	// TODO: make this trigger without button, keep button for debug only
	btn.addEventListener("click", () => {
		userModal.style.display = "block";
	})
		
	// TODO: User shouldnt be able to close window without entering name or selecting user.
	closeBtn.addEventListener("click", () => {
		userModal.style.display = "none";
		console.log("closeBtn clicked")
	})
	
	window.addEventListener("click", (event) => {
		if (event.target == userModal) {
			userModal.style.display = "none";
		};
	})
	// TODO: create new user
	// TODO: promp for user to enter new name or select from existing users
}
/* 
Things we need to do:
submit new task
fetch list of tasks
fetch list of projects
display list of tasks
show modal window when editing task
save edited task
create new project
delete task
set task priority

fetch user set of data

shortcut buttons on each task line:
	mark complete
	schedule
	edit
*/
