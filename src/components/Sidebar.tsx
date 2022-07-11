import { AddCircleRounded, Menu } from "@mui/icons-material";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { textColorCode } from "../modal/colors";
import { appActions, StoreStateType } from "../store/store";
import AddButton from "./AddButton";
import SidebarItem from "./SidebarItem";

const Sidebar: FC<{ className?: string }> = (props) => {
	const appCtx = useSelector((state: StoreStateType) => state.app);
	const dispatch = useDispatch();
	return (
		<div className={`${props.className} dark:bg-zinc-800 w-[300px] h-screen dark:text-gray-300 text-gray-600 pt-10 gap-5 bg-gray-50`}>
			<div className={`flex p-5 pt-6  align-middle items-center justify-between mb-[30px]`}>
				<div className={`font-bold text-xl text-gray-700 ${textColorCode(appCtx.selectedThemeColor)}`}>Todoister</div>
				<button className="h-fit">
					<Menu fontSize="medium" className="text-gray-600 dark:text-gray-300" />
				</button>
			</div>
			{appCtx.todoCategories.length === 0 && <div className="text-center font-light my-5">Nothing to show!</div>}
			<div className="flex flex-col my-10">{appCtx.todoCategories.length !== 0 && appCtx.todoCategories.map((t) => <SidebarItem key={t.id} todoCategory={t} />)}</div>
			<AddButton className="mx-5 w-[255px]" onClick={() => dispatch(appActions.toggleAddTodoCategoryVisible())}>
				<AddCircleRounded />
				<div className="ml-3">Add a category</div>
			</AddButton>
		</div>
	);
};

export default Sidebar;
