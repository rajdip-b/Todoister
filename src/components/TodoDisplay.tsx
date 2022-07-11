import { AddCircleRounded } from "@mui/icons-material";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { borderColorCode, textColorCode } from "../modal/colors";
import TodoStatus from "../modal/todo-status";
import { appActions, StoreStateType } from "../store/store";
import AddButton from "./AddButton";
import TodoItem from "./TodoItem";

const TodoDisplay: FC<{ className?: string }> = (props) => {
	const appCtx = useSelector((state: StoreStateType) => state.app);
	const dispatch = useDispatch();

	return (
		<div className={`${props.className} h-screen w-[100%] p-16 overflow-y-scroll bg-slate-50 dark:bg-neutral-800`}>
			{!appCtx.selectedTodoCategory ? (
				<div className="text-lg font-light dark:text-gray-300 text-gray-700">No category selected!</div>
			) : (
				<div className={` flex flex-col gap-16 ${textColorCode(appCtx.selectedTodoCategory!.color)}`}>
					<h1 className={`${borderColorCode(appCtx.selectedTodoCategory.color)} text-2xl border-0 pb-5 border-b-2`}>{appCtx.selectedTodoCategory?.name}</h1>
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
						<div className="">
							<h1 className="text-gray-600 dark:text-gray-300 font-bold text-xl mb-10">Pending</h1>
							<div className="flex flex-col gap-5">
								{appCtx
									.selectedTodoCategory!.todos.filter((t) => t.status === TodoStatus.PENDING)
									.map((t) => (
										<TodoItem key={t.id} todo={t} />
									))}
								<AddButton className="w-full" onClick={() => dispatch(appActions.toggleAddTodoVisible())}>
									<AddCircleRounded className="text-lg" />
									<div className="ml-3">Add todo</div>
								</AddButton>
							</div>
						</div>
						<div className="">
							<h1 className="text-gray-600 dark:text-gray-300 font-bold text-xl mb-10">In progress</h1>
							<div className="flex flex-col gap-5">
								{appCtx
									.selectedTodoCategory!.todos.filter((t) => t.status === TodoStatus.IN_PROGRESS)
									.map((t) => (
										<TodoItem key={t.id} todo={t} />
									))}
								<AddButton className="w-full" onClick={() => dispatch(appActions.toggleAddTodoVisible())}>
									<AddCircleRounded />
									<div className="ml-3">Add todo</div>
								</AddButton>
							</div>
						</div>
						<div className="">
							<h1 className="text-gray-600 dark:text-gray-300 font-bold text-xl mb-10">Done</h1>
							<div className="flex flex-col gap-5">
								{appCtx
									.selectedTodoCategory!.todos.filter((t) => t.status === TodoStatus.DONE)
									.map((t) => (
										<TodoItem key={t.id} todo={t} />
									))}
								<AddButton className="w-full" onClick={() => dispatch(appActions.toggleAddTodoVisible())}>
									<AddCircleRounded />
									<div className="ml-3">Add todo</div>
								</AddButton>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default TodoDisplay;
