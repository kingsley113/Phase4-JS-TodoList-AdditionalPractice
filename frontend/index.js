// declare any global variables

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
  constructor(name, description, user) {
    this.name = name;
    this.description = description;
    this.user = user;
  }
}

class User {
  constructor(name) {
    this._name = name;
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

shortcut buttons on each task line:
	mark complete
	schedule
	edit
*/
