
"use client";

import React, { useEffect, useState } from "react";
import Todoitem from "./Todoitem";

type Todo = {
	id: string;
	text: string;
	completed: boolean;
	deadline?: string | null;
	completedAt?: string | null;
};

const STORAGE_KEY = "todoist_next_todos_v1";

export default function Todolist() {
		const [todos, setTodos] = useState<Todo[]>(() => {
			try {
				const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
				return raw ? (JSON.parse(raw) as Todo[]) : [];
			} catch {
				return [];
			}
		});

		const [text, setText] = useState("");
		const [deadline, setDeadline] = useState<string | undefined>(undefined);

		useEffect(() => {
			try {
				localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
			} catch {
				// ignore quota errors
			}
		}, [todos]);

	function addTodo(e?: React.FormEvent) {
		e?.preventDefault();
		const trimmed = text.trim();
		if (!trimmed) return;
		const newTodo: Todo = {
			id: String(Date.now()) + Math.random().toString(36).slice(2, 8),
			text: trimmed,
			completed: false,
			deadline: deadline ? new Date(deadline).toISOString() : null,
			completedAt: null,
		};
		setTodos((s) => [newTodo, ...s]);
		setText("");
		setDeadline(undefined);
	}

	function toggle(id: string) {
		setTodos((s) =>
			s.map((t) => {
				if (t.id !== id) return t;
				const now = new Date().toISOString();
				if (!t.completed) {
					// marking complete
					return { ...t, completed: true, completedAt: now };
				}
				// marking incomplete
				return { ...t, completed: false, completedAt: null };
			})
		);
	}

	function remove(id: string) {
		setTodos((s) => s.filter((t) => t.id !== id));
	}

	function clearCompleted() {
		setTodos((s) => s.filter((t) => !t.completed));
	}

	const remaining = todos.filter((t) => !t.completed).length;

	return (
		<section aria-labelledby="todo-heading" className="max-w-xl mx-auto p-4">
			<h2 id="todo-heading" className="text-2xl font-semibold mb-3">Todo List</h2>

			<form onSubmit={addTodo} className="flex gap-2 mb-4">
				<input
					value={text}
					onChange={(e) => setText(e.target.value)}
					className="flex-1 border rounded px-3 py-2"
					placeholder="What needs to be done?"
					aria-label="New todo"
				/>
				<div className="flex items-center gap-2">
					<input
						type="datetime-local"
						value={deadline ?? ""}
						onChange={(e) => setDeadline(e.target.value || undefined)}
						className="border rounded px-2 py-2 text-sm"
						aria-label="Deadline"
					/>
					<button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
				</div>
			</form>

			<div className="mb-3 text-sm text-gray-600">{remaining} remaining / {todos.length} total</div>

					<ul className="space-y-2">
						{todos.map((t) => (
							<Todoitem key={t.id} todo={t} onToggle={toggle} onDelete={remove} />
						))}
					</ul>

			<div className="mt-4 flex justify-between items-center">
				<button onClick={clearCompleted} className="text-sm text-gray-700">Clear completed</button>
				<small className="text-sm text-gray-500">Tip: todos persisted to localStorage</small>
			</div>
		</section>
	);
}
