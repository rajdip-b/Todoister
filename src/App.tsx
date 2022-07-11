import { useSelector } from "react-redux";
import "./App.css";
import Sidebar from "./components/Sidebar";
import TodoDisplay from "./components/TodoDisplay";
import AddTodo from "./popup/AddTodo";
import AddTodoCategory from "./popup/AddTodoCategory";
import { StoreStateType } from "./store/store";

function App() {
	const appCtx = useSelector((state: StoreStateType) => state.app);

	return (
		<div className="flex flex-row dark">
			<Sidebar />
			<TodoDisplay />
			<AddTodoCategory />
			{appCtx.selectedTodoCategory && <AddTodo />}
		</div>
	);
}

export default App;
