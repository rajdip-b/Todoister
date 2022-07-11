import { Close } from "@mui/icons-material";
import { FC, useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bgColorCode, borderColorCode, Colors, textColorCode } from "../modal/colors";
import { appActions, StoreStateType } from "../store/store";
import TodoStatus from "../modal/todo-status";
import Todo from "../modal/todo";
import Priority from "../modal/priority";

const AddTodo: FC = (props) => {
	const appCtx = useSelector((state: StoreStateType) => state.app);
	const dispach = useDispatch();

	const nameRef = useRef<HTMLInputElement>(null);
	const statusRef = useRef<HTMLSelectElement>(null);
	const finishByRef = useRef<HTMLInputElement>(null);
	const [selectedPriority, setSelectedPriority] = useState<Priority>(Priority.LOW);

	const handleAddClick = useCallback(() => {
		const name = nameRef.current!.value;
		const status = statusRef.current!.selectedOptions[0].value;
		const finishBy = finishByRef.current!.value;

		if (name && name.trim() !== "" && finishBy) {
			let s: TodoStatus = TodoStatus.PENDING;
			if (status === TodoStatus.DONE.toString()) s = TodoStatus.DONE;
			if (status === TodoStatus.IN_PROGRESS.toString()) s = TodoStatus.IN_PROGRESS;
			if (status === TodoStatus.PENDING.toString()) s = TodoStatus.PENDING;

			dispach(appActions.addTodo(new Todo(name, new Date(finishBy), s, selectedPriority)));

			nameRef.current!.value = "";
			statusRef.current!.selectedIndex = 0;
			setSelectedPriority(Priority.LOW);

			dispach(appActions.toggleAddTodoVisible());
		}
	}, [dispach, selectedPriority]);

	return (
		<div className={`${appCtx.addTodoVisible ? "absolute z-10" : "hidden"} bg-gray-800/10 w-screen h-screen flex`}>
			<div className="w-[500px] h-fit bg-gray-100 mx-auto self-center rounded-xl flex flex-col gap-5 p-10 shadow-md">
				<div className="flex justify-between">
					<div className="text-2xl font-bold text-gray-600">Add a todo</div>
					<button className="text-gray-600" onClick={() => dispach(appActions.toggleAddTodoVisible())}>
						<Close />
					</button>
				</div>
				<div>
					<label className=" text-gray-600">Category</label>
					<input
						className="rounded-md bg-gray-200 p-3 disabled:cursor-not-allowed text-md w-full border border-gray-500 text-gray-600 outline-none"
						disabled={true}
						value={appCtx.selectedTodoCategory!.name}
						placeholder="Todo name"
						type="text"
					/>
				</div>
				<div>
					<label className=" text-gray-600">Name</label>
					<input ref={nameRef} className="rounded-md bg-gray-100 p-3 text-md w-full border border-gray-500 text-gray-600 outline-none" placeholder="Todo name" type="text" />
				</div>
				<div>
					<label className=" text-gray-600">Status</label>
					<select className="rounded-md bg-gray-100 p-3 text-md w-full border border-gray-500 text-gray-600 outline-none" ref={statusRef}>
						<option value={TodoStatus.PENDING.valueOf()}>Pending</option>
						<option value={TodoStatus.IN_PROGRESS.valueOf()}>In progress</option>
						<option value={TodoStatus.DONE.valueOf()}>Done</option>
					</select>
				</div>
				<div>
					<label className=" text-gray-600">Priority</label>
					<div className="grid grid-cols-3 gap-3">
						<button
							onClick={() => setSelectedPriority(Priority.LOW)}
							className={`p-2 border text-center ${borderColorCode(Colors.GREEN)} ${
								selectedPriority === Priority.LOW
									? `${textColorCode(Colors.WHITE)} ${bgColorCode(Colors.GREEN)}`
									: `${borderColorCode(Colors.GREEN)} ${textColorCode(Colors.GREEN)} hover:bg-gray-200`
							} transition-all ease-out duration-300 rounded-lg`}
						>
							Low
						</button>
						<button
							onClick={() => setSelectedPriority(Priority.MEDIUM)}
							className={`p-2 border text-center ${borderColorCode(Colors.ORANGE)} ${
								selectedPriority === Priority.MEDIUM
									? `${textColorCode(Colors.WHITE)} ${bgColorCode(Colors.ORANGE)}`
									: `${borderColorCode(Colors.ORANGE)} ${textColorCode(Colors.ORANGE)} hover:bg-gray-200`
							} transition-all ease-out duration-300 rounded-lg`}
						>
							Medium
						</button>
						<button
							onClick={() => setSelectedPriority(Priority.HIGH)}
							className={`p-2 border text-center ${borderColorCode(Colors.RED)} ${
								selectedPriority === Priority.HIGH
									? `${textColorCode(Colors.WHITE)} ${bgColorCode(Colors.RED)}`
									: `hover:bg-gray-200 ${borderColorCode(Colors.RED)} ${textColorCode(Colors.RED)}`
							} transition-all ease-out duration-300 rounded-lg`}
						>
							High
						</button>
					</div>
				</div>
				<div>
					<label className=" text-gray-600">Deadline</label>
					<input ref={finishByRef} className="rounded-md bg-gray-100 p-3 text-md w-full border border-gray-500 text-gray-600 outline-none" placeholder="Todo name" type="date" />
				</div>
				<button onClick={handleAddClick} className={`p-3 rounded-md ${bgColorCode(appCtx.selectedThemeColor)} text-gray-100`}>
					Add
				</button>
			</div>
		</div>
	);
};

export default AddTodo;
