import React, { useState } from 'react';
import { Plus, Trash2, CheckSquare, Square, Target } from 'lucide-react';
import { Task } from '../types';

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        text: newTask.trim(),
        completed: false,
      };
      setTasks([...tasks, task]);
      setNewTask('');
    }
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const completedTasks = tasks.filter(task => task.completed);
  const pendingTasks = tasks.filter(task => !task.completed);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">To-Do List</h1>
        <p className="text-gray-600">Gérez vos tâches quotidiennes efficacement</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-sm">
            <form onSubmit={addTask} className="flex space-x-3">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Ajouter une nouvelle tâche..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">Ajouter</span>
              </button>
            </form>
          </div>

          {tasks.length === 0 ? (
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/50">
              <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucune tâche pour le moment</h3>
              <p className="text-gray-500">Ajoutez votre première tâche pour commencer</p>
            </div>
          ) : (
            <div className="space-y-6">
              {pendingTasks.length > 0 && (
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
                    <Square className="w-5 h-5 text-orange-500" />
                    <span>Tâches en cours ({pendingTasks.length})</span>
                  </h3>
                  <div className="space-y-3">
                    {pendingTasks.map((task) => (
                      <div key={task.id} className="flex items-center space-x-3 p-3 bg-orange-50 rounded-xl">
                        <button
                          onClick={() => toggleTask(task.id)}
                          className="text-gray-400 hover:text-green-500 transition-colors"
                        >
                          <Square className="w-5 h-5" />
                        </button>
                        <span className="flex-1 text-gray-800">{task.text}</span>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {completedTasks.length > 0 && (
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
                    <CheckSquare className="w-5 h-5 text-green-500" />
                    <span>Tâches terminées ({completedTasks.length})</span>
                  </h3>
                  <div className="space-y-3">
                    {completedTasks.map((task) => (
                      <div key={task.id} className="flex items-center space-x-3 p-3 bg-green-50 rounded-xl">
                        <button
                          onClick={() => toggleTask(task.id)}
                          className="text-green-500 hover:text-gray-400 transition-colors"
                        >
                          <CheckSquare className="w-5 h-5" />
                        </button>
                        <span className="flex-1 text-gray-600 line-through">{task.text}</span>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-6 border border-white/50 sticky top-24">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
              <Target className="w-5 h-5 text-green-600" />
              <span>Guide rapide</span>
            </h3>
            <div className="space-y-3 text-sm text-gray-700">
              <p className="bg-white/60 rounded-lg p-3">
                ✅ <strong>Conseil :</strong> Note ici toutes tes tâches à accomplir.
              </p>
              <p className="bg-white/60 rounded-lg p-3">
                🎯 <strong>Astuce :</strong> Coche-les une fois terminées pour visualiser tes progrès.
              </p>
              <p className="bg-white/60 rounded-lg p-3">
                📋 <strong>Recommandation :</strong> Divise les grandes tâches en plus petites pour plus d'efficacité.
              </p>
            </div>

            {tasks.length > 0 && (
              <div className="mt-6 bg-white/60 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Statistiques</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total des tâches :</span>
                    <span className="font-medium">{tasks.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Terminées :</span>
                    <span className="font-medium text-green-600">{completedTasks.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>En cours :</span>
                    <span className="font-medium text-orange-600">{pendingTasks.length}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${tasks.length > 0 ? (completedTasks.length / tasks.length) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;