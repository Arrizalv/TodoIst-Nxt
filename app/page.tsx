import Todolist from "./Components/Todolist";

export default function Home() {
  return (
    <main>
      <div className="min-h flex flex-col items-center justify-center bg-gray-100 p-4 font-bold text-3xl">
        To Do List App 1.0
      </div>
        <Todolist />
    </main>
  );
}
