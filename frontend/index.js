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
let users = [];

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

  setName(name) {
    this._name = name;
  }
}

// Identify page elements
document.addEventListener("DOMContentLoaded", (event) => {
  userModal = document.getElementById("user-modal");
  btn = document.getElementById("open-modal");
  // closeBtn = document.getElementById("close-user-modal");

  // User Form elements
  userList = document.getElementById("existing-users");
  username = document.getElementById("username-input");

  initialize();
});

function initialize() {
  // if (currentUser === null) {
  //   showUserModal();
  // }
  // TODO: make this trigger without button, keep button for debug only
  btn.addEventListener("click", () => {
    userModal.style.display = "block";
    showUserModal();
  });
}

function showUserModal() {
  // TODO: User shouldnt be able to close window without entering name or selecting user.
  // closeBtn.addEventListener("click", () => {
  //   userModal.style.display = "none";
  //   console.log("closeBtn clicked");
  // });

  // window.addEventListener("click", (event) => {
  //   if (event.target == userModal) {
  //     userModal.style.display = "none";
  //   }
  // });

  // userModal.style.display = "block";
  // populateUserFormList();
  fetchUsers();
  const userForm = document.getElementById("user-form");
  userForm.addEventListener("submit", (event) => {
    handleUserFormSubmit(event);
  });
}

function fetchUsers() {
  // TODO: setup fetch function
  fetch(`http://localhost:3000/users`)
    .then((response) => {
      return response.json();
    })
    .then((object) => {
      populateUserFormList(object);
    })
    .catch((error) => {
      alert("woops, honey badger didnt give a s$!& and caused an error");
    });
  // TODO: setup API route to return only username, id,
}

function populateUserFormList(users) {
  // fetch existing users
  // users = fetchUsers();
  // console.log(users);
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

function handleUserFormSubmit(event) {
  event.preventDefault();
  console.log(username.value);
  if (username.value !== "") {
    console.log("creating a new user");
    createNewUser(username.value);
  } else {
    console.log(
      `loading user ${document.getElementById("existing-users").value}`
    );
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
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ user: formData }),
  };

  fetch(`http://localhost:3000/users`, configurationObject)
    .then((response) => {
      return response.json();
    })
    .then((object) => {
      setCurrentUser(object);
      hideUserModal();
    });
}

function loadExistingUser(id) {
  fetch(`http://localhost:3000/users/${id}`)
    .then((response) => {
      return response.json();
    })
    .then((object) => {
      setCurrentUser(object);
      hideUserModal();
    });
}

function setCurrentUser(userObject) {
  console.log(userObject);
  currentUser = new User();
  currentUser.setName(userObject.username);
  currentUser.projects = userObject.projects;
  // TODO: Will probably need to call a 'build projects' function or something on this to create project instances

  updateFooter();
}

function updateFooter() {
  // TODO: low on the list but update the current user shown on the footer
  document.getElementById("current-user-footer-label").innerText =
    currentUser.name();
}

function hideUserModal() {
  userModal.style.display = "none";
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

// TODO:
// stop user list from duplicating rows when switching users
