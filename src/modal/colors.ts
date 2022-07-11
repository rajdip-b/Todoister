export enum Colors {
	RED,
	GREEN,
	BLUE,
	YELLOW,
	ORANGE,
	VIOLET,
	INDIGO,
	WHITE,
	BLACK,
}

export const bgColorCode = (code: Colors) => {
	switch (code) {
		case Colors.RED:
			return "bg-rose-500";
		case Colors.GREEN:
			return "bg-emerald-500";
		case Colors.BLUE:
			return "bg-sky-500";
		case Colors.YELLOW:
			return "bg-amber-500";
		case Colors.ORANGE:
			return "bg-orange-500";
		case Colors.VIOLET:
			return "bg-violet-500";
		case Colors.INDIGO:
			return "bg-indigo-500";
		case Colors.WHITE:
			return "bg-slate-50";
		case Colors.BLACK:
			return "bg-slate-800";
	}
};

export const borderColorCode = (code: Colors) => {
	switch (code) {
		case Colors.RED:
			return "border-rose-500";
		case Colors.GREEN:
			return "border-emerald-500";
		case Colors.BLUE:
			return "border-sky-500";
		case Colors.YELLOW:
			return "border-amber-500";
		case Colors.ORANGE:
			return "border-orange-500";
		case Colors.VIOLET:
			return "border-violet-500";
		case Colors.INDIGO:
			return "border-indigo-500";
		case Colors.WHITE:
			return "border-slate-50";
		case Colors.BLACK:
			return "border-slate-800";
	}
};

export const textColorCode = (code: Colors) => {
	switch (code) {
		case Colors.RED:
			return "text-rose-600";
		case Colors.GREEN:
			return "text-emerald-600";
		case Colors.BLUE:
			return "text-sky-600";
		case Colors.YELLOW:
			return "text-amber-600";
		case Colors.ORANGE:
			return "text-orange-600";
		case Colors.VIOLET:
			return "text-violet-600";
		case Colors.INDIGO:
			return "text-indigo-600";
		case Colors.WHITE:
			return "text-slate-50";
		case Colors.BLACK:
			return "text-slate-800";
	}
};
