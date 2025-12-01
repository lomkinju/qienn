
import React, { useState, useMemo } from 'react';
import { MapPin, AlertCircle, Plus, X, Save, Pencil, Trash2, FolderOpen, Folder, Calendar, Navigation, Coffee } from 'lucide-react';
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
  const [isBackup, setIsBackup] = useState(false); // New state for backup checkbox

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
    // We need to find the real index in the original array
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
    <div className={`h-full flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 relative ${
        isPlanned 
        ? 'bg-gray-800/80 border-gray-700 shadow-2xl' 
        : 'bg-gray-800/30 border-gray-700/30 border-dashed'
    }`}>
      
      {/* Decorative Top Bar */}
      <div className={`h-2 w-full bg-gradient-to-r ${isPlanned ? 'from-indigo-500 via-purple-500 to-pink-500' : 'from-gray-700 to-gray-800'}`}></div>

      {/* Header Page-like */}
      <div className={`p-6 md:p-8 border-b border-gray-700/50 shrink-0 ${isPlanned ? 'bg-gray-900/30' : 'bg-transparent'}`}>
        <div className="flex justify-between items-start">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <span className="bg-gray-700/50 text-gray-300 px-3 py-1 rounded-full text-xs font-bold tracking-wider border border-gray-600">
                        {day.date}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${isPlanned ? 'bg-indigo-900/40 text-indigo-300' : 'bg-gray-700 text-gray-400'}`}>
                        {day.dayLabel}
                    </span>
                    {!isPlanned && (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-900/30 text-amber-500 border border-amber-700/50 flex items-center gap-1">
                            <AlertCircle size={12} /> 未規劃
                        </span>
                    )}
                </div>
                <h2 className={`text-2xl md:text-4xl font-extrabold mt-2 flex items-center gap-3 ${isPlanned ? 'text-white' : 'text-gray-500'}`}>
                    <span className={`text-3xl md:text-4xl filter drop-shadow-lg ${isPlanned ? '' : 'grayscale opacity-50'}`}>{day.themeIcon}</span>
                    <span className={isPlanned ? "text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400" : ""}>{day.theme}</span>
                </h2>
            </div>
            
            {!isPlanned && (
                <div className="hidden md:block opacity-20">
                     <Coffee size={64} className="text-gray-500" />
                </div>
            )}
        </div>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth custom-scrollbar">
        
        {!isPlanned ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6 opacity-60 min-h-[200px]">
                <div className="w-24 h-24 bg-gray-800/50 rounded-full flex items-center justify-center border-2 border-dashed border-gray-700">
                    <MapPin size={40} className="text-gray-500" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-300">此日行程留白</h3>
                    <p className="text-gray-500 mt-2 text-sm max-w-xs mx-auto leading-relaxed">
                        目前尚未安排具體活動。<br/>您可以點擊下方按鈕加入行程，或保留為自由探索時間。
                    </p>
                </div>
            </div>
        ) : (
            <>
                {/* Main Items */}
                {mainItems.length > 0 ? (
                  <div className="relative border-l-2 border-indigo-500/20 ml-3 md:ml-4 space-y-8 pb-4">
                    {mainItems.map((item, idx) => (
                        <div key={idx} className="relative pl-8 group">
                            {/* Timeline Dot */}
                            <div className="absolute left-[-9px] top-1.5 w-4 h-4 rounded-full bg-gray-900 border-2 border-indigo-500 group-hover:bg-indigo-500 transition-colors shadow-[0_0_10px_rgba(99,102,241,0.4)]"></div>
                            
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 bg-gray-700/20 p-4 rounded-xl border border-transparent hover:border-gray-600 transition-all">
                                <div className="flex-1">
                                    <div className="flex flex-wrap items-baseline gap-3 mb-1">
                                        <span className="text-indigo-300 font-mono font-bold text-lg">{item.time}</span>
                                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                            {item.activity}
                                            <button 
                                                onClick={() => openGoogleMaps(item.activity)}
                                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-900/30 text-blue-400 text-[10px] font-bold border border-blue-800 hover:bg-blue-600 hover:text-white transition-colors ml-2"
                                                title="在 Google Maps 開啟"
                                            >
                                                <Navigation size={10} /> 導航
                                            </button>
                                        </h3>
                                    </div>
                                    <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line">{item.detail}</p>
                                </div>
                                
                                {/* Edit Actions */}
                                <div className="flex gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity self-end sm:self-start">
                                    <button onClick={() => handleStartEdit(0, item)} className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white"><Pencil size={16}/></button>
                                    <button onClick={() => handleDelete(item)} className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-red-400"><Trash2 size={16}/></button>
                                </div>
                            </div>
                        </div>
                    ))}
                  </div>
                ) : (
                    !isEditing && (
                        <div className="h-40 flex flex-col items-center justify-center text-gray-500 border-2 border-dashed border-gray-700 rounded-xl mb-6">
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
                            className="w-full flex items-center justify-between p-4 bg-gray-800/50 border border-purple-500/30 rounded-xl hover:bg-gray-700/50 transition-colors group"
                        >
                            <div className="flex items-center gap-3">
                                {isBackupFolderOpen ? <FolderOpen className="text-purple-400" /> : <Folder className="text-purple-400" />}
                                <span className="font-bold text-purple-200">備用方案資料夾</span>
                                <span className="bg-purple-900/50 text-purple-300 px-2 py-0.5 rounded text-xs">
                                    {backupItems.length} 個項目
                                </span>
                            </div>
                            <span className={`text-gray-500 transition-transform ${isBackupFolderOpen ? 'rotate-180' : ''}`}>▼</span>
                        </button>

                        {isBackupFolderOpen && (
                            <div className="mt-4 space-y-3 pl-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                 {backupItems.map((item, idx) => (
                                     <div key={idx} className="bg-gray-800/30 p-4 rounded-lg border border-purple-500/10 flex justify-between items-start group">
                                         <div>
                                             <div className="flex items-center gap-2 mb-1">
                                                 <AlertCircle size={14} className="text-purple-400" />
                                                 <span className="text-purple-200 font-bold">{item.activity}</span>
                                                 <button 
                                                    onClick={() => openGoogleMaps(item.activity)}
                                                    className="text-gray-500 hover:text-blue-400 p-1"
                                                    title="導航"
                                                 >
                                                     <Navigation size={12} />
                                                 </button>
                                             </div>
                                             <p className="text-gray-400 text-sm">{item.detail}</p>
                                         </div>
                                         <div className="flex gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => handleStartEdit(0, item)} className="p-1.5 hover:bg-gray-700 rounded text-gray-400 hover:text-white"><Pencil size={14}/></button>
                                            <button onClick={() => handleDelete(item)} className="p-1.5 hover:bg-gray-700 rounded text-gray-400 hover:text-red-400"><Trash2 size={14}/></button>
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
      <div className="p-4 border-t border-gray-700 bg-gray-900/50 shrink-0">
          {isEditing ? (
              <div className="bg-gray-800 rounded-xl border border-gray-600 p-4 shadow-2xl animate-in slide-in-from-bottom-5 duration-300">
                  <div className="flex justify-between items-center mb-4">
                      <h4 className="text-indigo-400 font-bold flex items-center gap-2">
                        {editIndex !== null ? <Pencil size={16} /> : <Plus size={16} />}
                        {editIndex !== null ? '編輯項目' : '新增項目'}
                      </h4>
                      <button onClick={handleCancel} className="text-gray-400 hover:text-white"><X size={18} /></button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                          <label className="text-xs text-gray-500 block mb-1">時間</label>
                          <input type="time" value={time} onChange={e => setTime(e.target.value)} className="w-full bg-gray-900 border border-gray-600 rounded-lg p-2 text-white focus:border-indigo-500 outline-none text-sm" />
                      </div>
                      <div className="col-span-2">
                          <label className="text-xs text-gray-500 block mb-1">活動名稱</label>
                          <input type="text" value={activity} onChange={e => setActivity(e.target.value)} placeholder="輸入行程名稱..." className="w-full bg-gray-900 border border-gray-600 rounded-lg p-2 text-white focus:border-indigo-500 outline-none text-sm" />
                      </div>
                  </div>
                  <div className="mb-2">
                      <label className="text-xs text-gray-500 block mb-1">細節備註</label>
                      <textarea rows={2} value={detail} onChange={e => setDetail(e.target.value)} placeholder="輸入備註或注意事項..." className="w-full bg-gray-900 border border-gray-600 rounded-lg p-2 text-white focus:border-indigo-500 outline-none text-sm resize-none" />
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
                      <button
                          type="button"
                          onClick={() => setIsBackup(!isBackup)}
                          className={`
                              flex items-center gap-2.5 px-4 py-2 rounded-lg border transition-all duration-200 group select-none
                              ${isBackup 
                                  ? 'bg-purple-900/30 border-purple-500 text-purple-300 ring-1 ring-purple-500/50' 
                                  : 'bg-gray-900 border-gray-600 text-gray-400 hover:border-gray-500 hover:text-gray-300'
                              }
                          `}
                      >
                          <div className="relative">
                              <Folder size={18} className={isBackup ? 'fill-purple-500/30' : ''} />
                              <div className={`absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center border-2 border-gray-800 transition-colors ${isBackup ? 'bg-purple-500 text-white' : 'bg-gray-600 text-gray-300 group-hover:bg-gray-500'}`}>
                                  <span className="text-[9px] font-bold">!</span>
                              </div>
                          </div>
                          <span className="text-sm font-bold">{isBackup ? '已設為備用' : '備用方案'}</span>
                      </button>

                      <button 
                          onClick={handleSave} 
                          disabled={!activity} 
                          className={`px-5 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-all ${activity ? 'bg-indigo-600 text-white hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/20' : 'bg-gray-700 text-gray-500 cursor-not-allowed'}`}
                      >
                          <Save size={18} /> 儲存
                      </button>
                  </div>
              </div>
          ) : (
              <button onClick={handleStartAdd} className={`w-full py-3 rounded-xl border-2 border-dashed font-bold transition-all flex items-center justify-center gap-2 ${
                  isPlanned 
                  ? 'border-gray-700 text-gray-400 hover:border-indigo-500 hover:text-indigo-400 hover:bg-indigo-500/10' 
                  : 'border-gray-700 text-gray-500 hover:border-amber-500 hover:text-amber-400 hover:bg-amber-500/10'
              }`}>
                  <Plus size={18} /> {isPlanned ? '新增行程 / 備用方案' : '開始規劃行程'}
              </button>
          )}
      </div>

    </div>
  );
};

export default DayCard;
