'use strict';
const { Model, Op } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static async addTask(params) {
      return await Todo.create(params);
    }

    static async showList() {
      console.log("My Todo list\n");

      console.log("Overdue");
      const overdueItems = await this.overdue();
      overdueItems.forEach(todo => console.log(todo.displayableString().trim()));
      console.log("\n");

      console.log("Due Today");
      const dueTodayItems = await this.dueToday();
      dueTodayItems.forEach(todo => console.log(todo.displayableString().trim()));
      console.log("\n");

      console.log("Due Later");
      const dueLaterItems = await this.dueLater();
      dueLaterItems.forEach(todo => console.log(todo.displayableString().trim()));
    }

    static async overdue() {
      const today = new Date().toISOString().slice(0, 10);
      return await Todo.findAll({
        where: {
          dueDate: { [Op.lt]: today },
        },
        order: [['dueDate', 'ASC']],
      });
    }

    static async dueToday() {
      const today = new Date().toISOString().slice(0, 10);
      return await Todo.findAll({
        where: {
          dueDate: today,
        },
        order: [['id', 'ASC']],
      });
    }

    static async dueLater() {
      const today = new Date().toISOString().slice(0, 10);
      return await Todo.findAll({
        where: {
          dueDate: { [Op.gt]: today },
        },
        order: [['dueDate', 'ASC']],
      });
    }

    static async markAsComplete(id) {
      const todo = await Todo.findByPk(id);
      if (todo) {
        todo.completed = true;
        await todo.save();
      }
    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      // Show dueDate only if not due today (you can adjust based on requirements)
      const today = new Date().toISOString().slice(0, 10);
      const dueDateStr = this.dueDate === today ? "" : ` ${this.dueDate}`;
      return `${this.id}. ${checkbox} ${this.title}${dueDateStr}`;
    }
  }

  Todo.init({
    title
