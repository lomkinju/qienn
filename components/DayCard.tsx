
import React, { useState, useMemo } from 'react';
import { MapPin, AlertCircle, Plus, X, Save, Pencil, Trash2, FolderOpen, Folder, Navigation, Coffee } from 'lucide-react';
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
  const [detail, setDetail] = useState('');
  const [isBackup, setIsBackup] = useState(false); 
  const [isBackupFolderOpen, setIsBackupFolderOpen] = useState(false);

  const mainItems = useMemo(() => day.items.filter(i => !i.isBackup), [day.items]);
  const backupItems = useMemo(() => day.items.filter(i => i.isBackup), [day.items]);

  const handleStartAdd = () => {
    setIsEditing(true);
    setEditIndex(null);
    setTime(''); setActivity(''); setDetail(''); setIsBackup(false);
  };

  const handleStartEdit = (index: number, item: ItineraryItem) => {
    const realIndex = day.items.indexOf(item);
    setIsEditing(true);
    setEditIndex(realIndex);
    setTime(item.time); setActivity(item.activity); setDetail(item.detail); setIsBackup(!!item.isBackup);
  };

  const handleDelete = (item: ItineraryItem) => {
      const realIndex = day.items.indexOf(item);
      if(window.confirm('確定要刪除此行程嗎？')) onDeleteItem(realIndex);
  }

  const handleSave = () => {
    if (!activity) return;
    const newItem: ItineraryItem = { time: time || '待定', activity, detail: detail || '自訂行程', isBackup };
    if (editIndex !== null) onUpdateItem(editIndex, newItem);
    else onAddItem(newItem);
    setIsEditing(false); setEditIndex(null); setTime(''); setActivity(''); setDetail(''); setIsBackup(false);
  };

  const openGoogleMaps = (location: string) => {
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`, '_blank');
  };

  return (
    <div className={`h-full flex flex-col rounded-3xl overflow-hidden transition-all duration-300 relative ${
        isPlanned 
        ? 'bg-white shadow-xl shadow-slate-200/50 border border-slate-100' 
        : 'bg-slate-50 border-2 border-dashed border-slate-200'
    }`}>
      <div className={`h-1.5 w-full bg-gradient-to-r ${isPlanned ? 'from-pink-400 via-purple-400 to-indigo-400' : 'from-slate-200 to-slate-300'}`}></div>

      <div className={`p-5 md:p-6 border-b border-slate-100 shrink-0 ${isPlanned ? 'bg-gradient-to-br from-white to-slate-50' : ''}`}>
        <div className="flex justify-between items-start">
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <span className="bg-slate-800 text-white px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider">{day.date}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${isPlanned ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' : 'bg-slate-200 text-slate-500'}`}>{day.dayLabel}</span>
                </div>
                <h2 className="text-xl md:text-2xl font-black text-slate-800 flex items-center gap-2">
                    <span className={`text-2xl ${isPlanned ? '' : 'grayscale opacity-50'}`}>{day.themeIcon}</span>
                    <span className={isPlanned ? "text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600" : "text-slate-400"}>{day.theme}</span>
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
                  <div className="relative border-l border-indigo-100 ml-2 space-y-6 pb-2">
                    {mainItems.map((item, idx) => (
                        <div key={idx} className="relative pl-6 group">
                            <div className="absolute left-[-4.5px] top-1.5 w-2 h-2 rounded-full bg-indigo-500 shadow-sm transition-transform group-hover:scale-125"></div>
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 bg-slate-50/50 p-4 rounded-xl border border-slate-100 hover:border-indigo-100 transition-all">
                                <div className="flex-1">
                                    <div className="flex flex-wrap items-baseline gap-2 mb-1">
                                        <span className="text-indigo-600 font-mono font-bold text-sm bg-indigo-50 px-1.5 rounded">{item.time}</span>
                                        <h3 className="text-base font-bold text-slate-800 flex items-center gap-1.5">
                                            {item.activity}
                                            <button onClick={() => openGoogleMaps(item.activity)} className="text-blue-400 hover:text-blue-600"><Navigation size={10} /></button>
                                        </h3>
                                    </div>
                                    <p className="text-slate-500 text-xs leading-relaxed whitespace-pre-line">{item.detail}</p>
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => handleStartEdit(0, item)} className="p-1 hover:text-indigo-600"><Pencil size={12}/></button>
                                    <button onClick={() => handleDelete(item)} className="p-1 hover:text-red-500"><Trash2 size={12}/></button>
                                </div>
                            </div>
                        </div>
                    ))}
                  </div>
                ) : !isEditing && <p className="text-center text-slate-300 text-xs py-10">尚無主要行程</p>}

                {backupItems.length > 0 && (
                    <div className="mt-4">
                        <button onClick={() => setIsBackupFolderOpen(!isBackupFolderOpen)} className="w-full flex items-center justify-between p-3 bg-violet-50/50 border border-violet-100 rounded-xl hover:bg-violet-100 transition-colors text-xs">
                            <div className="flex items-center gap-2">
                                <Folder className="text-violet-500" size={14} />
                                <span className="font-bold text-violet-700">備用方案 ({backupItems.length})</span>
                            </div>
                            <span className={`transition-transform ${isBackupFolderOpen ? 'rotate-180' : ''}`}>▼</span>
                        </button>
                        {isBackupFolderOpen && (
                            <div className="mt-2 space-y-2 pl-3 animate-in fade-in duration-200">
                                 {backupItems.map((item, idx) => (
                                     <div key={idx} className="bg-white p-3 rounded-xl border border-violet-100 flex justify-between items-start group shadow-sm text-xs">
                                         <div>
                                             <div className="flex items-center gap-1.5 font-bold text-slate-700 mb-0.5">
                                                 <AlertCircle size={10} className="text-violet-500" />
                                                 {item.activity}
                                             </div>
                                             <p className="text-slate-400">{item.detail}</p>
                                         </div>
                                         <div className="flex gap-1 opacity-0 group-hover:opacity-100">
                                            <button onClick={() => handleStartEdit(0, item)} className="p-1 hover:text-indigo-600"><Pencil size={10}/></button>
                                            <button onClick={() => handleDelete(item)} className="p-1 hover:text-red-500"><Trash2 size={10}/></button>
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

      <div className="p-3 border-t border-slate-100 bg-slate-50/50 shrink-0">
          {isEditing ? (
              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-lg">
                  <div className="grid grid-cols-3 gap-3 mb-3">
                      <div>
                          <label className="text-[10px] text-slate-400 font-bold block mb-1">時間</label>
                          <input type="time" value={time} onChange={e => setTime(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 text-xs outline-none" />
                      </div>
                      <div className="col-span-2">
                          <label className="text-[10px] text-slate-400 font-bold block mb-1">活動</label>
                          <input type="text" value={activity} onChange={e => setActivity(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 text-xs outline-none" />
                      </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setIsBackup(!isBackup)} className={`flex-1 py-1.5 rounded text-[10px] font-bold border transition-colors ${isBackup ? 'bg-violet-100 border-violet-300 text-violet-700' : 'bg-white border-slate-200 text-slate-500'}`}>
                        {isBackup ? '★ 備用方案' : '設為備用'}
                    </button>
                    <button onClick={handleSave} className="flex-1 py-1.5 bg-indigo-600 text-white rounded text-[10px] font-bold">儲存</button>
                    <button onClick={() => setIsEditing(false)} className="px-2 bg-slate-100 rounded text-slate-400"><X size={14}/></button>
                  </div>
              </div>
          ) : (
              <button onClick={handleStartAdd} className={`w-full py-1.5 rounded-lg border border-dashed font-bold transition-all flex items-center justify-center gap-1.5 text-[10px] ${
                  isPlanned ? 'border-indigo-200 text-indigo-400 hover:bg-indigo-50' : 'border-slate-300 text-slate-400 hover:bg-slate-100'
              }`}>
                  <Plus size={12} /> {isPlanned ? '新增行程/備用' : '開始規劃'}
              </button>
          )}
      </div>
    </div>
  );
};

export default DayCard;
