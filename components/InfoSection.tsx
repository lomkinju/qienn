import React, { useState } from 'react';
import { Info, ChevronDown } from 'lucide-react';

const InfoSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-xl overflow-hidden shadow-lg border border-indigo-500/30 bg-gray-800 hover:bg-gray-800/80 transition-colors">
      <div
        className="p-4 flex justify-between items-center cursor-pointer select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
            <div className="bg-yellow-500/20 p-2 rounded-full">
                 <Info className="text-yellow-400" size={20} />
            </div>
          <div>
            <div className="text-xs font-semibold text-yellow-500 uppercase tracking-wider">Travel Notes</div>
            <div className="text-lg font-bold text-white">必讀提醒與注意事項</div>
          </div>
        </div>
        <ChevronDown
          className={`text-yellow-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          size={24}
        />
      </div>
      
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-5 bg-gray-900/50 border-t border-gray-700">
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex gap-2">
                <span className="font-bold text-blue-400 shrink-0">🚇 交通：</span>
                <span>請準備 Suica/Pasmo。東京地鐵複雜，請搭配 Google Maps，留意末班車。</span>
            </li>
            <li className="flex gap-2">
                <span className="font-bold text-green-400 shrink-0">🏠 住宿：</span>
                <span>務必遵守房東的<b>垃圾分類</b>規定，晚上 10 點後保持安靜。</span>
            </li>
            <li className="flex gap-2">
                <span className="font-bold text-red-400 shrink-0">🌡️ 氣候：</span>
                <span>2月均溫 0°C ~ 10°C。請準備<b>厚外套、發熱衣</b>、手套。</span>
            </li>
            <li className="flex gap-2">
                <span className="font-bold text-yellow-400 shrink-0">💴 金錢：</span>
                <span>多換日幣現金，小店常只收現金。大額購物詢問<b>退稅</b>。</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;