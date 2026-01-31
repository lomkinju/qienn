
import { ExternalLink, Map, QrCode, Train, Coins } from 'lucide-react';
import React from 'react';

const LINKS = [
    { 
        name: 'Visit Japan Web', 
        desc: '入境檢疫、海關申報', 
        url: 'https://www.vjw.digital.go.jp/', 
        icon: QrCode,
        color: 'from-pink-400 to-rose-500'
    },
    { 
        name: 'Google Maps', 
        desc: '東京地圖與導航', 
        url: 'https://www.google.com/maps/@35.6895,139.6917,12z', 
        icon: Map,
        color: 'from-blue-400 to-indigo-500'
    },
    { 
        name: '乘換案內 (Jorudan)', 
        desc: '地鐵/JR 轉乘查詢', 
        url: 'https://world.jorudan.co.jp/mln/zh-tw/', 
        icon: Train,
        color: 'from-green-400 to-emerald-500'
    },
    { 
        name: '匯率即時試算', 
        desc: 'JPY / TWD 即時轉換', 
        url: 'https://www.xe.com/currencyconverter/convert/?Amount=1&From=JPY&To=TWD', 
        icon: Coins,
        color: 'from-yellow-400 to-amber-500'
    }
];

const UsefulLinks: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
      {LINKS.map((link) => (
          <a 
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden bg-white border border-slate-200 rounded-2xl p-5 hover:border-indigo-200 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-100"
          >
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${link.color}`}></div>
              <div className="mb-4 p-3 bg-slate-50 rounded-xl w-fit group-hover:bg-slate-100 transition-colors border border-slate-100">
                  <link.icon size={24} className="text-slate-500 group-hover:text-indigo-600" />
              </div>
              <h3 className="font-bold text-slate-800 flex items-center gap-1">
                  {link.name} <ExternalLink size={12} className="opacity-40" />
              </h3>
              <p className="text-xs text-slate-400 mt-1">{link.desc}</p>
          </a>
      ))}
    </div>
  );
};

export default UsefulLinks;
