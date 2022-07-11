import { nanoid } from "@reduxjs/toolkit";
import Priority from "./priority";
import TodoStatus from "./todo-status";

class Todo {
	id: string;
	name: string;
	finishBy: string;
	status: TodoStatus;
	priority: Priority;

	constructor(name: string, finishBy: Date, status: TodoStatus, priority: Priority) {
		this.id = nanoid();
		this.name = name;
		this.finishBy = finishBy.toLocaleDateString("en-IN", { weekday: "long", month: "short", day: "numeric" });
		this.status = status;
		this.priority = priority;
	}
}

export default Todo;
