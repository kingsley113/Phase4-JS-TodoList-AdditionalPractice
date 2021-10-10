// declare any global variables
let currentUser = null;
let activeProject = null;
// Page Elements
let userModal;
let btn;
let closeBtn;
// User Form
let userList;
let username;

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
        incompleteTaskArr.push(task);
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
  btn = document.getElementById("open-modal");
  closeBtn = document.getElementById("close-user-modal");

  // User Form elements
  userList = document.getElementById("existing-users");
  username = document.getElementById("username-input");

  initialize();
});

function initialize() {
  if (currentUser === null) {
    showUserModal();
  }
}

function showUserModal() {
  // TODO: make this trigger without button, keep button for debug only
  btn.addEventListener("click", () => {
    userModal.style.display = "block";
  });

  // TODO: User shouldnt be able to close window without entering name or selecting user.
  closeBtn.addEventListener("click", () => {
    userModal.style.display = "none";
    console.log("closeBtn clicked");
  });

  window.addEventListener("click", (event) => {
    if (event.target == userModal) {
      userModal.style.display = "none";
    }
  });

  // userModal.style.display = "block";
  populateUserFormList();
  const userForm = document.getElementById("user-form");
  userForm.addEventListener("submit", (event) => {
    handleUserFormSubmit(event);
  });
  // TODO: create new user
  // TODO: prompt for user to enter new name or select from existing users
}

function populateUserFormList() {
  // fetch existing users
  const users = fetchUsers();

  // create option elements
  for (const user of users) {
    const option = document.createElement("option");
    option.id = user.id;
    option.value = user.id;
    option.innerText = user.username;

    // append option elements
    userList.appendChild(option);
  }
}

function fetchUsers() {
  // TODO: setup fetch function
  // TODO: setup API route to return only username, id,
}

function handleUserFormSubmit(event) {
  event.preventDefault();
  if (username.innerText !== "") {
    // TODO: submit new user to API
    createNewUser(username.innerText);
  } else {
    // TODO: submit selected existing user to API
    loadExistingUser(document.getElementById("existing-users").value);
  }
}

function createNewUser(username) {
  const formData = {
    username: username,
  };

  const configurationObject = {
    method: "POST",
    headers: {
      "Content-Type": "application-json",
      accept: "application/json",
    },
    Body: JSON.stringify({ response: formData }),
  };

  fetch(`http://localhost:3000/users/new/${username}`, configurationObject)
    .then((response) => {
      return response.json();
    })
    .then((object) => {
      setCurrentUser(object);
    });
}

function setCurrentUser(userObject) {
  // TODO: Implement this function
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
