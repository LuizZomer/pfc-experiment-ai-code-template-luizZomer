const { describe, test, expect, beforeEach } = require("@jest/globals");
const { TodoService } = require("./todoManager.js");

let service;

beforeEach(() => {
  service = new TodoService();
});

describe("Sistema de Gerenciamento de Tarefas", () => {
  test("deve criar uma tarefa com dados básicos e código Jira", () => {
    const task = service.create({
      title: "Tarefa 1",
      description: "Desc",
      priority: "medium",
    });
    expect(task).toBeDefined();
    expect(task.id).toBe(1);
    expect(task.code).toBe("TASK-0001");
    expect(task.status).toBe("todo");
    expect(task.createdAt).toBeInstanceOf(Date);
    expect(task.updatedAt).toBeInstanceOf(Date);
  });

  test("deve listar todas as tarefas criadas", () => {
    service.create({ title: "T1", description: "", priority: "low" });
    service.create({ title: "T2", description: "", priority: "high" });

    const all = service.findAll();
    expect(all.length).toBe(2);
    expect(all[0].title).toBe("T1");
    expect(all[1].title).toBe("T2");
  });

  test("deve atualizar dados de uma tarefa existente", () => {
    const task = service.create({
      title: "Old",
      description: "",
      priority: "low",
    });
    const updated = service.update(task.id, { title: "New", priority: "high" });

    expect(updated.title).toBe("New");
    expect(updated.priority).toBe("high");
    expect(updated.updatedAt).not.toBe(task.createdAt);
  });

  test("deve remover uma tarefa por ID", () => {
    const task = service.create({
      title: "Task",
      description: "",
      priority: "low",
    });
    const result = service.delete(task.id);

    expect(result).toBe(true);
    expect(service.todoList.length).toBe(0);

    const notFound = service.delete(999);
    expect(notFound).toBe(false);
  });

  test("deve alterar status da tarefa e definir completedAt", () => {
    const task = service.create({
      title: "Task",
      description: "",
      priority: "medium",
    });

    const updated = service.updateTaskStatus(task.id, "in_progress");
    expect(updated.status).toBe("in_progress");
    expect(updated.completedAt).toBeNull();

    const doneTask = service.updateTaskStatus(task.id, "done");
    expect(doneTask.status).toBe("done");
    expect(doneTask.completedAt).toBeInstanceOf(Date);
  });

  test("deve filtrar tarefas por status TODO", () => {
    service.create({ title: "T1", description: "", priority: "low" });
    service.create({ title: "T2", description: "", priority: "medium" });
    service.updateTaskStatus(2, "done");

    const todos = service.findAll({ status: "todo" });
    expect(todos.length).toBe(1);
    expect(todos[0].status).toBe("todo");
  });

  test("deve filtrar tarefas por prioridade HIGH", () => {
    service.create({ title: "T1", description: "", priority: "high" });
    service.create({ title: "T2", description: "", priority: "low" });

    const highTasks = service.findAll({ priority: "high" });
    expect(highTasks.length).toBe(1);
    expect(highTasks[0].priority).toBe("high");
  });

  test("deve buscar tarefas por título", () => {
    service.create({ title: "Hello World", description: "", priority: "low" });
    service.create({
      title: "Another Task",
      description: "",
      priority: "medium",
    });

    const result = service.findByTitle("hello");
    expect(result.length).toBe(1);
    expect(result[0].title).toBe("Hello World");
  });

  test("deve contar tarefas por status", () => {
    service.create({ title: "T1", description: "", priority: "low" });
    service.create({ title: "T2", description: "", priority: "medium" });
    service.updateTaskStatus(2, "done");

    const counts = service.countTasksByStatus();
    expect(counts.todo).toBe(1);
    expect(counts.in_progress).toBe(0);
    expect(counts.done).toBe(1);
  });

  test("deve gerar códigos únicos sequenciais", () => {
    const t1 = service.create({
      title: "T1",
      description: "",
      priority: "low",
    });
    const t2 = service.create({
      title: "T2",
      description: "",
      priority: "medium",
    });
    const t3 = service.create({
      title: "T3",
      description: "",
      priority: "high",
    });

    expect(t1.code).toBe("TASK-0001");
    expect(t2.code).toBe("TASK-0002");
    expect(t3.code).toBe("TASK-0003");
  });

  test("deve encontrar tarefa por código Jira", () => {
    const task = service.create({
      title: "TaskCode",
      description: "",
      priority: "medium",
    });
    const found = service.findByCode(task.code);

    expect(found).toBeDefined();
    expect(found.id).toBe(task.id);

    const notFound = service.findByCode("TASK-9999");
    expect(notFound).toBeNull();
  });

  test("deve gerenciar ciclo completo de uma tarefa", () => {
    const task = service.create({
      title: "FullCycle",
      description: "",
      priority: "low",
    });
    service.update(task.id, { title: "Updated" });
    service.updateTaskStatus(task.id, "done");

    const byCode = service.findByCode(task.code);
    const byTitle = service.findByTitle("Updated");

    expect(byCode.status).toBe("done");
    expect(byTitle.length).toBe(1);
    expect(byTitle[0].title).toBe("Updated");
  });

  test("deve lidar com operações em tarefas inexistentes", () => {
    expect(service.update(999, { title: "X" })).toBeNull();
    expect(service.delete(999)).toBe(false);
    expect(service.updateTaskStatus(999, "done")).toBeNull();
  });
});
