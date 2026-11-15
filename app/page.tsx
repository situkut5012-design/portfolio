'use client';

import { useState } from 'react';

{/* HTML版へ移動するボタン */}
<div className="mb-6 text-center">
  <a
    href="/portfolio/html-version/" // ※ご自身のGitHubリポジトリ名に合わせて調整
    className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg text-sm transition shadow-sm"
  >
    📁 1日目のHTML/JS版ポートフォリオを見る
  </a>
</div>

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState('');

  // タスクを追加する関数
  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const newTask: Task = {
      id: Date.now(), // 現在時刻をユニークなIDにする
      text: input,
      completed: false,
    };

    setTasks([...tasks, newTask]); // 既存のリストに新しいタスクを追加
    setInput(''); // 入力欄を空にする
  };

  // タスクの完了状態を切り替える関数
  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // タスクを削除する関数
  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 flex justify-center">
      <div className="max-w-xl w-full bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">私のポートフォリオ（Next.js版）</h1>
        <p className="text-sm text-gray-500 mb-6">1ヶ月で自走できる開発者へ挑戦中</p>

        {/* 自己紹介エリア */}
        <div className="mb-6">
          <h2 className="text-base font-semibold text-blue-500 border-b pb-1 mb-2">🎯 目指す方向</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            自分の頭でロジックを考え、クリエイティブに価値を創り出すWebエンジニアを目指しています。
          </p>
        </div>

        {/* ここからToDoリスト機能 */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <h2 className="text-base font-semibold text-gray-800 mb-4">📝 本日の学習タスク管理</h2>
          
          <form onSubmit={addTask} className="flex gap-2 mb-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="例：Next.jsの仕組みを理解する"
              className="flex-1 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg text-sm transition"
            >
              追加
            </button>
          </form>

          <ul className="space-y-2">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-lg border"
              >
                <span
                  onClick={() => toggleTask(task.id)}
                  className={`cursor-pointer text-sm flex-1 ${
                    task.completed ? 'line-through text-gray-400' : 'text-gray-700'
                  }`}
                >
                  {task.text}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`text-xs px-2 py-1 rounded ${
                      task.completed ? 'bg-gray-200 text-gray-600' : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {task.completed ? '未了に戻す' : '完了'}
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded hover:bg-red-200"
                  >
                    削除
                  </button>
                </div>
              </li>
            ))}
            {tasks.length === 0 && (
              <p className="text-center text-sm text-gray-400 py-4">タスクはまだありません。上のフォームから追加してみよう！</p>
            )}
          </ul>
        </div>
      </div>
    </main>
  );
}