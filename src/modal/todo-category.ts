import { nanoid } from "@reduxjs/toolkit";
import { Colors } from "./colors";
import Todo from "./todo";

class TodoCategory {
	id: string;
	name: string;
	todos: Todo[];
	color: Colors;

	constructor(name: string, color: Colors) {
		this.id = nanoid();
		this.name = name;
		this.color = color;
		this.todos = [];
	}
}

export default TodoCategory;
