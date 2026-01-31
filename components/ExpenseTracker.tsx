
import React, { useState, useMemo } from 'react';
import { Plus, Trash2, Wallet, Receipt, PieChart as PieIcon, Filter, X, RefreshCw, CheckCircle, Loader2 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ExpenseRecord, ExpenseCategory } from '../types';
import { GoogleGenAI } from "@google/genai";

interface ExpenseTrackerProps {
  expenses: ExpenseRecord[];
  onAddExpense: (record: ExpenseRecord) => void;
  onDeleteExpense: (id: string) => void;
  exchangeRate: number;
  onExchangeRateChange: (rate: number) => void;
}

const CATEGORY_COLORS: Record<ExpenseCategory, string> = {
  Food: '#f472b6',
  Transport: '#60a5fa',
  Shopping: '#a78bfa',
  Ticket: '#34d399',
  Accommodation: '#fbbf24',
  Activity: '#9333ea',
  Other: '#94a3b8',
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
  const [syncingRate, setSyncingRate] = useState(false);
  
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');

  const [newItem, setNewItem] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newCategory, setNewCategory] = useState<ExpenseCategory>('Food');
  const [newPayer, setNewPayer] = useState('奇恩');
  const [newDate, setNewDate] = useState('2026-02-09');

  const syncLatestRate = async () => {
    setSyncingRate(true);
    try {
        const ai = new GoogleGenAI({ apiKey: (process.env as any).API_KEY });
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: "請問現在日幣(JPY)對台幣(TWD)的即時匯率是多少？請只給我數字部分，例如 0.215。",
            config: { tools: [{googleSearch: {}}] }
        });
        const match = response.text.match(/\d+\.\d+/);
        if (match) {
            onExchangeRateChange(parseFloat(match[0]));
        }
    } catch (e) {
        console.error("Currency sync failed", e);
    } finally {
        setSyncingRate(false);
    }
  };

  const filteredExpenses = useMemo(() => {
    return expenses.filter(item => {
      if (filterStartDate && item.date < filterStartDate) return false;
      if (filterEndDate && item.date > filterEndDate) return false;
      return true;
    });
  }, [expenses, filterStartDate, filterEndDate]);

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
    setNewItem(''); setNewAmount(''); setShowAddForm(false);
  };

  return (
    <div className="bg-white dark:bg-gray-950 rounded-3xl shadow-xl border border-slate-100 dark:border-gray-800 overflow-hidden h-full flex flex-col">
      <div className="p-6 bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/20 dark:to-gray-950 border-b border-slate-100 dark:border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
                <h2 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2 mb-3">
                    <Wallet size={28} /> 旅費記帳本
                </h2>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3 bg-white dark:bg-gray-900 p-2 pr-4 rounded-full border border-slate-200 dark:border-gray-800 shadow-sm w-fit group">
                        <button 
                            onClick={syncLatestRate}
                            disabled={syncingRate}
                            className="bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400 p-1.5 rounded-full hover:rotate-180 transition-transform duration-500 disabled:opacity-50"
                        >
                            {syncingRate ? <Loader2 className="animate-spin" size={14} /> : <RefreshCw size={14} />}
                        </button>
                        <div className="flex items-center text-sm gap-2 text-slate-600 dark:text-slate-300">
                            <span className="font-mono">1 JPY ≈</span>
                            <div className="relative">
                                <input 
                                    type="number" 
                                    step="0.0001"
                                    value={exchangeRate}
                                    onChange={(e) => onExchangeRateChange(Number(e.target.value))}
                                    className="bg-transparent text-emerald-600 dark:text-emerald-400 font-bold font-mono w-16 focus:outline-none"
                                />
                            </div>
                            <span className="font-mono">TWD</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full md:w-auto bg-white dark:bg-gray-900 p-5 rounded-2xl border border-slate-100 dark:border-gray-800 shadow-md flex items-center justify-between md:justify-end gap-6">
                <div className="text-right">
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-0.5">總支出 (日幣)</p>
                    <p className="text-xl font-mono text-slate-600 dark:text-slate-400">¥ {totalJPY.toLocaleString()}</p>
                </div>
                <div className="h-10 w-px bg-slate-200 dark:bg-gray-800"></div>
                <div className="text-right">
                    <p className="text-xs text-emerald-500 uppercase font-bold tracking-wider mb-0.5">折合台幣</p>
                    <p className="text-3xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400 tracking-tight">
                        <span className="text-lg text-emerald-500 mr-1">NT$</span>
                        {totalTWD.toLocaleString()}
                    </p>
                </div>
            </div>
        </div>
      </div>

      <div className="px-5 py-3 bg-slate-50 dark:bg-gray-900 border-b border-slate-100 dark:border-gray-800 flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2 text-sm text-slate-500">
             <Filter size={16} className="text-slate-400" />
             <span className="text-xs uppercase font-semibold">篩選日期</span>
          </div>
          <div className="flex items-center gap-2">
            <input
                type="date"
                value={filterStartDate}
                onChange={(e) => setFilterStartDate(e.target.value)}
                className="bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded px-2 py-1 text-xs text-slate-700 dark:text-white outline-none"
            />
            <span className="text-slate-400">-</span>
             <input
                type="date"
                value={filterEndDate}
                onChange={(e) => setFilterEndDate(e.target.value)}
                className="bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded px-2 py-1 text-xs text-slate-700 dark:text-white outline-none"
            />
          </div>
      </div>

      <div className="p-5 grid grid-cols-1 xl:grid-cols-3 gap-6 flex-grow overflow-y-auto">
        <div className="xl:col-span-2 space-y-6">
          {!showAddForm && (
            <button 
                onClick={() => setShowAddForm(true)}
                className="w-full py-4 bg-emerald-50 dark:bg-emerald-950/20 hover:bg-emerald-100 text-emerald-600 border-2 border-dashed border-emerald-200 dark:border-emerald-800 rounded-2xl flex items-center justify-center gap-2 transition-all font-bold"
            >
                <Plus size={20} /> 新增一筆支出
            </button>
          )}

          {showAddForm && (
            <form onSubmit={handleAddExpense} className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-slate-200 dark:border-gray-800 shadow-lg">
               <h3 className="text-emerald-600 dark:text-emerald-400 font-bold mb-5 flex items-center gap-2"><Plus size={18}/> 新增支出</h3>
               <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="text-xs text-slate-500 font-bold block mb-1.5">日期</label>
                    <input type="date" required value={newDate} onChange={(e) => setNewDate(e.target.value)} className="w-full bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg p-2.5 text-sm dark:text-white outline-none" />
                  </div>
                  <div className="col-span-2 sm:col-span-2">
                    <label className="text-xs text-slate-500 font-bold block mb-1.5">項目名稱</label>
                    <input type="text" placeholder="例如: 午餐" required value={newItem} onChange={(e) => setNewItem(e.target.value)} className="w-full bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg p-2.5 text-sm dark:text-white outline-none" />
                  </div>
                   <div className="col-span-2 sm:col-span-1">
                    <label className="text-xs text-slate-500 font-bold block mb-1.5">付款人</label>
                    <select value={newPayer} onChange={(e) => setNewPayer(e.target.value)} className="w-full bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg p-2.5 text-sm dark:text-white outline-none" >
                        <option>奇恩</option><option>榴槤</option><option>檢波器</option><option>阿婷</option><option>冠彥</option><option>許書由</option>
                    </select>
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="text-xs text-slate-500 font-bold block mb-1.5">金額 (JPY)</label>
                    <input type="number" required value={newAmount} onChange={(e) => setNewAmount(e.target.value)} className="w-full bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg p-2.5 text-sm dark:text-white font-mono outline-none" />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 font-bold block mb-1.5">類別</label>
                    <select value={newCategory} onChange={(e) => setNewCategory(e.target.value as ExpenseCategory)} className="w-full bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg p-2.5 text-sm dark:text-white outline-none" >
                        {Object.entries(CATEGORY_LABELS).map(([key, label]) => (<option key={key} value={key}>{label}</option>))}
                    </select>
                  </div>
               </div>
               <div className="flex gap-3 justify-end pt-4 border-t border-slate-100 dark:border-gray-800">
                   <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 text-sm text-slate-500 bg-slate-100 dark:bg-gray-800 rounded-lg font-medium">取消</button>
                   <button type="submit" className="px-6 py-2 bg-emerald-500 text-white text-sm font-bold rounded-lg shadow-md">確認新增</button>
               </div>
            </form>
          )}

          <div className="space-y-3">
              <h3 className="text-sm font-semibold text-slate-500 flex items-center gap-2 pl-1"><Receipt size={16} /> 最近交易紀錄</h3>
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-slate-200 dark:border-gray-800 overflow-hidden shadow-sm">
                  {filteredExpenses.length === 0 ? (
                      <div className="p-12 text-center text-slate-400 text-sm">尚無紀錄</div>
                  ) : (
                    <div className="divide-y divide-slate-100 dark:divide-gray-800">
                        {filteredExpenses.map((expense) => (
                            <div key={expense.id} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-gray-800 transition-colors group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold" style={{ backgroundColor: `${CATEGORY_COLORS[expense.category]}15`, color: CATEGORY_COLORS[expense.category] }}>{CATEGORY_LABELS[expense.category][0]}</div>
                                    <div>
                                        <p className="font-bold text-slate-700 dark:text-slate-200">{expense.item}</p>
                                        <p className="text-xs text-slate-400">{expense.date} • {expense.payer}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-5">
                                    <div className="text-right">
                                        <div className="font-mono font-bold text-slate-500 dark:text-slate-400">¥{expense.amount.toLocaleString()}</div>
                                        <div className="text-xs text-emerald-600 dark:text-emerald-400 font-mono font-bold">NT$ {Math.round(expense.amount * exchangeRate).toLocaleString()}</div>
                                    </div>
                                    <button onClick={() => onDeleteExpense(expense.id)} className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16}/></button>
                                </div>
                            </div>
                        ))}
                    </div>
                  )}
              </div>
          </div>
        </div>

        <div className="xl:col-span-1">
             <div className="bg-slate-50/50 dark:bg-gray-900 rounded-2xl border border-slate-200 dark:border-gray-800 p-5 h-full shadow-inner">
                <h3 className="text-sm font-semibold text-slate-500 mb-6 flex items-center gap-2"><PieIcon size={16} /> 支出分佈</h3>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={chartData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value">
                                {chartData.map((entry, index) => (<Cell key={index} fill={entry.color} />))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
             </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;
