'use client';

import { useState, useEffect } from 'react';

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [input, setInput] = useState('');
  
  // ★追加：ダークモードの状態（初期値はfalse＝ライトモード）
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 1. ページがブラウザに表示された瞬間（マウント後）に保存データを読み込む
  useEffect(() => {
    const savedTasks = localStorage.getItem('portfolio_tasks');
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (e) {
        console.error('データの読み込みに失敗しました', e);
      }
    }

    // ついでに保存されていたダークモード設定があれば復元する
    const savedTheme = localStorage.getItem('portfolio_dark_mode');
    if (savedTheme === 'true') {
      setIsDarkMode(true);
    }

    setIsInitialized(true);
  }, []);

  // 2. tasksやテーマが変わったら自動保存する
  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem('portfolio_tasks', JSON.stringify(tasks));
    localStorage.setItem('portfolio_dark_mode', String(isDarkMode));
  }, [tasks, isDarkMode, isInitialized]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const newTask: Task = {
      id: Date.now(),
      text: input,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setInput('');
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const clearCompletedTasks = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const remainingCount = tasks.filter((task) => !task.completed).length;

  return (
    <main className={`min-h-screen py-12 px-4 flex justify-center transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      <div className={`max-w-xl w-full p-8 rounded-xl shadow-md transition-colors duration-300 ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}>
        
        {/* ヘッダーエリア（タイトル ＆ ダークモード切替ボタン） */}
        <div className="flex justify-between items-start mb-2">
          <div>
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>私のポートフォリオ（Next.js版）</h1>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>1ヶ月で自走できる開発者へ挑戦中</p>
          </div>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition border ${
              isDarkMode 
                ? 'bg-yellow-500 text-gray-900 border-yellow-400 hover:bg-yellow-400' 
                : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
            }`}
          >
            {isDarkMode ? '☀️ ライトモード' : '🌙 ダークモード'}
          </button>
        </div>

        <div className="mb-6 mt-4">
          <div className={`text-base font-semibold border-b pb-1 mb-2 ${isDarkMode ? 'text-blue-400 border-gray-700' : 'text-blue-500 border-gray-200'}`}>🎯 目指す方向</div>
          <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            自分の頭でロジックを考え、クリエイティブに価値を創り出すWebエンジニアを目指しています。
          </p>
        </div>

        {/* 📁 1日目のHTML版へ移動するボタン */}
        <div className="mb-6">
          <a
            href="/html-version/index.html"
            className={`block text-center font-semibold py-2 px-4 rounded-lg text-sm transition border ${
              isDarkMode 
                ? 'bg-gray-700 text-gray-200 border-gray-600 hover:bg-gray-600' 
                : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
            }`}
          >
            📁 1日目のHTML/JS版ポートフォリオを見る
          </a>
        </div>

        {/* ToDoリスト機能 */}
        <div className={`mt-8 pt-6 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
          <h2 className={`text-base font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>📝 本日の学習タスク管理</h2>
          
          <form onSubmit={addTask} className="flex gap-2 mb-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="例：Next.jsの仕組みを理解する"
              className={`flex-1 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-800'
              }`}
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg text-sm transition"
            >
              追加
            </button>
          </form>

          {tasks.length > 0 && (
            <div className={`flex justify-between items-center mb-4 text-xs p-2.5 rounded-lg border ${
              isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-500'
            }`}>
              <span>残りタスク: <strong className="text-blue-400">{remainingCount}件</strong> / 全体: {tasks.length}件</span>
              <button
                onClick={clearCompletedTasks}
                className="hover:text-red-400 transition underline"
              >
                完了済みのタスクを一括削除
              </button>
            </div>
          )}

          <ul className="space-y-2">
            {tasks.map((task) => (
              <li
                key={task.id}
                className={`flex justify-between items-center px-4 py-3 rounded-lg border transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-gray-200' 
                    : 'bg-gray-50 border-gray-200 text-gray-700'
                }`}
              >
                <span
                  onClick={() => toggleTask(task.id)}
                  className={`cursor-pointer text-sm flex-1 ${
                    task.completed 
                      ? (isDarkMode ? 'line-through text-gray-500' : 'line-through text-gray-400') 
                      : ''
                  }`}
                >
                  {task.text}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`text-xs px-2 py-1 rounded transition ${
                      task.completed 
                        ? (isDarkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600') 
                        : (isDarkMode ? 'bg-green-900 text-green-300 hover:bg-green-800' : 'bg-green-100 text-green-700 hover:bg-green-200')
                    }`}
                  >
                    {task.completed ? '未了に戻す' : '完了'}
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className={`text-xs px-2 py-1 rounded transition ${
                      isDarkMode 
                        ? 'bg-red-900 text-red-300 hover:bg-red-800' 
                        : 'bg-red-100 text-red-600 hover:bg-red-200'
                    }`}
                  >
                    削除
                  </button>
                </div>
              </li>
            ))}
            {tasks.length === 0 && (
              <p className={`text-center text-sm py-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>タスクはまだありません。上のフォームから追加してみよう！</p>
            )}
          </ul>
        </div>
      </div>
    </main>
  );
}