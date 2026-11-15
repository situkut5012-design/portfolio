'use client';

import { useState, useEffect } from 'react';

export default function SkillsPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio_dark_mode');
    if (savedTheme === 'true') {
      setIsDarkMode(true);
    }
  }, []);

  return (
    <main className={`min-h-screen py-12 px-4 flex justify-center transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      <div className={`max-w-xl w-full p-8 rounded-xl shadow-md transition-colors duration-300 ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}>
        
        {/* ヘッダー */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>スキル・経歴</h1>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>学習中の技術スタックと実績</p>
          </div>
          <a
            href="/"
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition shadow-sm"
          >
            🏠 ホームに戻る
          </a>
        </div>

        {/* スキルリスト */}
        <div className="space-y-4">
          <div className={`p-4 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
            <h2 className={`font-semibold mb-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>🚀 フロントエンド技術</h2>
            <ul className={`list-disc list-inside text-sm space-y-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <li>Next.js (App Router)</li>
              <li>TypeScript</li>
              <li>Tailwind CSS</li>
              <li>React (useState, useEffect)</li>
            </ul>
          </div>

          <div className={`p-4 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
            <h2 className={`font-semibold mb-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>🛠 ツール・開発環境</h2>
            <ul className={`list-disc list-inside text-sm space-y-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <li>Git / GitHub</li>
              <li>VS Code</li>
              <li>Vercel (本番デプロイ・運用)</li>
            </ul>
          </div>
        </div>

      </div>
    </main>
  );
}