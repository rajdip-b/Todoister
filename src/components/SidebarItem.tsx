import { DeleteRounded, EditRounded } from "@mui/icons-material";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bgColorCode, borderColorCode, textColorCode } from "../modal/colors";
import TodoCategory from "../modal/todo-category";
import { appActions, StoreStateType } from "../store/store";

const SidebarItem: FC<{ todoCategory: TodoCategory }> = (props) => {
	const appCtx = useSelector((state: StoreStateType) => state.app);
	const dispatch = useDispatch();

	return (
		<button
			onClick={() => dispatch(appActions.setSelectedTodoCategory(props.todoCategory.id))}
			className={`${appCtx.selectedTodoCategory?.id === props.todoCategory.id && `${textColorCode(props.todoCategory.color)}`} ${borderColorCode(
				props.todoCategory.color
			)} w-full dark:hover:bg-zinc-700 hover:bg-gray-200 transition-all ease-out duration-300 items-center self-center flex justify-between px-5 py-4 border-r-2 group`}
		>
			<div className="flex flex-row gap-3 items-center">
				<div className={`w-[15px] h-[15px] rounded ${bgColorCode(props.todoCategory.color)}`}></div>
				{props.todoCategory.name}
			</div>
			<div className="flex flex-row gap-3 items-center opacity-0 group-hover:opacity-100 transition-all ease-out duration-300">
				<button>
					<EditRounded />
				</button>
				<button onClick={() => dispatch(appActions.deleteTodoCategory(props.todoCategory.id))}>
					<DeleteRounded />
				</button>
			</div>
		</button>
	);
};

export default SidebarItem;
