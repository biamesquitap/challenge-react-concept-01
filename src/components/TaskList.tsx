import { useState, InvalidEvent } from 'react';
import { FiTrash, FiCheckSquare } from 'react-icons/fi';

import '../styles/tasklist.scss';
import UUID from 'uuid-int';


interface Task {
  id: number;
  title: string;
  isComplete: boolean;

}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const generator = UUID(0);
  const emptyTaskTitle = newTaskTitle.length === 0;

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.

    setTasks (
      (oldTasks) =>
      [ ...oldTasks, {
      id: generator.uuid(),
      title: newTaskTitle,
      isComplete: false,
    }])
    console.log(`O id e ${generator.uuid()}`)
  }

  function handleToggleTaskCompletion(id: number): void {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    // MAP
    // PARA O FIND: tasks.find(tasks => tasks.id === id)
    setTasks((state) =>
      state.map((task) => {
        if(task.id === id) {
          return {...task, isComplete: true}
        } else {
          return task
        }
      })
    )
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    setTasks((state) =>
      state.filter(task => task.id !== id))
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo to do"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            ata-testid="add-task-button"
            onClick={handleCreateNewTask}
            disabled={emptyTaskTitle}
          >

            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div
                className={task.isComplete ? 'completed' : ''}
                data-testid="task"
              >

                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}