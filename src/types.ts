export interface Player {
	name: string;
	avatar: string;
	event: string;
	password: string;
}

export interface Category {
	id: number;
	name: string;
}

export type Categories = Category[];

export interface Game {
	name: string;
	description: string;
	code: string;
	icon: string;
	categoryIds: number[];
}

export type Games = Game[];
