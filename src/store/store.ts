import { combineReducers, configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Colors } from "../modal/colors";
import Priority from "../modal/priority";
import Todo from "../modal/todo";
import TodoCategory from "../modal/todo-category";
import TodoStatus from "../modal/todo-status";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

export interface AppState {
	selectedThemeColor: Colors;
	isDarkMode: boolean;
	isSidebarExpanded: boolean;
	todoCategories: TodoCategory[];
	selectedTodoCategory: TodoCategory | null;
	addTodoCategoryVisible: boolean;
	addTodoVisible: boolean;
}

export type AddTodoCategoryActionType = {
	todoCategory: TodoCategory;
};

export type DeleteTodoCategoryActionType = {
	todoCategoryId: string;
};

export type ModifyTodoCategoryActionType = {
	todoCategoryId: string;
	todoCategoryName?: string;
	todoCategoryColor?: Colors;
};

export type ModifyTodoActionType = {
	todoCategoryId: string;
	todoId: string;
	todoName?: string;
	todoFinishBy?: Date;
	todoPriority?: Priority;
	todoStatus?: TodoStatus;
};

const appInitialState: AppState = {
	isDarkMode: false,
	isSidebarExpanded: true,
	todoCategories: [],
	selectedTodoCategory: null,
	selectedThemeColor: Colors.BLUE,
	addTodoCategoryVisible: false,
	addTodoVisible: false,
};

const appSlice = createSlice({
	name: "app",
	initialState: appInitialState,
	reducers: {
		toggleDarkMode(state: AppState) {
			state.isDarkMode = !state.isDarkMode;
		},
		toggleSidebarExpanded(state: AppState) {
			state.isSidebarExpanded = !state.isSidebarExpanded;
		},
		addTodoCategory(state: AppState, action: PayloadAction<TodoCategory>) {
			state.todoCategories.push(action.payload);
			state.selectedTodoCategory = action.payload;
		},
		deleteTodoCategory(state: AppState, action: PayloadAction<string>) {
			if (state.selectedTodoCategory && state.selectedTodoCategory!.id === action.payload) state.selectedTodoCategory = null;
			state.todoCategories = state.todoCategories.filter((todoCategory) => todoCategory.id !== action.payload);
		},
		modifyTodoCategory(state: AppState, action: PayloadAction<ModifyTodoCategoryActionType>) {
			const todoCategory = state.todoCategories.find((todoCategory) => todoCategory.id === action.payload.todoCategoryId);
			if (todoCategory) {
				if (action.payload.todoCategoryName) todoCategory!.name = action.payload.todoCategoryName;
				if (action.payload.todoCategoryColor) todoCategory.color = action.payload.todoCategoryColor;
			}
		},
		addTodo(state: AppState, action: PayloadAction<Todo>) {
			state.todoCategories.find((i) => i.id === state.selectedTodoCategory!.id)?.todos.push(action.payload);
			state.selectedTodoCategory?.todos.push(action.payload);
		},
		deleteTodo(state: AppState, action: PayloadAction<string>) {
			state.selectedTodoCategory!.todos = state.selectedTodoCategory!.todos.filter((todo) => todo.id !== action.payload);
			state.selectedTodoCategory?.todos.filter((todo) => todo.id !== action.payload);
		},
		modifyTodo(state: AppState, action: PayloadAction<ModifyTodoActionType>) {
			const todoCategory = state.todoCategories.find((todoCategory) => todoCategory.id === action.payload.todoCategoryId);
			if (todoCategory) {
				const todo = todoCategory.todos.find((todo) => todo.id === action.payload.todoId);
				if (todo) {
					if (action.payload.todoFinishBy) todo.finishBy = action.payload.todoFinishBy.toLocaleDateString("en-IN", { weekday: "long", month: "short", day: "numeric" });
					if (action.payload.todoName) todo.name = action.payload.todoName;
					if (action.payload.todoPriority) todo.priority = action.payload.todoPriority;
					if (action.payload.todoStatus) todo.status = action.payload.todoStatus;
				}
			}
		},
		setSelectedColorTheme(state: AppState, action: PayloadAction<Colors>) {
			state.selectedThemeColor = action.payload;
		},
		toggleAddTodoCategoryVisible(state: AppState) {
			state.addTodoCategoryVisible = !state.addTodoCategoryVisible;
		},
		toggleAddTodoVisible(state: AppState) {
			state.addTodoVisible = !state.addTodoVisible;
		},
		setSelectedTodoCategory(state: AppState, action: PayloadAction<string>) {
			state.selectedTodoCategory = state.todoCategories.find((todoCategory) => todoCategory.id === action.payload)!;
		},
	},
});

const rootPersistConfig = {
	key: "todoister",
	storage,
	blacklist: ["app"],
};

const appPersistConfig = {
	key: "app",
	storage,
	blacklist: ["addTodoCategoryVisible", "addTodoVisible"],
};

const rootReducer = combineReducers({
	app: persistReducer(appPersistConfig, appSlice.reducer),
});

const store = configureStore({
	reducer: persistReducer(rootPersistConfig, rootReducer),
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

export const appActions = appSlice.actions;
export { store, persistor };
export type StoreStateType = { app: AppState };
