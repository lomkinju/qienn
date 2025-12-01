import React from 'react';
import { AlertTriangle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-12 mb-8 text-center">
        <div className="inline-flex items-center gap-3 bg-gray-800/80 backdrop-blur border border-red-900/50 p-4 rounded-xl max-w-2xl mx-auto shadow-lg">
            <div className="bg-red-500/10 p-2 rounded-full">
                <AlertTriangle className="text-red-400" size={20} />
            </div>
            <div className="text-left">
                <p className="text-red-200 text-sm font-semibold">📢 離境日提醒 (2/16)</p>
                <p className="text-gray-400 text-xs mt-0.5">回程班機 19:55。建議最遲於 16:00 前從北千住出發前往成田機場 (NRT)。</p>
            </div>
        </div>
        <div className="mt-6 text-gray-600 text-xs">
            © 2026 Tokyo Trip Planner • Built for Wu Chi-En & Friends
        </div>
    </footer>
  );
};

export default Footer;