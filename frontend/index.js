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
  constructor(name, description, project, priority, dueDate, complete, id) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.project = project;
    this.priority = priority;
    this.dueDate = dueDate;
    this.complete = complete;
  }
}

class Project {
  constructor(name, description, user, tasks, id) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.user = user;
    this.tasks = tasks;
  }

  // function for # of incomplete tasks
  incompleteTasks() {
    let incompleteTaskArr = [];
    if (this.tasks) {
      for (const task of this.tasks) {
        if (task.complete === false) {
          incompleteTaskArr.push(task);
        }
      }
    }
    return incompleteTaskArr;
  }
}

class User {
  constructor(name, projects, id) {
    this.id = id;
    this.name = name;
    this.projects = projects;
  }

  // name() {
  //   return this._name;
  // }

  // setName(name) {
  //   this._name = name;
  // }
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
  currentUser = new User(
    userObject.username,
    buildProjects(userObject.projects),
    userObject.id
  );

  updateFooter();
  renderProjectList();
}

function updateFooter() {
  document.getElementById(
    "current-user-footer-label"
  ).innerText = `Current User: ${currentUser.name}`;
}

function hideUserModal() {
  userModal.style.display = "none";
}

function buildProjects(projArray) {
  let projects = [];
  for (const project of projArray) {
    let proj = new Project(
      project.name,
      project.description,
      project.user_id,
      project.tasks,
      project.id
    );
    projects.push(proj);
  }
  return projects;
}

function renderProjectList() {
  const projectList = document.getElementById("project-sidebar-list");

  for (const project of currentUser.projects) {
    projectList.appendChild(buildProjectLiElement(project));
  }
}

function buildProjectLiElement(project) {
  let item = document.createElement("li");
  let text = document.createElement("p");
  let unfinishedTaskText = document.createElement("span");

  item.id = `project-${project.id}`;
  item.classList.add("project-li");

  text.innerText = project.name;
  item.appendChild(text);

  unfinishedTaskText.innerText = project.incompleteTasks().length;
  item.appendChild(unfinishedTaskText);

  item.addEventListener("click", () => {
    setActiveProject(project);
  });
  return item;
}

function setActiveProject(project) {
  activeProject = project;
  renderTaskList(project);
}

function renderTaskList(projectObject) {}
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


shortcut buttons on each task line:
	mark complete
	schedule
	edit
*/

// TODO:
// stop user list from duplicating rows when switching users
