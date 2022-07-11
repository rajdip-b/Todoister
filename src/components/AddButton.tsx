import React, { FC } from "react";

const AddButton: FC<{ className?: string; children?: React.ReactNode; onClick?: () => void }> = (props) => {
	return (
		<button
			className={`${props.className} flex justify-center dark:bg-gray-600 dark:text-gray-200 bg-gray-200 text-gray-700 h-[55px] rounded-lg items-center hover:bg-gray-300 transition-all ease-out duration-300`}
			onClick={props.onClick}
		>
			{props.children}
		</button>
	);
};

export default AddButton;
