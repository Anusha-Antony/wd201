/* eslint-disable no-undef */
const todoList = () => {
    all = [];
    const add = (todoItem) => {
      all.push(todoItem);
    };
    const markAsComplete = (index) => {
      all[index].completed = true;
    };
  
    const overdue = () => {
      // Write the date check condition here and return the array
      // of overdue items accordingly.
      let od = [];
      all.map((item) => {
        if (item.dueDate < today) {
          od.push(item);
        }
      });
      return od;
    };
  
    const dueToday = () => {
      // Write the date check condition here and return the array
      // of todo items that are due today accordingly.
      let dt = [];
      all.map((item) => {
        if (item.dueDate == today) {
          dt.push(item);
        }
      });
      return dt;
    };
  
    const dueLater = () => {
      // Write the date check condition here and return the array
      // of todo items that are due later accordingly.
      let dl = [];
      all.map((item) => {
        if (item.dueDate > today) {
          dl.push(item);
        }
      });
      return dl;
    };
  
    const toDisplayableList = (list) => {
      // Format the To-Do list here, and return the output string
      // as per the format given above.
      let op = "";
      let x = "";
      let od = "";
  
      list.map((item, index) => {
        if (item.completed == true) x = "[x]";
        else x = "[ ]";
  
        if (item.dueDate == today) od = `${x} ${item.title}`;
        else od = `${x} ${item.title} ${item.dueDate}`;
  
        if (index != list.length - 1) od = od + "\n";
  
        op = op + od;
      });
      return op;
    };
  
    return {
      all,
      add,
      markAsComplete,
      overdue,
      dueToday,
      dueLater,
      toDisplayableList,
    };
  };
  
  // ####################################### #
  // DO NOT CHANGE ANYTHING BELOW THIS LINE. #
  // ####################################### #
  
  const todos = todoList();
  
  const formattedDate = (d) => {
    return d.toISOString().split("T")[0];
  };
  
  var dateToday = new Date();
  const today = formattedDate(dateToday);
  const yesterday = formattedDate(
    new Date(new Date().setDate(dateToday.getDate() - 1)),
  );
  const tomorrow = formattedDate(
    new Date(new Date().setDate(dateToday.getDate() + 1)),
  );
  
  todos.add({ title: "Submit assignment", dueDate: yesterday, completed: false });
  todos.add({ title: "Pay rent", dueDate: today, completed: true });
  todos.add({ title: "Service Vehicle", dueDate: today, completed: false });
  todos.add({ title: "File taxes", dueDate: tomorrow, completed: false });
  todos.add({ title: "Pay electric bill", dueDate: tomorrow, completed: false });
  
  console.log("My Todo-list\n");
  
  console.log("Overdue");
  var overdues = todos.overdue();
  var formattedOverdues = todos.toDisplayableList(overdues);
  console.log(formattedOverdues);
  console.log("\n");
  
  console.log("Due Today");
  let itemsDueToday = todos.dueToday();
  let formattedItemsDueToday = todos.toDisplayableList(itemsDueToday);
  console.log(formattedItemsDueToday);
  console.log("\n");
  
  console.log("Due Later");
  let itemsDueLater = todos.dueLater();
  let formattedItemsDueLater = todos.toDisplayableList(itemsDueLater);
  console.log(formattedItemsDueLater);
  console.log("\n\n");
  
  module.exports = todoList;