
import React from 'react';
import { ExternalLink, Map, QrCode, Train, Coins } from 'lucide-react';

const LINKS = [
    { 
        name: 'Visit Japan Web', 
        desc: '入境檢疫、海關申報', 
        url: 'https://vjw-lp.digital.go.jp/zh-hant/', 
        icon: QrCode,
        color: 'from-pink-500 to-rose-600'
    },
    { 
        name: 'Google Maps', 
        desc: '東京地圖與導航', 
        url: 'https://goo.gl/maps/tokyo', 
        icon: Map,
        color: 'from-blue-500 to-indigo-600'
    },
    { 
        name: '乘換案內 (Jorudan)', 
        desc: '電車轉乘查詢', 
        url: 'https://world.jorudan.co.jp/mln/zh-tw/', 
        icon: Train,
        color: 'from-green-500 to-emerald-600'
    },
    { 
        name: '匯率試算', 
        desc: 'JPY / TWD 即時匯率', 
        url: 'https://rate.bot.com.tw/xrt?Lang=zh-TW', 
        icon: Coins,
        color: 'from-yellow-500 to-amber-600'
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
            className="group relative overflow-hidden bg-gray-800 border border-gray-700 rounded-xl p-4 hover:border-gray-500 transition-all hover:-translate-y-1 hover:shadow-xl"
          >
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${link.color}`}></div>
              <div className="mb-3 p-3 bg-gray-900 rounded-lg w-fit group-hover:bg-gray-700 transition-colors">
                  <link.icon size={24} className="text-gray-300 group-hover:text-white" />
              </div>
              <h3 className="font-bold text-white flex items-center gap-1">
                  {link.name} <ExternalLink size={12} className="opacity-50" />
              </h3>
              <p className="text-xs text-gray-400 mt-1">{link.desc}</p>
          </a>
      ))}
    </div>
  );
};

export default UsefulLinks;
