// declare any global variables
let currentUser = null;
let activeProject = null;
// Page Elements
let userModal;
let taskModal;
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
  taskModal = document.getElementById("task-modal");
  btn = document.getElementById("open-modal");
  // closeBtn = document.getElementById("close-user-modal");

  // User Form elements
  userList = document.getElementById("existing-users");
  username = document.getElementById("username-input");

  initialize();
});

function initialize() {
  console.log(currentUser);
  if (currentUser === null) {
    showUserModal();
  }
  // TODO: make this trigger without button, keep button for debug only
  // btn.addEventListener("click", () => {
  //   userModal.style.display = "block";
  //   showUserModal();
  // });
}

function showUserModal() {
  userModal.style.display = "block";

  fetchUsers();
  const userForm = document.getElementById("user-form");
  userForm.addEventListener("submit", (event) => {
    handleUserFormSubmit(event);
  });
}

function fetchUsers() {
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
  // console.log(username.value);
  if (username.value !== "") {
    // console.log("creating a new user");
    createNewUser(username.value);
  } else {
    // console.log(
    // `loading user ${document.getElementById("existing-users").value}`
    // );
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
  // console.log(currentUser.projects[0]);
  setActiveProject(currentUser.projects[0]);
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
  fetchProjectTasks.call(activeProject);
  // renderTaskList(activeProject);
}

function renderTaskList(taskArr) {
  // remove existing task elements
  const existTasks = document.querySelectorAll(".task-item");
  for (const taskEl of existTasks) {
    taskEl.remove();
  }
  // console.log(projectObject);
  const taskList = document.getElementById("task-items-list");
  // const tasks = fetchProjectTasks.call(activeProject);
  // console.log(taskArr);
  for (const task of taskArr) {
    taskList.appendChild(buildTaskElement(task));
  }
}

function fetchProjectTasks() {
  fetch(`http://localhost:3000/projects/${this.id}`)
    .then((response) => {
      return response.json();
    })
    .then((object) => {
      // console.log("from fetch: " + object.tasks);
      renderTaskList(object.tasks);
    });
}

function buildTaskElement(task) {
  // create li element
  const listItem = document.createElement("li");
  listItem.classList.add("task-item");
  listItem.id = `task-${task.id}`;
  listItem.addEventListener("click", () => {
    // console.log("you clicked a task!");
  });
  // create name text element
  const text = document.createElement("span");
  text.classList.add("task-text");
  text.innerText = task.name;
  listItem.appendChild(text);
  // create edit btn element
  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-button");
  editBtn.innerHTML = "Edit Task";
  listItem.appendChild(editBtn);
  editBtn.addEventListener("click", () => {
    showEditModal(task);
  });
  // TODO: create complete btn element
  // TODO: append child elements
  // return assembled li element
  return listItem;
}

function showEditModal(taskObject) {
  // Populate edit form with existing data
  let taskName = document.getElementById("task-name");
  let taskDesc = document.getElementById("task-desc");
  let taskPriority = document.getElementById("task-priority");
  taskName.value = taskObject.name;
  taskDesc.innerText = taskObject.description;
  taskPriority.value = taskObject.priority;
  // Show the modal window
  taskModal.style.display = "block";
  const taskForm = document.getElementById("edit-task-form");
  // Add event listener for form
  taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    // update local task object
    taskObject.name = taskName.value;
    taskObject.description = taskDesc.value;
    taskObject.priority = taskPriority.value;
    // Submit fetch request to update object on backend
    submitTaskToAPI(taskObject);
  });
}

function submitTaskToAPI(task) {
  // TODO: implement this
  // console.log(task);

  // update API object in database
  const formData = {
    id: task.id,
    name: task.name,
    description: task.description,
    // project_id: task.project.id,
    priority: task.priority,
    dueDate: task.dueDate,
    complete: task.complete,
  };

  const configurationObject = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ task: formData }),
  };

  fetch(`http://localhost:3000/tasks/${task.id}`, configurationObject)
    .then((response) => {
      return response.json();
    })
    .then((object) => {
      console.log(object);
      // updateTaskItem(object)
      // console.log(activeProject);
      // renderTaskList(activeProject.tasks);
      closeTaskModal();
    });
}

function closeTaskModal() {
  taskModal.style.display = "none";
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


shortcut buttons on each task line:
	mark complete
	schedule
	edit
*/

// TODO:
// stop user list from duplicating rows when switching users
