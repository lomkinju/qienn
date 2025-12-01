
import React, { useState } from 'react';
import { Info, ChevronDown } from 'lucide-react';

const InfoSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100 bg-white transition-colors">
      <div
        className="p-6 flex justify-between items-center cursor-pointer select-none hover:bg-slate-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-4">
            <div className="bg-yellow-50 p-2.5 rounded-full border border-yellow-100">
                 <Info className="text-yellow-500" size={24} />
            </div>
          <div>
            <div className="text-xs font-bold text-yellow-600 uppercase tracking-wider mb-0.5">Travel Notes</div>
            <div className="text-lg font-bold text-slate-800">必讀提醒與注意事項</div>
          </div>
        </div>
        <ChevronDown
          className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          size={24}
        />
      </div>
      
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-6 bg-slate-50/50 border-t border-slate-100">
          <ul className="space-y-4 text-sm text-slate-600">
            <li className="flex gap-3">
                <span className="font-bold text-blue-500 shrink-0 bg-blue-50 px-2 py-0.5 rounded text-xs h-fit border border-blue-100">🚇 交通</span>
                <span className="leading-relaxed">請準備 Suica/Pasmo。東京地鐵複雜，請搭配 Google Maps，留意末班車。</span>
            </li>
            <li className="flex gap-3">
                <span className="font-bold text-green-500 shrink-0 bg-green-50 px-2 py-0.5 rounded text-xs h-fit border border-green-100">🏠 住宿</span>
                <span className="leading-relaxed">務必遵守房東的<b>垃圾分類</b>規定，晚上 10 點後保持安靜。</span>
            </li>
            <li className="flex gap-3">
                <span className="font-bold text-red-500 shrink-0 bg-red-50 px-2 py-0.5 rounded text-xs h-fit border border-red-100">🌡️ 氣候</span>
                <span className="leading-relaxed">2月均溫 0°C ~ 10°C。請準備<b>厚外套、發熱衣</b>、手套。</span>
            </li>
            <li className="flex gap-3">
                <span className="font-bold text-yellow-500 shrink-0 bg-yellow-50 px-2 py-0.5 rounded text-xs h-fit border border-yellow-100">💴 金錢</span>
                <span className="leading-relaxed">多換日幣現金，小店常只收現金。大額購物詢問<b>退稅</b>。</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
