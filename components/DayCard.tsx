
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
  
  // State for form
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [time, setTime] = useState('');
  const [activity, setActivity] = useState('');
  const [detail, setDetail] = useState('');
  const [isBackup, setIsBackup] = useState(false); 

  // State for Backup Folder
  const [isBackupFolderOpen, setIsBackupFolderOpen] = useState(false);

  // Split items into main and backup
  const mainItems = useMemo(() => day.items.filter(i => !i.isBackup), [day.items]);
  const backupItems = useMemo(() => day.items.filter(i => i.isBackup), [day.items]);

  const handleStartAdd = () => {
    setIsEditing(true);
    setEditIndex(null);
    setTime('');
    setActivity('');
    setDetail('');
    setIsBackup(false);
  };

  const handleStartEdit = (index: number, item: ItineraryItem) => {
    const realIndex = day.items.indexOf(item);
    
    setIsEditing(true);
    setEditIndex(realIndex);
    setTime(item.time);
    setActivity(item.activity);
    setDetail(item.detail);
    setIsBackup(!!item.isBackup);
  };

  const handleDelete = (item: ItineraryItem) => {
      const realIndex = day.items.indexOf(item);
      if(window.confirm('確定要刪除此行程嗎？')) {
          onDeleteItem(realIndex);
      }
  }

  const handleSave = () => {
    if (!activity) return;
    
    const newItem: ItineraryItem = {
        time: time || '待定',
        activity: activity,
        detail: detail || '自訂行程',
        isBackup: isBackup
    };

    if (editIndex !== null) {
        onUpdateItem(editIndex, newItem);
    } else {
        onAddItem(newItem);
    }

    // Reset and close form
    setIsEditing(false);
    setEditIndex(null);
    setTime('');
    setActivity('');
    setDetail('');
    setIsBackup(false);
  };

  const handleCancel = () => {
      setIsEditing(false);
      setEditIndex(null);
  }

  const openGoogleMaps = (location: string) => {
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`, '_blank');
  };

  return (
    <div className={`h-full flex flex-col rounded-3xl overflow-hidden transition-all duration-300 relative ${
        isPlanned 
        ? 'bg-white shadow-xl shadow-slate-200/50 border border-slate-100' 
        : 'bg-slate-50 border-2 border-dashed border-slate-200'
    }`}>
      
      {/* Decorative Top Bar */}
      <div className={`h-2 w-full bg-gradient-to-r ${isPlanned ? 'from-pink-400 via-purple-400 to-indigo-400' : 'from-slate-200 to-slate-300'}`}></div>

      {/* Header */}
      <div className={`p-6 md:p-8 border-b border-slate-100 shrink-0 ${isPlanned ? 'bg-gradient-to-br from-white to-slate-50' : ''}`}>
        <div className="flex justify-between items-start">
            <div>
                <div className="flex items-center gap-3 mb-3">
                    <span className="bg-slate-800 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider shadow-sm">
                        {day.date}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${isPlanned ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' : 'bg-slate-200 text-slate-500'}`}>
                        {day.dayLabel}
                    </span>
                    {!isPlanned && (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-600 border border-amber-200 flex items-center gap-1">
                            <AlertCircle size={12} /> 未規劃
                        </span>
                    )}
                </div>
                <h2 className={`text-2xl md:text-4xl font-extrabold mt-2 flex items-center gap-3 ${isPlanned ? 'text-slate-800' : 'text-slate-400'}`}>
                    <span className={`text-3xl md:text-4xl filter drop-shadow-md ${isPlanned ? '' : 'grayscale opacity-50'}`}>{day.themeIcon}</span>
                    <span className={isPlanned ? "text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600" : ""}>{day.theme}</span>
                </h2>
            </div>
            
            {!isPlanned && (
                <div className="hidden md:block opacity-10">
                     <Coffee size={64} className="text-slate-600" />
                </div>
            )}
        </div>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth custom-scrollbar">
        
        {!isPlanned ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6 opacity-60 min-h-[200px]">
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center border-2 border-dashed border-slate-300">
                    <MapPin size={40} className="text-slate-400" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-600">此日行程留白</h3>
                    <p className="text-slate-500 mt-2 text-sm max-w-xs mx-auto leading-relaxed">
                        目前尚未安排具體活動。<br/>您可以點擊下方按鈕加入行程，或保留為自由探索時間。
                    </p>
                </div>
            </div>
        ) : (
            <>
                {/* Main Items */}
                {mainItems.length > 0 ? (
                  <div className="relative border-l-2 border-indigo-100 ml-3 md:ml-4 space-y-8 pb-4">
                    {mainItems.map((item, idx) => (
                        <div key={idx} className="relative pl-8 group">
                            {/* Timeline Dot */}
                            <div className="absolute left-[-9px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-indigo-500 group-hover:scale-110 transition-transform shadow-sm"></div>
                            
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all">
                                <div className="flex-1">
                                    <div className="flex flex-wrap items-baseline gap-3 mb-1">
                                        <span className="text-indigo-600 font-mono font-bold text-lg bg-indigo-50 px-2 rounded">{item.time}</span>
                                        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                            {item.activity}
                                            <button 
                                                onClick={() => openGoogleMaps(item.activity)}
                                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold border border-blue-100 hover:bg-blue-600 hover:text-white transition-colors ml-2"
                                                title="在 Google Maps 開啟"
                                            >
                                                <Navigation size={10} /> 導航
                                            </button>
                                        </h3>
                                    </div>
                                    <p className="text-slate-500 text-sm leading-relaxed whitespace-pre-line mt-2">{item.detail}</p>
                                </div>
                                
                                {/* Edit Actions */}
                                <div className="flex gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity self-end sm:self-start">
                                    <button onClick={() => handleStartEdit(0, item)} className="p-2 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-indigo-600 shadow-sm"><Pencil size={16}/></button>
                                    <button onClick={() => handleDelete(item)} className="p-2 bg-white border border-slate-200 hover:bg-red-50 rounded-lg text-slate-500 hover:text-red-500 shadow-sm"><Trash2 size={16}/></button>
                                </div>
                            </div>
                        </div>
                    ))}
                  </div>
                ) : (
                    !isEditing && (
                        <div className="h-40 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl mb-6 bg-slate-50/50">
                            <MapPin size={32} className="mb-2 opacity-50" />
                            <p>尚無主要行程</p>
                        </div>
                    )
                )}

                {/* Backup Folder */}
                {backupItems.length > 0 && (
                    <div className="mt-8">
                        <button 
                            onClick={() => setIsBackupFolderOpen(!isBackupFolderOpen)}
                            className="w-full flex items-center justify-between p-4 bg-violet-50 border border-violet-100 rounded-xl hover:bg-violet-100 transition-colors group"
                        >
                            <div className="flex items-center gap-3">
                                {isBackupFolderOpen ? <FolderOpen className="text-violet-500" /> : <Folder className="text-violet-500" />}
                                <span className="font-bold text-violet-700">備用方案資料夾</span>
                                <span className="bg-white text-violet-600 px-2 py-0.5 rounded-md text-xs font-bold border border-violet-200 shadow-sm">
                                    {backupItems.length} 個項目
                                </span>
                            </div>
                            <span className={`text-violet-400 transition-transform ${isBackupFolderOpen ? 'rotate-180' : ''}`}>▼</span>
                        </button>

                        {isBackupFolderOpen && (
                            <div className="mt-4 space-y-3 pl-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                 {backupItems.map((item, idx) => (
                                     <div key={idx} className="bg-white p-4 rounded-xl border border-violet-100 flex justify-between items-start group shadow-sm">
                                         <div>
                                             <div className="flex items-center gap-2 mb-1">
                                                 <AlertCircle size={14} className="text-violet-500" />
                                                 <span className="text-slate-800 font-bold">{item.activity}</span>
                                                 <button 
                                                    onClick={() => openGoogleMaps(item.activity)}
                                                    className="text-slate-400 hover:text-blue-500 p-1"
                                                    title="導航"
                                                 >
                                                     <Navigation size={12} />
                                                 </button>
                                             </div>
                                             <p className="text-slate-500 text-sm">{item.detail}</p>
                                         </div>
                                         <div className="flex gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => handleStartEdit(0, item)} className="p-1.5 hover:bg-slate-100 rounded text-slate-400 hover:text-indigo-600"><Pencil size={14}/></button>
                                            <button onClick={() => handleDelete(item)} className="p-1.5 hover:bg-red-50 rounded text-slate-400 hover:text-red-500"><Trash2 size={14}/></button>
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

      {/* Footer / Add Action */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50 shrink-0">
          {isEditing ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xl shadow-slate-200/50 animate-in slide-in-from-bottom-5 duration-300">
                  <div className="flex justify-between items-center mb-4">
                      <h4 className="text-indigo-600 font-bold flex items-center gap-2">
                        {editIndex !== null ? <Pencil size={18} /> : <Plus size={18} />}
                        {editIndex !== null ? '編輯項目' : '新增項目'}
                      </h4>
                      <button onClick={handleCancel} className="text-slate-400 hover:text-slate-700 bg-slate-100 p-1 rounded-full"><X size={16} /></button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                          <label className="text-xs text-slate-500 font-bold block mb-1.5">時間</label>
                          <input type="time" value={time} onChange={e => setTime(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 outline-none text-sm transition-all" />
                      </div>
                      <div className="col-span-2">
                          <label className="text-xs text-slate-500 font-bold block mb-1.5">活動名稱</label>
                          <input type="text" value={activity} onChange={e => setActivity(e.target.value)} placeholder="輸入行程名稱..." className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 outline-none text-sm transition-all" />
                      </div>
                  </div>
                  <div className="mb-4">
                      <label className="text-xs text-slate-500 font-bold block mb-1.5">細節備註</label>
                      <textarea rows={2} value={detail} onChange={e => setDetail(e.target.value)} placeholder="輸入備註或注意事項..." className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 outline-none text-sm resize-none transition-all" />
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                      <button
                          type="button"
                          onClick={() => setIsBackup(!isBackup)}
                          className={`
                              flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 group select-none
                              ${isBackup 
                                  ? 'bg-violet-50 border-violet-300 text-violet-700' 
                                  : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                              }
                          `}
                      >
                          <div className="relative">
                              <Folder size={18} className={isBackup ? 'fill-violet-200' : ''} />
                              <div className={`absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-sm transition-colors ${isBackup ? 'bg-violet-500 text-white' : 'bg-slate-200 text-slate-500 group-hover:bg-slate-300'}`}>
                                  <span className="text-[9px] font-bold">!</span>
                              </div>
                          </div>
                          <span className="text-sm font-bold">{isBackup ? '已設為備用' : '備用方案'}</span>
                      </button>

                      <button 
                          onClick={handleSave} 
                          disabled={!activity} 
                          className={`px-6 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 transition-all shadow-md ${activity ? 'bg-indigo-600 text-white hover:bg-indigo-500 hover:shadow-indigo-200' : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'}`}
                      >
                          <Save size={18} /> 儲存
                      </button>
                  </div>
              </div>
          ) : (
              <button onClick={handleStartAdd} className={`w-full py-3 rounded-xl border-2 border-dashed font-bold transition-all flex items-center justify-center gap-2 text-sm ${
                  isPlanned 
                  ? 'border-indigo-200 text-indigo-400 hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50/50' 
                  : 'border-slate-300 text-slate-400 hover:border-amber-400 hover:text-amber-500 hover:bg-amber-50/50'
              }`}>
                  <div className="bg-white p-1 rounded-full shadow-sm"><Plus size={16} /></div> 
                  {isPlanned ? '新增行程 / 備用方案' : '開始規劃行程'}
              </button>
          )}
      </div>

    </div>
  );
};

export default DayCard;
