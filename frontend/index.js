// declare any global variables
let currentUser;

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
