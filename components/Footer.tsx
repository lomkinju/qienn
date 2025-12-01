
import React from 'react';
import { AlertTriangle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-12 mb-8 text-center">
        <div className="inline-flex items-center gap-4 bg-white/80 backdrop-blur border border-red-100 p-4 rounded-2xl max-w-2xl mx-auto shadow-lg shadow-red-50">
            <div className="bg-red-50 p-2.5 rounded-full border border-red-100">
                <AlertTriangle className="text-red-500" size={20} />
            </div>
            <div className="text-left">
                <p className="text-red-500 text-sm font-bold">📢 離境日提醒 (2/16)</p>
                <p className="text-slate-500 text-xs mt-0.5">回程班機 19:55。建議最遲於 16:00 前從北千住出發前往成田機場 (NRT)。</p>
            </div>
        </div>
        <div className="mt-6 text-slate-400 text-xs font-medium">
            © 2026 Tokyo Trip Planner • Built for Wu Chi-En & Friends
        </div>
    </footer>
  );
};

export default Footer;
