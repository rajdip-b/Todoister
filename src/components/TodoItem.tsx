import { DeleteRounded, EditRounded } from "@mui/icons-material";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { borderColorCode, Colors, textColorCode } from "../modal/colors";
import Priority from "../modal/priority";
import Todo from "../modal/todo";
import { appActions } from "../store/store";

const TodoItem: FC<{ todo: Todo; className?: string }> = (props) => {
	const dispatch = useDispatch();

	return (
		<div
			className={`${props.className} group rounded-lg border border-gray-300 h-[180px] p-5 grid grid-cols-1 justify-between hover:translate-x-2 hover:translate-y-2 hover:shadow-xl transition-all ease-out duration-300`}
		>
			<div>
				<div className="flex justify-between">
					<h1 className="dark:text-gray-300 text-gray-700 font-bold text-lg mb-2">{props.todo.name}</h1>
					<div className={`flex flex-row gap-3 items-center opacity-0 group-hover:opacity-100 transition-all ease-out duration-300  dark:text-gray-300 text-gray-600`}>
						<button>
							<EditRounded />
						</button>
						<button onClick={() => dispatch(appActions.deleteTodo(props.todo.id))}>
							<DeleteRounded />
						</button>
					</div>
				</div>
				{props.todo.priority === Priority.LOW && (
					<div className={`${borderColorCode(Colors.GREEN)} border-2 w-[100px] text-center px-2 py-1 rounded-lg text-sm ${textColorCode(Colors.GREEN)}`}>Low</div>
				)}
				{props.todo.priority === Priority.MEDIUM && (
					<div className={`${borderColorCode(Colors.YELLOW)} border-2 w-[100px] text-center px-2 py-1 rounded-lg text-sm ${textColorCode(Colors.YELLOW)}`}>Medium</div>
				)}
				{props.todo.priority === Priority.HIGH && (
					<div className={`${borderColorCode(Colors.RED)} border-2 w-[100px] text-center px-2 py-1 rounded-lg text-sm ${textColorCode(Colors.RED)}`}>High</div>
				)}
			</div>
			<div className="text-gray-500  dark:text-gray-400 text-sm">{props.todo.finishBy}</div>
		</div>
	);
};

export default TodoItem;
