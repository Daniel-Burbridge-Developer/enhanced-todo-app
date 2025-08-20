import { createFileRoute } from '@tanstack/react-router'

import { useState } from 'react'

export const Route = createFileRoute('/')({
  component: App,
})

type Status = 'todo' | 'completed'

type Task = {
  id: number
  title: string
  status: Status
}

function App() {
  const [tasks, setTasks] = useState<Array<Task>>([])
  const [taskFilter, setTaskFilter] = useState<Array<Status>>(['todo'])
  const [inputValue, setInputValue] = useState<string>('')

  const clearState = () => {
    setTasks([])
  }

  const addTask = (title: string) => {
    setTasks([...tasks, { id: tasks.length + 1, title: title, status: 'todo' }])
    setInputValue('')
  }

  const setTaskStatus = (id: number, status: Status) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, status } : task)))
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleView = () => {
    taskFilter.includes('todo')
      ? setTaskFilter(['completed'])
      : setTaskFilter(['todo'])
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold">Tasks</h1>
      <TaskView
        filter={taskFilter}
        tasks={tasks}
        setTaskStatus={setTaskStatus}
        deleteTask={deleteTask}
      />
      <input
        className="border-2 border-gray-300 rounded-md p-2"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <MyButton callback={clearState} color="bg-red-500" text="Clear" />
      <MyButton
        callback={() => addTask(inputValue)}
        color="bg-blue-500"
        text="Add"
      />
      <MyButton callback={toggleView} color="bg-green-500" text="Toggle" />
    </div>
  )
}

const MyButton = ({
  callback,
  color,
  text,
}: {
  callback: () => void
  color: string
  text: string
}) => {
  return (
    <button
      className={`hover:cursor-auto outline-2 ${color}`}
      onClick={callback}
    >
      {text}
    </button>
  )
}

const TaskView = ({
  filter,
  tasks,
  setTaskStatus,
  deleteTask,
}: {
  filter: Array<Status>
  tasks: Array<Task>
  setTaskStatus: (id: number, status: Status) => void
  deleteTask: (id: number) => void
}) => {
  return (
    <div className="flex flex-col gap-2">
      <ul>
        {tasks.map((task) => {
          return (
            <li key={task.id}>
              {filter.includes(task.status) ? (
                <div className="flex flex-row gap-2">
                  <p>{task.title}</p>
                  <MyButton
                    callback={() => setTaskStatus(task.id, 'completed')}
                    color="bg-green-500"
                    text="Complete"
                  />
                  <MyButton
                    callback={() => setTaskStatus(task.id, 'todo')}
                    color="bg-red-500"
                    text="Incomplete"
                  />
                  <MyButton
                    callback={() => deleteTask(task.id)}
                    color="bg-red-500"
                    text="Delete"
                  />
                </div>
              ) : null}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
