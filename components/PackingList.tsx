
import React from 'react';
import { CheckSquare, Square, Luggage } from 'lucide-react';

interface PackingCategory {
  id: string;
  title: string;
  items: string[];
}

const DEFAULT_LIST: PackingCategory[] = [
  { 
      id: 'essentials', 
      title: '🪪 證件財物', 
      items: [
          '護照正本 (效期 > 6個月)', 
          '護照影本 + 大頭照備用',
          '日幣現金 (1萬/5千/1千分開裝)', 
          '信用卡 x2 (JCB回饋高優先)', 
          '西瓜卡 (Suica/Pasmo) 餘額確認', 
          '網卡/eSim/Wifi分享器', 
          'Visit Japan Web QR截圖',
          '原子筆 (填入境卡備用)',
          '旅遊平安險/不便險保單',
          '緊急聯絡電話/地址'
      ] 
  },
  { 
      id: 'electronics', 
      title: '🔌 電子產品', 
      items: [
          '手機 & 2米充電線', 
          '行動電源 (不可托運)', 
          '多孔快速充電頭 (GaN)', 
          '相機/GoPro & 多張記憶卡', 
          '藍牙耳機 (機上降噪)',
          'Sim 卡針 (換卡必備)',
          '三合一轉接頭 (視需求)',
          '電子秤 (量行李重量)',
          '平板/筆電 & 充電器'
      ] 
  },
  { 
      id: 'clothing', 
      title: '🧥 衣物 (2月預防寒冷)', 
      items: [
          '發熱衣/褲 x4 (極暖)', 
          '厚刷毛衣/針織衫', 
          '羊毛/羽絨長版外套', 
          '防風/防水機能外套',
          '羊毛圍巾/手套/毛帽', 
          '好走的休閒鞋/運動鞋', 
          '防水噴霧 (噴鞋子)',
          '棉質睡衣 (飯店雖有但自備舒服)', 
          '足量內衣褲 & 羊毛襪',
          '太陽眼鏡 (雪地或大太陽)',
          '摺疊傘/輕便雨衣'
      ] 
  },
  { 
      id: 'toiletries', 
      title: '🧴 盥洗與藥品', 
      items: [
          '旅行用牙刷牙膏', 
          '洗面乳/強力保濕乳液/護唇膏', 
          '指甲剪/刮鬍刀/牙線',
          '隱形眼鏡/藥水/生理食鹽水',
          '感冒/退燒/止痛藥 (常用)',
          '胃藥/止瀉/暈車藥', 
          '休足時間/酸痛貼布/小林退燒',
          '口罩 (機上或公共場合)',
          '酒精濕紙巾 (用餐前消毒)',
          '洗衣袋 (分隔髒衣物)'
      ] 
  },
  {
      id: 'misc',
      title: '🎒 其他雜物',
      items: [
          '環保購物袋 (大容量收納)',
          '大垃圾袋 (套行李箱防雨)',
          '保溫瓶/水壺 (喝熱水)',
          '暖暖包 (手握式 & 貼式)',
          '面紙/手帕',
          '行程表紙本 (以防手機沒電)',
          '充氣頸枕 (飛機用)',
          '零食/巧克力 (充飢)'
      ]
  }
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
    <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-xl shadow-slate-200/50">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-black text-slate-800 flex items-center gap-3">
            <Luggage className="text-indigo-500" /> 行李打包清單
        </h2>
        <div className="text-right">
            <span className="text-2xl font-black text-indigo-500">{progress}%</span>
            <span className="text-[10px] text-slate-400 block font-bold tracking-widest uppercase">READY TO GO</span>
        </div>
      </div>

      <div className="w-full bg-slate-100 h-2 rounded-full mb-8 overflow-hidden">
          <div className="bg-indigo-500 h-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DEFAULT_LIST.map(category => (
            <div key={category.id} className="bg-slate-50/50 rounded-2xl p-4 border border-slate-200/50">
                <h3 className="font-bold text-slate-700 text-sm mb-3 pb-1 border-b border-slate-200">
                    {category.title}
                </h3>
                <ul className="space-y-1.5">
                    {category.items.map(item => {
                        const isChecked = !!packedItems[item];
                        return (
                            <li 
                                key={item} 
                                onClick={() => onToggleItem(item)}
                                className={`flex items-center gap-2 cursor-pointer p-1.5 rounded-lg transition-colors text-xs ${isChecked ? 'text-slate-400 bg-slate-100/50' : 'text-slate-600 hover:bg-white hover:shadow-sm'}`}
                            >
                                {isChecked ? <CheckSquare size={16} className="text-indigo-400 shrink-0" /> : <Square size={16} className="text-slate-300 shrink-0" />}
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
