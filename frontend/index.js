// Task Yeeter frontend JS Script

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

// Task Form
let taskForm;
let taskName;

// Project Form
let projectForm;
let projectName;

// declare classes
class Task {
  constructor(
    name,
    description,
    project = activeProject,
    priority = "Low",
    dueDate,
    complete = false,
    id
  ) {
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

  // Task form elements
  taskForm = document.getElementById("new-task-form");
  taskName = document.getElementById("new-task-name");

  // Project form elements
  projectForm = document.getElementById("new-project-form");
  projectName = document.getElementById("new-project-name");

  initialize();
});

function initialize() {
  if (currentUser === null) {
    showUserModal();
  }
  // Switch User button
  btn.addEventListener("click", () => {
    userModal.style.display = "block";
    showUserModal();
  });

  taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    createNewTask(taskName.value);
  });

  projectForm.addEventListener("submit", (event) => {
    event.preventDefault();
    createNewProject(projectName.value);
  });
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
  // remove existing to not duplicate list
  const userOptions = document.querySelectorAll(".user-option");
  for (const user of userOptions) {
    user.remove();
  }
  // create option elements
  for (const user of users) {
    const option = document.createElement("option");
    option.id = user.id;
    option.value = user.id;
    option.innerText = user.username;
    option.classList.add("user-option");

    // append option elements
    userList.appendChild(option);
  }
}

function handleUserFormSubmit(event) {
  event.preventDefault();
  if (username.value !== "") {
    createNewUser(username.value);
  } else {
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
  if (currentUser.projects.length !== 0) {
    setActiveProject(currentUser.projects[0]);
  }
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
  // remove existing list elements
  const projects = document.querySelectorAll(".project-li");
  for (const project of projects) {
    project.remove();
  }
  // create new elements
  const projectList = document.getElementById("project-sidebar-list");
  for (const project of currentUser.projects) {
    projectList.appendChild(buildProjectLiElement(project));
  }
}

function buildProjectLiElement(project) {
  let item = document.createElement("li");
  let text = document.createElement("h3");

  item.id = `project-${project.id}`;
  item.classList.add("project-li");

  text.innerText = project.name;
  item.appendChild(text);

  item.addEventListener("click", () => {
    setActiveProject(project);
  });
  return item;
}

function setActiveProject(project) {
  activeProject = project;
  fetchProjectTasks.call(activeProject);
  // Remove the "active" class tag
  for (const project of document.querySelectorAll(".project-li")) {
    project.classList.remove("active");
  }

  // Add the "active" class tag on currently active project
  const activatedProject = document.getElementById(`project-${project.id}`);
  activatedProject.classList.add("active");
}

function renderTaskList(taskArr) {
  // remove existing task elements
  const existTasks = document.querySelectorAll(".task-item");
  for (const taskEl of existTasks) {
    taskEl.remove();
  }
  const taskList = document.getElementById("task-items-list");
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
      renderTaskList(object.tasks);
      this.tasks = object.tasks;
    });
}

function buildTaskElement(task) {
  // create li element
  const listItem = document.createElement("li");
  listItem.classList.add("task-item");
  listItem.id = `task-${task.id}`;
  listItem.addEventListener("click", () => {});
  // create name text element
  const text = document.createElement("span");
  text.classList.add("task-text");
  text.innerText = task.name;

  if (task.complete === false) {
    text.classList.remove("complete");
  } else {
    text.classList.add("complete");
  }

  listItem.appendChild(text);

  // Create delete task button
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("del-button");
  deleteBtn.innerHTML = "Yeet";
  listItem.appendChild(deleteBtn);
  deleteBtn.addEventListener("click", () => {
    deleteTask(task);
  });

  // create edit btn element
  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-button");
  editBtn.innerHTML = "Edit Task";
  listItem.appendChild(editBtn);
  editBtn.addEventListener("click", () => {
    showEditModal(task);
  });

  // Create complete task button
  const completeBtn = document.createElement("button");
  completeBtn.classList.add("compl-button");
  completeBtn.innerHTML = "Complete";
  listItem.appendChild(completeBtn);
  completeBtn.addEventListener("click", () => {
    completeTask(task, text);
  });

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
  const formData = {
    id: task.id,
    name: task.name,
    description: task.description,
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
      renderTaskList(activeProject.tasks);
      closeTaskModal();
    });
}

function closeTaskModal() {
  taskModal.style.display = "none";
}

function createNewTask(name) {
  const task = new Task(name);
  task.project = activeProject;
  activeProject.tasks.push(task);

  saveNewTaskToAPI(task);
}

function saveNewTaskToAPI(task) {
  const formData = {
    name: task.name,
    priority: task.priority,
    project_id: activeProject.id,
    complete: task.complete,
  };
  const configurationObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ task: formData }),
  };

  fetch(`http://localhost:3000/tasks`, configurationObject)
    .then((response) => {
      return response.json();
    })
    .then((object) => {
      task.id = object.id;
      renderTaskList(activeProject.tasks);
    });
}

function completeTask(task, text) {
  if (task.complete === false) {
    task.complete = true;
    text.classList.add("complete");
  } else {
    task.complete = false;
    text.classList.remove("complete");
  }
  // update on API
  submitTaskToAPI(task);
}

function deleteTask(task) {
  const formData = {
    name: task.name,
    id: task.id,
  };

  const configurationObject = {
    method: "DELETE",
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
      // re-render list after fetch to update
      deleteJsTaskObject(task);
      renderTaskList(activeProject.tasks);
      alert(object.message);
    })
    .catch((errors) => {
      alert(errors);
    });
}

function deleteJsTaskObject(task) {
  activeProject.tasks;
  // delete element from JS frontend
  document.getElementById(`task-${task.id}`).remove();
  const newTaskArr = activeProject.tasks.filter((value) => {
    return value !== task;
  });
  activeProject.tasks = newTaskArr;
}

function createNewProject(name) {
  const project = new Project(name);
  project.user = currentUser;

  saveNewProjectToAPI(project);
}

function saveNewProjectToAPI(project) {
  const formData = {
    name: project.name,
    user_id: currentUser.id,
  };
  const configurationObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ project: formData }),
  };

  fetch(`http://localhost:3000/projects`, configurationObject)
    .then((response) => {
      return response.json();
    })
    .then((object) => {
      project.id = object.id;
      addNewProjectToCurrentUser(project);
      // set the current project to new project
      renderProjectList();
      setActiveProject(project);
    });
}

function addNewProjectToCurrentUser(project) {
  currentUser.projects.push(project);
}
