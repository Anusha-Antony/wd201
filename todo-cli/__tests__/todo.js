/* eslint-disable no-undef */
const todoList = require("../todo");
const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

const formattedDate = (d) => d.toISOString().split("T")[0];
const today = formattedDate(new Date());
const yesterday = formattedDate(
  new Date(new Date().setDate(new Date().getDate() - 1)),
);
const tomorrow = formattedDate(
  new Date(new Date().setDate(new Date().getDate() + 1)),
);

describe("Todo suite", () => {
  beforeEach(() => {
    all.length = 0;
  });

  test("should add new todo", () => {
    add({
      title: "Submit assignment",
      dueDate: today,
      completed: false,
    });

    expect(all.length).toBe(1);
    expect(all[0].title).toBe("Submit assignment");
    expect(all[0].dueDate).toBe(today);
    expect(all[0].completed).toBe(false);
  });

  test("mark test", () => {
    add({
      title: "Mark test assignment",
      dueDate: today,
      completed: false,
    });

    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("overdue test", () => {
    add({
      title: "Overdue task",
      dueDate: yesterday,
      completed: false,
    });

    const items = overdue();
    expect(items.length).toBe(1);
    expect(items[0].title).toBe("Overdue task");
    expect(items[0].dueDate).toBe(yesterday);
  });

  test("dueToday test", () => {
    add({
      title: "Today's task",
      dueDate: today,
      completed: false,
    });

    const items = dueToday();
    expect(items.length).toBe(1);
    expect(items[0].title).toBe("Today's task");
    expect(items[0].dueDate).toBe(today);
  });

  test("dueLater test", () => {
    add({
      title: "Future task",
      dueDate: tomorrow,
      completed: false,
    });

    const items = dueLater();
    expect(items.length).toBe(1);
    expect(items[0].title).toBe("Future task");
    expect(items[0].dueDate).toBe(tomorrow);
  });
});
