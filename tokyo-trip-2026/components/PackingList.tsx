
import React from 'react';
import { CheckSquare, Square, Luggage } from 'lucide-react';

interface PackingCategory {
  id: string;
  title: string;
  items: string[];
}

const DEFAULT_LIST: PackingCategory[] = [
  { id: 'essentials', title: '🪪 證件財物', items: ['護照', '日幣現金', '信用卡 (海外回饋高)', '西瓜卡 (Suica/Pasmo)', '網卡 / Roaming 設定', 'Visit Japan Web QR Code'] },
  { id: 'electronics', title: '🔌 電子產品', items: ['手機 & 充電線', '行動電源 (需隨身)', '轉接頭 (日本雙孔)', '相機/GoPro', '耳機'] },
  { id: 'clothing', title: '🧥 衣物 (2月)', items: ['發熱衣 x3', '毛衣/帽T', '厚外套/羽絨衣', '圍巾/毛帽', '好走的鞋子', '睡衣', '內衣褲/襪子'] },
  { id: 'toiletries', title: '🧴 盥洗與藥品', items: ['牙刷牙膏', '保養品 (保濕)', '常備藥 (感冒/腸胃/止痛)', 'OK繃/休足時間', '口罩', '洗衣袋'] },
];

interface PackingListProps {
  packedItems: Record<string, boolean>;
  onToggleItem: (item: string) => void;
}

const PackingList: React.FC<PackingListProps> = ({ packedItems, onToggleItem }) => {
  
  const totalItems = DEFAULT_LIST.reduce((acc, cat) => acc + cat.items.length, 0);
  const packedCount = Object.values(packedItems).filter(Boolean).length;
  const progress = Math.round((packedCount / totalItems) * 100);

  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-xl shadow-slate-200/50">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
            <Luggage className="text-indigo-500" /> 行李打包清單
        </h2>
        <div className="text-right">
            <span className="text-3xl font-black text-indigo-500">{progress}%</span>
            <span className="text-xs text-slate-400 block font-bold tracking-wider">COMPLETED</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 h-3 rounded-full mb-8 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-indigo-400 to-purple-400 h-full rounded-full transition-all duration-500 ease-out shadow-sm"
            style={{ width: `${progress}%` }}
          ></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {DEFAULT_LIST.map(category => (
            <div key={category.id} className="bg-slate-50/50 rounded-2xl p-5 border border-slate-200/50">
                <h3 className="font-bold text-slate-700 mb-4 pb-2 border-b border-slate-200">
                    {category.title}
                </h3>
                <ul className="space-y-2">
                    {category.items.map(item => {
                        const isChecked = !!packedItems[item];
                        return (
                            <li 
                                key={item} 
                                onClick={() => onToggleItem(item)}
                                className={`flex items-center gap-3 cursor-pointer p-2.5 rounded-lg transition-colors ${isChecked ? 'text-slate-400 bg-slate-100/50' : 'text-slate-600 hover:bg-white hover:shadow-sm'}`}
                            >
                                {isChecked ? (
                                    <CheckSquare size={20} className="text-indigo-400 shrink-0" />
                                ) : (
                                    <Square size={20} className="text-slate-300 shrink-0" />
                                )}
                                <span className={isChecked ? 'line-through decoration-slate-300' : 'font-medium'}>{item}</span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        ))}
      </div>
    </div>
  );
};

export default PackingList;
