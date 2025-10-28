"use client";

import React from "react";

type Todo = {
	id: string;
	text: string;
	completed: boolean;
	deadline?: string | null; // ISO string
	completedAt?: string | null; // ISO string when it was completed
};

type Props = {
	todo: Todo;
	onToggle: (id: string) => void;
	onDelete: (id: string) => void;
};

export default function Todoitem({ todo, onToggle, onDelete }: Props) {
	return (
		<li className="flex items-center justify-between bg-white p-2 rounded shadow-sm">
			<div className="flex items-center gap-3">
				<input
					type="checkbox"
					checked={todo.completed}
					onChange={() => onToggle(todo.id)}
					aria-label={`Mark ${todo.text} as ${todo.completed ? "incomplete" : "complete"}`}
				/>
				<span style={{ textDecoration: todo.completed ? "line-through" : undefined }} className="select-none">
					{todo.text}
				</span>
				{todo.deadline ? (
					<small className="ml-2 text-xs text-gray-500">Deadline: {new Date(todo.deadline).toLocaleString()}</small>
				) : null}
			</div>
			<div className="flex gap-2">
				<button onClick={() => onDelete(todo.id)} className="text-red-600">Delete</button>
				{todo.completed && todo.completedAt ? (
					<small className="text-xs text-green-600">Completed at {new Date(todo.completedAt).toLocaleString()}</small>
				) : null}
			</div>
		</li>
	);
}
