
import React, { useState, useMemo } from 'react';
import { Plus, Trash2, Wallet, Receipt, PieChart as PieIcon, Filter, X, RefreshCw } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ExpenseRecord, ExpenseCategory } from '../types';

interface ExpenseTrackerProps {
  expenses: ExpenseRecord[];
  onAddExpense: (record: ExpenseRecord) => void;
  onDeleteExpense: (id: string) => void;
  exchangeRate: number;
  onExchangeRateChange: (rate: number) => void;
}

const CATEGORY_COLORS: Record<ExpenseCategory, string> = {
  Food: '#f472b6', // pink-400
  Transport: '#60a5fa', // blue-400
  Shopping: '#a78bfa', // violet-400
  Ticket: '#34d399', // emerald-400
  Accommodation: '#fbbf24', // amber-400
  Activity: '#9333ea', // purple-600
  Other: '#94a3b8', // slate-400
};

const CATEGORY_LABELS: Record<ExpenseCategory, string> = {
  Food: '餐飲',
  Transport: '交通',
  Shopping: '購物',
  Ticket: '門票',
  Accommodation: '住宿',
  Activity: '活動',
  Other: '其他',
};

const ExpenseTracker: React.FC<ExpenseTrackerProps> = ({ 
  expenses, 
  onAddExpense, 
  onDeleteExpense, 
  exchangeRate, 
  onExchangeRateChange 
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Filter State
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');

  // Form State
  const [newItem, setNewItem] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newCategory, setNewCategory] = useState<ExpenseCategory>('Food');
  const [newPayer, setNewPayer] = useState('奇恩');
  const [newDate, setNewDate] = useState('2026-02-09');

  // Filter Logic
  const filteredExpenses = useMemo(() => {
    return expenses.filter(item => {
      if (filterStartDate && item.date < filterStartDate) return false;
      if (filterEndDate && item.date > filterEndDate) return false;
      return true;
    });
  }, [expenses, filterStartDate, filterEndDate]);

  // Calculations
  const totalJPY = useMemo(() => filteredExpenses.reduce((sum, item) => sum + item.amount, 0), [filteredExpenses]);
  const totalTWD = Math.round(totalJPY * exchangeRate);

  const chartData = useMemo(() => {
    const data: Record<string, number> = {};
    filteredExpenses.forEach(item => {
      data[item.category] = (data[item.category] || 0) + item.amount;
    });
    return Object.entries(data).map(([key, value]) => ({
      name: CATEGORY_LABELS[key as ExpenseCategory],
      value,
      color: CATEGORY_COLORS[key as ExpenseCategory],
    }));
  }, [filteredExpenses]);

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem || !newAmount) return;

    const record: ExpenseRecord = {
      id: Date.now().toString(),
      date: newDate,
      item: newItem,
      category: newCategory,
      amount: Number(newAmount),
      payer: newPayer,
    };

    onAddExpense(record);
    setNewItem('');
    setNewAmount('');
    setShowAddForm(false);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden h-full flex flex-col">
      {/* Redesigned Header */}
      <div className="p-6 bg-gradient-to-br from-emerald-50 to-white border-b border-slate-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            
            {/* Title & Rate */}
            <div>
                <h2 className="text-2xl font-bold text-emerald-600 flex items-center gap-2 mb-3">
                    <Wallet size={28} /> 旅費記帳本
                </h2>
                <div className="flex items-center gap-3 bg-white p-2 pr-4 rounded-full border border-slate-200 shadow-sm w-fit">
                    <div className="bg-emerald-100 text-emerald-600 p-1.5 rounded-full">
                        <RefreshCw size={14} />
                    </div>
                    <div className="flex items-center text-sm gap-2 text-slate-600">
                         <span className="font-mono">1 JPY ≈</span>
                         <div className="relative group">
                            <input 
                                type="number" 
                                step="0.001"
                                value={exchangeRate}
                                onChange={(e) => onExchangeRateChange(Number(e.target.value))}
                                className="bg-transparent text-emerald-600 font-bold font-mono w-14 focus:outline-none focus:border-b border-emerald-300"
                            />
                            <span className="absolute -bottom-4 left-0 text-[10px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">點擊編輯匯率</span>
                         </div>
                         <span className="font-mono">TWD</span>
                    </div>
                </div>
            </div>

            {/* Total Display - Emphasizing TWD */}
            <div className="w-full md:w-auto bg-white p-5 rounded-2xl border border-slate-100 shadow-md flex items-center justify-between md:justify-end gap-6">
                <div className="text-right">
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-0.5">總支出 (日幣)</p>
                    <p className="text-xl font-mono text-slate-600">¥ {totalJPY.toLocaleString()}</p>
                </div>
                <div className="h-10 w-px bg-slate-200"></div>
                <div className="text-right">
                    <p className="text-xs text-emerald-500 uppercase font-bold tracking-wider mb-0.5">折合台幣</p>
                    <p className="text-3xl font-extrabold font-mono text-emerald-600 tracking-tight">
                        <span className="text-lg text-emerald-500 mr-1">NT$</span>
                        {totalTWD.toLocaleString()}
                    </p>
                </div>
            </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="px-5 py-3 bg-slate-50 border-b border-slate-100 flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2 text-sm text-slate-500">
             <Filter size={16} className="text-slate-400" />
             <span className="text-xs uppercase font-semibold">篩選日期</span>
          </div>
          <div className="flex items-center gap-2">
            <input
                type="date"
                value={filterStartDate}
                onChange={(e) => setFilterStartDate(e.target.value)}
                className="bg-white border border-slate-200 rounded px-2 py-1 text-xs text-slate-700 focus:border-emerald-500 outline-none"
            />
            <span className="text-slate-400">-</span>
             <input
                type="date"
                value={filterEndDate}
                onChange={(e) => setFilterEndDate(e.target.value)}
                className="bg-white border border-slate-200 rounded px-2 py-1 text-xs text-slate-700 focus:border-emerald-500 outline-none"
            />
          </div>
          {(filterStartDate || filterEndDate) && (
              <button
                  onClick={() => { setFilterStartDate(''); setFilterEndDate(''); }}
                  className="flex items-center gap-1 text-xs text-slate-500 hover:text-red-500 bg-white border border-slate-200 hover:border-red-200 px-2 py-1 rounded transition-colors"
              >
                  <X size={12} /> 清除
              </button>
          )}
      </div>

      <div className="p-5 grid grid-cols-1 xl:grid-cols-3 gap-6 flex-grow overflow-y-auto">
        {/* Left Column: Form & List */}
        <div className="xl:col-span-2 space-y-6">
          
          {/* Add Button */}
          {!showAddForm && (
            <button 
                onClick={() => setShowAddForm(true)}
                className="w-full py-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border-2 border-dashed border-emerald-200 hover:border-emerald-300 rounded-2xl flex items-center justify-center gap-2 transition-all font-bold group"
            >
                <div className="bg-white p-1 rounded-full shadow-sm text-emerald-500 group-hover:scale-110 transition-transform">
                    <Plus size={20} /> 
                </div>
                新增一筆支出
            </button>
          )}

          {/* Add Form */}
          {showAddForm && (
            <form onSubmit={handleAddExpense} className="bg-white p-6 rounded-2xl border border-slate-200 animate-in fade-in slide-in-from-top-4 duration-300 shadow-lg shadow-slate-200/50">
               <h3 className="text-emerald-600 font-bold mb-5 flex items-center gap-2"><Plus size={18}/> 新增支出</h3>
               <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="text-xs text-slate-500 font-bold block mb-1.5">日期</label>
                    <input 
                        type="date" 
                        required
                        value={newDate}
                        onChange={(e) => setNewDate(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm text-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200 focus:outline-none"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-2">
                    <label className="text-xs text-slate-500 font-bold block mb-1.5">項目名稱</label>
                    <input 
                        type="text" 
                        placeholder="例如: 午餐, 車票"
                        required
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm text-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200 focus:outline-none"
                    />
                  </div>
                   <div className="col-span-2 sm:col-span-1">
                    <label className="text-xs text-slate-500 font-bold block mb-1.5">付款人</label>
                    <select 
                        value={newPayer}
                        onChange={(e) => setNewPayer(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm text-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200 focus:outline-none"
                    >
                        <option>奇恩</option>
                        <option>旅伴 A</option>
                        <option>旅伴 B</option>
                    </select>
                  </div>
               </div>
               
               <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="text-xs text-slate-500 font-bold block mb-1.5">金額 (JPY)</label>
                    <div className="relative">
                        <span className="absolute left-3 top-2.5 text-slate-400 font-mono">¥</span>
                        <input 
                            type="number" 
                            placeholder="0"
                            required
                            min="1"
                            value={newAmount}
                            onChange={(e) => setNewAmount(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 pl-8 text-sm text-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200 focus:outline-none font-mono font-bold"
                        />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 font-bold block mb-1.5">類別</label>
                    <select 
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value as ExpenseCategory)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm text-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200 focus:outline-none"
                    >
                        {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                            <option key={key} value={key}>{label}</option>
                        ))}
                    </select>
                  </div>
               </div>

               <div className="flex gap-3 justify-end pt-4 border-t border-slate-100">
                   <button 
                     type="button" 
                     onClick={() => setShowAddForm(false)}
                     className="px-4 py-2 text-sm text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors font-medium"
                   >
                     取消
                   </button>
                   <button 
                     type="submit" 
                     className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold rounded-lg shadow-md hover:shadow-lg transition-all active:scale-95"
                   >
                     確認新增
                   </button>
               </div>
            </form>
          )}

          {/* List */}
          <div className="space-y-3">
              <h3 className="text-sm font-semibold text-slate-500 flex items-center gap-2 pl-1">
                 <Receipt size={16} /> 最近交易紀錄 {(filterStartDate || filterEndDate) && <span className="text-xs font-normal text-emerald-600">(已篩選)</span>}
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                  {filteredExpenses.length === 0 ? (
                      <div className="p-12 text-center text-slate-400 text-sm">
                          {expenses.length === 0 ? "尚無支出紀錄，開始記帳吧！" : "無符合篩選條件的紀錄"}
                      </div>
                  ) : (
                    <div className="divide-y divide-slate-100">
                        {filteredExpenses.map((expense) => (
                            <div key={expense.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                                <div className="flex items-center gap-4">
                                    <div 
                                        className="w-12 h-12 rounded-full flex items-center justify-center text-lg shadow-sm border border-slate-100" 
                                        style={{ backgroundColor: `${CATEGORY_COLORS[expense.category]}15`, color: CATEGORY_COLORS[expense.category] }}
                                    >
                                        {CATEGORY_LABELS[expense.category][0]}
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-700">{expense.item}</p>
                                        <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                                            <span>{expense.date}</span>
                                            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                            <span style={{ color: CATEGORY_COLORS[expense.category] }} className="font-medium">{CATEGORY_LABELS[expense.category]}</span>
                                            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                            <span className="text-indigo-500">{expense.payer}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-5">
                                    <div className="text-right">
                                        <div className="font-mono font-bold text-slate-500">¥{expense.amount.toLocaleString()}</div>
                                        <div className="text-xs text-emerald-600 font-mono font-bold">NT$ {Math.round(expense.amount * exchangeRate).toLocaleString()}</div>
                                    </div>
                                    <button 
                                        onClick={() => onDeleteExpense(expense.id)}
                                        className="text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg p-2 transition-all opacity-0 group-hover:opacity-100"
                                        title="刪除"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                  )}
              </div>
          </div>
        </div>

        {/* Right Column: Analytics */}
        <div className="xl:col-span-1">
             <div className="bg-slate-50/50 rounded-2xl border border-slate-200 p-5 h-full flex flex-col shadow-inner">
                <h3 className="text-sm font-semibold text-slate-500 mb-6 flex items-center gap-2">
                    <PieIcon size={16} /> 支出分佈
                </h3>
                <div className="flex-1 min-h-[350px] relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="45%"
                                innerRadius={50}
                                outerRadius={85}
                                paddingAngle={3}
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                labelLine={{ stroke: '#94a3b8', strokeWidth: 1 }}
                                style={{ fontSize: '11px', fontWeight: '500', fill: '#475569' }}
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#fff" strokeWidth={2} />
                                ))}
                            </Pie>
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#fff', borderColor: '#e2e8f0', borderRadius: '0.75rem', color: '#1e293b', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                itemStyle={{ color: '#1e293b' }}
                                formatter={(value: number) => `¥${value.toLocaleString()} (≈ NT$${Math.round(value * exchangeRate).toLocaleString()})`}
                            />
                            <Legend 
                                layout="horizontal" 
                                verticalAlign="bottom" 
                                align="center"
                                iconSize={10}
                                wrapperStyle={{ fontSize: '11px', paddingTop: '20px', color: '#64748b' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3 mt-6">
                     <div className="bg-white rounded-xl p-3 text-center border border-slate-200 shadow-sm">
                         <p className="text-[10px] text-slate-400 uppercase font-bold">總筆數</p>
                         <p className="text-lg font-bold text-slate-700">{filteredExpenses.length}</p>
                     </div>
                     <div className="bg-white rounded-xl p-3 text-center border border-slate-200 shadow-sm">
                         <p className="text-[10px] text-slate-400 uppercase font-bold">平均單筆</p>
                         <p className="text-lg font-bold text-slate-700">¥{filteredExpenses.length > 0 ? Math.round(totalJPY / filteredExpenses.length).toLocaleString() : 0}</p>
                     </div>
                </div>
             </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;
