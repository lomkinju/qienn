
import React, { useState, useMemo } from 'react';
import { MapPin, AlertCircle, Plus, X, Pencil, Trash2, Folder, Navigation } from 'lucide-react';
import { DayPlan, ItineraryItem } from '../types';

interface DayCardProps {
  day: DayPlan;
  onAddItem: (item: ItineraryItem) => void;
  onUpdateItem: (index: number, item: ItineraryItem) => void;
  onDeleteItem: (index: number) => void;
}

const DayCard: React.FC<DayCardProps> = ({ day, onAddItem, onUpdateItem, onDeleteItem }) => {
  const isPlanned = day.status === 'Planned';
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [time, setTime] = useState('');
  const [activity, setActivity] = useState('');
  const [location, setLocation] = useState(''); 
  const [detail, setDetail] = useState('');
  const [isBackup, setIsBackup] = useState(false); 
  const [isBackupFolderOpen, setIsBackupFolderOpen] = useState(false);

  const mainItems = useMemo(() => day.items.filter(i => !i.isBackup), [day.items]);
  const backupItems = useMemo(() => day.items.filter(i => i.isBackup), [day.items]);

  const handleStartAdd = () => {
    setIsEditing(true);
    setEditIndex(null);
    setTime(''); setActivity(''); setLocation(''); setDetail(''); setIsBackup(false);
  };

  const handleStartEdit = (item: ItineraryItem) => {
    const realIndex = day.items.indexOf(item);
    setIsEditing(true);
    setEditIndex(realIndex);
    setTime(item.time); 
    setActivity(item.activity); 
    setLocation(item.location || ''); 
    setDetail(item.detail); 
    setIsBackup(!!item.isBackup);
  };

  const handleDelete = (item: ItineraryItem) => {
      const realIndex = day.items.indexOf(item);
      if(window.confirm('確定要刪除此行程嗎？')) onDeleteItem(realIndex);
  }

  const handleSave = () => {
    if (!activity) return;
    const newItem: ItineraryItem = { 
        time: time || '待定', 
        activity, 
        location: location.trim() || activity,
        detail: detail || '自訂行程', 
        isBackup 
    };
    if (editIndex !== null) onUpdateItem(editIndex, newItem);
    else onAddItem(newItem);
    setIsEditing(false); setEditIndex(null); setTime(''); setActivity(''); setLocation(''); setDetail(''); setIsBackup(false);
  };

  const openGoogleMaps = (item: ItineraryItem) => {
      const searchQuery = item.location || item.activity;
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchQuery)}`, '_blank');
  };

  const NavigateButton = ({ item }: { item: ItineraryItem }) => (
    <button 
        onClick={() => openGoogleMaps(item)} 
        className="flex items-center gap-1 px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-md text-[10px] font-bold hover:bg-blue-100 dark:hover:bg-blue-800/40 transition-colors border border-blue-100 dark:border-blue-800 shadow-sm whitespace-nowrap shrink-0"
        title="開啟 Google Maps 導航"
    >
        <Navigation size={10} strokeWidth={3} />
        <span>導航</span>
    </button>
  );

  return (
    <div className={`h-full flex flex-col rounded-3xl overflow-hidden transition-all duration-300 relative ${
        isPlanned 
        ? 'bg-white dark:bg-gray-900 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-gray-800' 
        : 'bg-slate-50 dark:bg-gray-950 border-2 border-dashed border-slate-200 dark:border-gray-800'
    }`}>
      <div className={`h-1.5 w-full bg-gradient-to-r ${isPlanned ? 'from-pink-400 via-purple-400 to-indigo-400' : 'from-slate-200 to-slate-300'}`}></div>

      <div className={`p-5 md:p-6 border-b border-slate-100 dark:border-gray-800 shrink-0 ${isPlanned ? 'bg-gradient-to-br from-white to-slate-50 dark:from-gray-900 dark:to-gray-850' : ''}`}>
        <div className="flex justify-between items-start">
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <span className="bg-slate-800 dark:bg-gray-700 text-white px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider">{day.date}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${isPlanned ? 'bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-neon-blue border border-indigo-100 dark:border-indigo-800' : 'bg-slate-200 dark:bg-gray-800 text-slate-500'}`}>{day.dayLabel}</span>
                </div>
                <h2 className="text-xl md:text-2xl font-black text-slate-800 dark:text-white flex items-center gap-2">
                    <span className={`text-2xl ${isPlanned ? '' : 'grayscale opacity-50'}`}>{day.themeIcon}</span>
                    <span className={isPlanned ? "text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400" : "text-slate-400"}>{day.theme}</span>
                </h2>
            </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6 scroll-smooth custom-scrollbar">
        {!isPlanned ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-40 min-h-[150px]">
                <MapPin size={32} />
                <p className="text-xs font-bold uppercase tracking-widest">Unplanned</p>
            </div>
        ) : (
            <>
                {mainItems.length > 0 ? (
                  <div className="relative border-l border-indigo-100 dark:border-gray-800 ml-2 space-y-6 pb-2">
                    {mainItems.map((item, idx) => (
                        <div key={idx} className="relative pl-6 group">
                            <div className="absolute left-[-4.5px] top-1.5 w-2 h-2 rounded-full bg-indigo-500 shadow-sm transition-transform group-hover:scale-125"></div>
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 bg-slate-50/50 dark:bg-gray-800/40 p-4 rounded-xl border border-slate-100 dark:border-gray-800 hover:border-indigo-100 dark:hover:border-indigo-900 transition-all">
                                <div className="flex-1">
                                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                                        <span className="text-indigo-600 dark:text-neon-blue font-mono font-bold text-sm bg-indigo-50 dark:bg-indigo-900/30 px-1.5 rounded">{item.time}</span>
                                        <h3 className="text-base font-bold text-slate-800 dark:text-white flex items-center gap-2">
                                            {item.activity}
                                            <NavigateButton item={item} />
                                        </h3>
                                    </div>
                                    <p className="text-slate-500 dark:text-gray-400 text-xs leading-relaxed whitespace-pre-line">{item.detail}</p>
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => handleStartEdit(item)} className="p-1 text-slate-400 hover:text-indigo-600 dark:hover:text-neon-blue"><Pencil size={14}/></button>
                                    <button onClick={() => handleDelete(item)} className="p-1 text-slate-400 hover:text-red-500"><Trash2 size={14}/></button>
                                </div>
                            </div>
                        </div>
                    ))}
                  </div>
                ) : !isEditing && <p className="text-center text-slate-300 dark:text-gray-700 text-xs py-10">尚無主要行程</p>}

                {backupItems.length > 0 && (
                    <div className="mt-4">
                        <button onClick={() => setIsBackupFolderOpen(!isBackupFolderOpen)} className="w-full flex items-center justify-between p-3 bg-violet-50/50 dark:bg-violet-900/10 border border-violet-100 dark:border-violet-900/30 rounded-xl hover:bg-violet-100 dark:hover:bg-violet-900/20 transition-colors text-xs">
                            <div className="flex items-center gap-2">
                                <Folder className="text-violet-500 dark:text-violet-400" size={14} />
                                <span className="font-bold text-violet-700 dark:text-violet-300">備用方案 ({backupItems.length})</span>
                            </div>
                            <span className={`transition-transform text-violet-400 ${isBackupFolderOpen ? 'rotate-180' : ''}`}>▼</span>
                        </button>
                        {isBackupFolderOpen && (
                            <div className="mt-2 space-y-2 pl-3 animate-in fade-in duration-200">
                                 {backupItems.map((item, idx) => (
                                     <div key={idx} className="bg-white dark:bg-gray-800/60 p-3 rounded-xl border border-violet-100 dark:border-violet-900/20 flex justify-between items-start group shadow-sm text-xs">
                                         <div className="flex-1">
                                             <div className="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-200 mb-1">
                                                 <AlertCircle size={10} className="text-violet-500 dark:text-violet-400" />
                                                 {item.activity}
                                                 <NavigateButton item={item} />
                                             </div>
                                             <p className="text-slate-400 dark:text-gray-500">{item.detail}</p>
                                         </div>
                                         <div className="flex gap-1 opacity-0 group-hover:opacity-100">
                                            <button onClick={() => handleStartEdit(item)} className="p-1 text-slate-400 hover:text-indigo-600 dark:hover:text-neon-blue"><Pencil size={12}/></button>
                                            <button onClick={() => handleDelete(item)} className="p-1 text-slate-400 hover:text-red-500"><Trash2 size={12}/></button>
                                        </div>
                                     </div>
                                 ))}
                            </div>
                        )}
                    </div>
                )}
            </>
        )}
      </div>

      <div className="p-3 border-t border-slate-100 dark:border-gray-800 bg-slate-50/50 dark:bg-gray-900/30 shrink-0">
          {isEditing ? (
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 p-4 shadow-lg space-y-3">
                  <div className="grid grid-cols-4 gap-3">
                      <div>
                          <label className="text-[10px] text-slate-400 dark:text-gray-500 font-bold block mb-1">時間</label>
                          <input type="time" value={time} onChange={e => setTime(e.target.value)} className="w-full bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded p-1.5 text-xs outline-none dark:text-white" />
                      </div>
                      <div className="col-span-3">
                          <label className="text-[10px] text-slate-400 dark:text-gray-500 font-bold block mb-1">活動名稱</label>
                          <input type="text" value={activity} onChange={e => setActivity(e.target.value)} placeholder="例如: 淺草雷門" className="w-full bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded p-1.5 text-xs outline-none focus:border-indigo-400 dark:text-white" />
                      </div>
                  </div>
                  <div>
                      <label className="text-[10px] text-slate-400 dark:text-gray-500 font-bold block mb-1">精確地點 (供地圖連結使用)</label>
                      <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="例如: Sensō-ji" className="w-full bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded p-1.5 text-xs outline-none focus:border-indigo-400 dark:text-white" />
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setIsBackup(!isBackup)} className={`flex-1 py-1.5 rounded text-[10px] font-bold border transition-colors ${isBackup ? 'bg-violet-100 border-violet-300 text-violet-700 dark:bg-violet-900 dark:border-violet-700 dark:text-violet-200' : 'bg-white dark:bg-gray-700 border-slate-200 dark:border-gray-600 text-slate-500 dark:text-gray-300'}`}>
                        {isBackup ? '★ 備用方案' : '設為備用'}
                    </button>
                    <button onClick={handleSave} className="flex-2 py-1.5 bg-indigo-600 dark:bg-neon-blue text-white rounded text-[10px] font-bold px-4 hover:opacity-90 transition-opacity">儲存行程</button>
                    <button onClick={() => setIsEditing(false)} className="px-2 bg-slate-100 dark:bg-gray-700 rounded text-slate-400 dark:text-gray-300"><X size={14}/></button>
                  </div>
              </div>
          ) : (
              <button onClick={handleStartAdd} className={`w-full py-1.5 rounded-lg border border-dashed font-bold transition-all flex items-center justify-center gap-1.5 text-[10px] ${
                  isPlanned ? 'border-indigo-200 dark:border-indigo-800 text-indigo-400 dark:text-neon-blue hover:bg-indigo-50 dark:hover:bg-indigo-900/20' : 'border-slate-300 dark:border-gray-700 text-slate-400 dark:text-gray-600 hover:bg-slate-100 dark:hover:bg-gray-800'
              }`}>
                  <Plus size={12} /> {isPlanned ? '新增行程/備用' : '開始規劃'}
              </button>
          )}
      </div>
    </div>
  );
};

export default DayCard;
