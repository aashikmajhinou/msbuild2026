import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'

type Todo = {
  id: string
  text: string
  completed: boolean
  createdAt: number
}

const STORAGE_KEY = 'todo-app-items'

function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return []
    }
    const parsed = JSON.parse(raw) as Todo[]
    if (!Array.isArray(parsed)) {
      return []
    }
    return parsed.filter(
      (item) =>
        typeof item.id === 'string' &&
        typeof item.text === 'string' &&
        typeof item.completed === 'boolean' &&
        typeof item.createdAt === 'number',
    )
  } catch {
    return []
  }
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => loadTodos())
  const [newTodoText, setNewTodoText] = useState('')
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null)
  const [editingText, setEditingText] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const hasTodos = todos.length > 0
  const completedCount = useMemo(
    () => todos.filter((todo) => todo.completed).length,
    [todos],
  )

  const handleAddTodo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const text = newTodoText.trim()
    if (!text) {
      return
    }

    setTodos((current) => [
      {
        id: crypto.randomUUID(),
        text,
        completed: false,
        createdAt: Date.now(),
      },
      ...current,
    ])
    setNewTodoText('')
  }

  const toggleTodo = (todoId: string) => {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  const deleteTodo = (todoId: string) => {
    setTodos((current) => current.filter((todo) => todo.id !== todoId))
    if (editingTodoId === todoId) {
      setEditingTodoId(null)
      setEditingText('')
    }
  }

  const startEdit = (todo: Todo) => {
    setEditingTodoId(todo.id)
    setEditingText(todo.text)
  }

  const saveEdit = (todoId: string) => {
    const text = editingText.trim()
    if (!text) {
      return
    }

    setTodos((current) =>
      current.map((todo) => (todo.id === todoId ? { ...todo, text } : todo)),
    )
    setEditingTodoId(null)
    setEditingText('')
  }

  const cancelEdit = () => {
    setEditingTodoId(null)
    setEditingText('')
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-2xl px-4 py-10 sm:px-6">
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <header className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Todo App
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            {completedCount}/{todos.length} completed
          </p>
        </header>

        <form onSubmit={handleAddTodo} className="mb-6 flex gap-2">
          <input
            value={newTodoText}
            onChange={(event) => setNewTodoText(event.target.value)}
            placeholder="Add a new task"
            className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            aria-label="New todo"
          />
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Add
          </button>
        </form>

        {!hasTodos ? (
          <p className="rounded-md border border-dashed border-slate-300 px-4 py-8 text-center text-sm text-slate-500">
            No todos yet. Add one to get started.
          </p>
        ) : (
          <ul className="space-y-2">
            {todos.map((todo) => {
              const isEditing = editingTodoId === todo.id
              return (
                <li
                  key={todo.id}
                  className="rounded-md border border-slate-200 px-3 py-3"
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />

                    <div className="flex-1">
                      {isEditing ? (
                        <input
                          value={editingText}
                          onChange={(event) => setEditingText(event.target.value)}
                          className="w-full rounded-md border border-slate-300 px-2 py-1 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                          aria-label="Edit todo"
                        />
                      ) : (
                        <p
                          className={`text-sm ${
                            todo.completed
                              ? 'text-slate-400 line-through'
                              : 'text-slate-800'
                          }`}
                        >
                          {todo.text}
                        </p>
                      )}
                    </div>

                    <div className="flex gap-2">
                      {isEditing ? (
                        <>
                          <button
                            type="button"
                            onClick={() => saveEdit(todo.id)}
                            className="rounded bg-emerald-600 px-2.5 py-1 text-xs font-medium text-white hover:bg-emerald-700"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={cancelEdit}
                            className="rounded border border-slate-300 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() => startEdit(todo)}
                          className="rounded border border-slate-300 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100"
                        >
                          Edit
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => deleteTodo(todo.id)}
                        className="rounded bg-rose-600 px-2.5 py-1 text-xs font-medium text-white hover:bg-rose-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </section>
    </main>
  )
}

export default App
