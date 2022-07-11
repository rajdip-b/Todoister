import { Close } from "@mui/icons-material";
import { FC, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bgColorCode, Colors } from "../modal/colors";
import TodoCategory from "../modal/todo-category";
import { appActions, StoreStateType } from "../store/store";

const AddTodoCategory: FC = (props) => {
	const appCtx = useSelector((state: StoreStateType) => state.app);
	const dispach = useDispatch();
	const categoryRef = useRef<HTMLInputElement>(null);
	const themeRef = useRef<HTMLSelectElement>(null);

	const handleAddClick = useCallback(() => {
		const category = categoryRef.current!.value;
		categoryRef.current!.value = "";
		let theme: Colors = Colors.BLUE;

		switch (themeRef.current?.selectedOptions[0].value) {
			case Colors.BLUE.toString():
				theme = Colors.BLUE;
				break;
			case Colors.GREEN.toString():
				theme = Colors.GREEN;
				break;
			case Colors.INDIGO.toString():
				theme = Colors.INDIGO;
				break;
			case Colors.ORANGE.toString():
				theme = Colors.ORANGE;
				break;
			case Colors.RED.toString():
				theme = Colors.RED;
				break;
			case Colors.VIOLET.toString():
				theme = Colors.VIOLET;
				break;
			case Colors.YELLOW.toString():
				theme = Colors.YELLOW;
				break;
		}

		if (category && category.trim() !== "") {
			dispach(appActions.addTodoCategory(new TodoCategory(category, theme)));
			dispach(appActions.toggleAddTodoCategoryVisible());
		}
	}, [dispach]);

	return (
		<div className={`${appCtx.addTodoCategoryVisible ? "absolute z-10" : "hidden"} bg-gray-800/10 w-screen h-screen flex`}>
			<div className="w-[500px] h-fit bg-gray-100 mx-auto self-center rounded-xl flex flex-col gap-4 p-10 shadow-md">
				<div className="flex justify-between">
					<div className="text-2xl font-light text-gray-700">Add a category</div>
					<button className="text-gray-600" onClick={() => dispach(appActions.toggleAddTodoCategoryVisible())}>
						<Close />
					</button>
				</div>
				<div>
					<label className=" text-gray-600">Name</label>
					<input ref={categoryRef} className="rounded-md bg-gray-100 p-3 text-md w-full border border-gray-500 text-gray-600 outline-none" placeholder="Category name" type="text" />
				</div>
				<div>
					<label className=" text-gray-600">Theme</label>
					<select ref={themeRef} className="rounded-md bg-gray-100 p-3 text-md w-full border border-gray-500 text-gray-600 outline-none">
						<option value={Colors.BLUE}>Blue</option>
						<option value={Colors.GREEN}>Green</option>
						<option value={Colors.INDIGO}>Indigo</option>
						<option value={Colors.ORANGE}>Orange</option>
						<option value={Colors.RED}>Red</option>
						<option value={Colors.VIOLET}>Violet</option>
						<option value={Colors.YELLOW}>Yellow</option>
					</select>
				</div>
				<button onClick={handleAddClick} className={`p-3 rounded-md ${bgColorCode(appCtx.selectedThemeColor)} text-gray-100`}>
					Add
				</button>
			</div>
		</div>
	);
};

export default AddTodoCategory;
