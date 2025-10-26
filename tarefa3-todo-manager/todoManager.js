/**
 * @typedef {'todo' | 'in_progress' | 'done'} TaskStatus
 * @typedef {'low' | 'medium' | 'high'} TaskPriority
 */

/**
 * @typedef {Object} CreateTaskInput
 * @property {number} id
 * @property {string} title
 * @property {string} description
 * @property {TaskPriority} priority
 */

class Task {
  /** @type {number} */
  id = 1;
  /** @type {TaskStatus[]} */
  static validStatuses = ["todo", "in_progress", "done"];
  /** @type {TaskPriority[]} */
  static validPriorities = ["low", "medium", "high"];

  /**
   * Create a new Task
   * @param {CreateTaskInput} input
   */
  constructor({ id, title, description, priority }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = "todo";
    this.code = `TASK-${this.id.toString().padStart(4, "0")}`;
    this.priority = priority;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.completedAt = null;
  }

  /** @param {TaskStatus[]} [status] */
  static validateStatus(status) {
    if (!this.validStatuses.includes(status))
      throw new Error(`Status inválido: ${status}`);
  }

  /** @param {TaskPriority[]} [priority] */
  static validatePriority(priority) {
    if (!this.validPriorities.includes(priority))
      throw new Error(`Prioridade inválida: ${priority}`);
  }
}

class TodoService {
  /** @type {Task[]} */
  todoList = [];

  /** @type {number} */
  nextId = 1;

  /**
   * Find all tasks with optional filters
   * @param {Object} filters
   * @param {TaskStatus} [filters.status]
   * @param {TaskPriority} [filters.priority]
   * @returns {Task[]}
   */
  findAll({ status, priority, title } = {}) {
    if (status) Task.validateStatus(status);
    if (priority) Task.validatePriority(priority);

    return this.todoList.filter((task) => {
      const statusMatch = status ? task.status === status : true;
      const priorityMatch = priority ? task.priority === priority : true;
      return statusMatch && priorityMatch;
    });
  }

  /**
   * Create a new task and add it to the todo list
   * @param {CreateTaskInput} input
   * @return {Task}
   */
  create({ title, description, priority }) {
    const newTask = new Task({
      id: this.nextId++,
      title,
      description,
      priority,
    });
    this.todoList.push(newTask);
    return newTask;
  }

  /**
   *  Update an existing task
   *  @param {number} id
   *  @param {Partial<CreateTaskInput>} updates
   *  @return {Task|null}
   */
  update(id, newData) {
    const index = this.todoList.findIndex((t) => t.id === id);
    if (index === -1) return null;

    if (newData.priority) Task.validatePriority(newData.priority);
    if (newData.status) Task.validateStatus(newData.status);

    Object.assign(this.todoList[index], newData, { updatedAt: new Date() });

    return this.todoList[index];
  }

  /**
   *  Delete a task by its ID
   *  @param {number} id
   *  @return {boolean}
   */
  delete(id) {
    const index = this.todoList.findIndex((t) => t.id === id);
    if (index === -1) return false;

    this.todoList.splice(index, 1);
    return true;
  }

  /**
   * Update the status of a task
   * @param {number} id
   * @param {TaskStatus} status
   * @return {Task|null}
   */
  updateTaskStatus(id, status) {
    Task.validateStatus(status);

    const task = this.todoList.find((t) => t.id === id);
    if (!task) return null;

    if (status === "done") {
      task.completedAt = new Date();
    }

    task.status = status;
    task.updatedAt = new Date();
    return task;
  }

  /**
   * Count tasks by their status
   * @return {Object}
   */
  countTasksByStatus() {
    return Task.validStatuses.reduce((acc, status) => {
      acc[status] = this.todoList.filter(
        (task) => task.status === status
      ).length;
      return acc;
    }, {});
  }

  /**
   * find a task by its unique code
   * @param {string} code
   * @return {Task|null}
   */
  findByCode(code) {
    return this.todoList.find((task) => task.code === code) || null;
  }

  /**
   *  Find tasks by partial title match
   *  @param {string} title
   *  @return {Task[]}
   */
  findByTitle(title) {
    if (!title) return [];
    const titleLower = title.toLowerCase();
    return this.todoList.filter((task) =>
      task.title.toLowerCase().includes(titleLower)
    );
  }
}

module.exports = { Task, TodoService };
