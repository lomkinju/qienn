
import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import StatsCard from './components/StatsCard';
import LogisticsCard from './components/LogisticsCard';
import WeatherCard from './components/WeatherCard';
import FoodTags from './components/FoodTags';
import FoodRoulette from './components/FoodRoulette';
import InfoSection from './components/InfoSection';
import DayCard from './components/DayCard';
import ExpenseTracker from './components/ExpenseTracker';
import Footer from './components/Footer';
import SakuraBackground from './components/SakuraBackground'; 
import JapanesePhraseCard from './components/JapanesePhraseCard'; 
import PackingList from './components/PackingList'; 
import UsefulLinks from './components/UsefulLinks'; 
import TokyoGacha from './components/TokyoGacha';
import { ITINERARY_DATA, INITIAL_EXPENSES, FOOD_LIST, CURRENCY_RATE } from './constants';
import { LayoutDashboard, Map, Wallet, Utensils, Info, Save, CheckCircle, Plane, Moon, Sun, Sparkles } from 'lucide-react';
import { DayPlan, ItineraryItem, ExpenseRecord } from './types';

type Tab = 'home' | 'itinerary' | 'expenses' | 'food' | 'info';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // -- Global State --
  const [itinerary, setItinerary] = useState<DayPlan[]>(ITINERARY_DATA);
  const [expenses, setExpenses] = useState<ExpenseRecord[]>(INITIAL_EXPENSES);
  const [foodList, setFoodList] = useState<string[]>(FOOD_LIST);
  const [exchangeRate, setExchangeRate] = useState<number>(CURRENCY_RATE);
  const [packedItems, setPackedItems] = useState<Record<string, boolean>>({});
  
  const [showSaveToast, setShowSaveToast] = useState(false);
  const [daysUntilTrip, setDaysUntilTrip] = useState(0);

  const itineraryContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedData = localStorage.getItem('tokyoTrip2026_v1');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.itinerary) setItinerary(parsed.itinerary);
        if (parsed.expenses) setExpenses(parsed.expenses);
        if (parsed.foodList) setFoodList(parsed.foodList);
        if (parsed.exchangeRate) setExchangeRate(parsed.exchangeRate);
        if (parsed.packedItems) setPackedItems(parsed.packedItems);
      } catch (e) { console.error(e); }
    }
    const targetDate = new Date('2026-02-09T06:40:00');
    const difference = targetDate.getTime() - new Date().getTime();
    setDaysUntilTrip(Math.ceil(difference / (1000 * 3600 * 24)));
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleSaveData = () => {
    localStorage.setItem('tokyoTrip2026_v1', JSON.stringify({ itinerary, expenses, foodList, exchangeRate, packedItems }));
    setShowSaveToast(true);
    setTimeout(() => setShowSaveToast(false), 2500);
  };

  // -- Itinerary Handlers --
  const handleAddItineraryItem = (dayLabel: string, newItem: ItineraryItem) => {
    setItinerary(prev => prev.map(day => {
      if (day.dayLabel === dayLabel) {
        const updatedItems = [...day.items, newItem].sort((a, b) => a.time.localeCompare(b.time));
        return { ...day, status: 'Planned', items: updatedItems };
      }
      return day;
    }));
  };

  const handleUpdateItineraryItem = (dayLabel: string, index: number, updatedItem: ItineraryItem) => {
    setItinerary(prev => prev.map(day => {
        if (day.dayLabel === dayLabel) {
            const newItems = [...day.items];
            newItems[index] = updatedItem;
            newItems.sort((a, b) => a.time.localeCompare(b.time)); 
            return { ...day, items: newItems };
        }
        return day;
    }));
  };

  const handleDeleteItineraryItem = (dayLabel: string, index: number) => {
    setItinerary(prev => prev.map(day => {
        if (day.dayLabel === dayLabel) {
            const newItems = day.items.filter((_, i) => i !== index);
            return { ...day, items: newItems };
        }
        return day;
    }));
  };

  const currentTheme = itinerary.find((_, i) => i === 0)?.theme || "東京之旅";

  const NavButton = ({ tab, icon: Icon, label }: { tab: Tab; icon: any; label: string }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`relative group flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-1 lg:gap-3 w-full p-2 lg:p-3 rounded-xl transition-all duration-300 ${
        activeTab === tab 
          ? 'bg-white dark:bg-gray-800 shadow-lg dark:shadow-none text-indigo-600 dark:text-neon-blue' 
          : 'text-slate-500 dark:text-gray-400 hover:bg-white/60 dark:hover:bg-gray-800/50 hover:text-slate-800 dark:hover:text-white'
      }`}
    >
      <Icon size={24} strokeWidth={activeTab === tab ? 2.5 : 2} className={`shrink-0 ${activeTab === tab ? 'text-indigo-600 dark:text-neon-blue' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-gray-300'}`} />
      <span className={`text-[10px] lg:text-sm font-bold uppercase tracking-wider transition-opacity duration-200`}>
        {label}
      </span>
      {activeTab === tab && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-500 dark:bg-neon-blue rounded-l-full hidden lg:block shadow-[0_0_10px_rgba(0,243,255,0.8)]"></div>
      )}
    </button>
  );

  return (
    <div className={`flex h-screen ${isDarkMode ? 'dark' : ''} bg-slate-50 dark:bg-gray-950 transition-colors duration-500`}>
      <aside className="flex flex-col w-20 lg:w-64 h-full bg-white/80 dark:bg-gray-900/90 backdrop-blur-xl border-r border-slate-200 dark:border-gray-800 p-2 lg:p-4 shrink-0 z-50 shadow-sm">
        <div className="flex items-center justify-center lg:justify-start gap-3 px-0 lg:px-2 mb-8 mt-2">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-2 rounded-lg shadow-lg dark:shadow-neon-blue/20">
                <Plane className="text-white" size={24} />
            </div>
            <h1 className="font-extrabold text-xl tracking-wider text-slate-800 dark:text-white hidden lg:block">
                TOKYO <span className="text-indigo-600 dark:text-neon-blue">2026</span>
            </h1>
        </div>

        <nav className="flex-1 space-y-2">
          <NavButton tab="home" icon={LayoutDashboard} label="總覽" />
          <NavButton tab="itinerary" icon={Map} label="行程" />
          <NavButton tab="expenses" icon={Wallet} label="記帳" />
          <NavButton tab="food" icon={Utensils} label="美食" />
          <NavButton tab="info" icon={Info} label="資訊" />
        </nav>

        <div className="mt-auto space-y-4 pt-6 border-t border-slate-200 dark:border-gray-800">
           <button 
                onClick={toggleDarkMode}
                className="w-full flex items-center justify-center lg:justify-start gap-3 p-3 rounded-xl bg-slate-100 dark:bg-gray-800 text-slate-500 dark:text-neon-pink transition-all hover:scale-105"
           >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                <span className="hidden lg:block text-xs font-bold uppercase tracking-widest">{isDarkMode ? '切換櫻花模式' : '切換霓虹模式'}</span>
           </button>
        </div>
      </aside>

      <main className="flex-1 relative h-full overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 relative scroll-smooth">
            {activeTab === 'home' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6 max-w-6xl mx-auto pb-10">
                <Header />
                <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                    <div className="xl:col-span-1"><StatsCard /></div>
                    <div className="xl:col-span-2"><LogisticsCard /></div>
                    <div className="xl:col-span-1"><TokyoGacha currentTheme={currentTheme} /></div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                   <div className="lg:col-span-2"><WeatherCard /></div>
                   <div className="lg:col-span-1 flex flex-col gap-6">
                        <JapanesePhraseCard />
                        <div className="bg-white dark:bg-gray-900 p-5 rounded-3xl border border-slate-100 dark:border-gray-800 shadow-sm">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Sparkles size={14} /> 距離出發還有
                            </h3>
                            <div className="flex items-baseline gap-2">
                                <span className="text-5xl font-black text-indigo-600 dark:text-neon-blue">{daysUntilTrip}</span>
                                <span className="text-xl font-bold text-slate-400">DAYS</span>
                            </div>
                        </div>
                   </div>
                </div>
                <div className="hidden md:block"><Footer /></div>
            </div>
            )}

            {activeTab === 'itinerary' && (
            <div className="animate-in fade-in zoom-in-95 duration-300 h-full flex flex-col">
                <div className="flex items-center justify-between mb-6 px-2 shrink-0">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight">每日行程</h2>
                        <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">左右滑動卡片切換天數</p>
                    </div>
                </div>
                <div 
                    ref={itineraryContainerRef}
                    className="flex-1 flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 no-scrollbar items-start px-2"
                >
                    {itinerary.map((day, index) => (
                        <div key={index} className="snap-center min-w-full md:min-w-[calc(100%-2rem)] lg:min-w-full h-full flex flex-col">
                            <DayCard 
                                day={day} 
                                onAddItem={(item) => handleAddItineraryItem(day.dayLabel, item)}
                                onUpdateItem={(idx, item) => handleUpdateItineraryItem(day.dayLabel, idx, item)}
                                onDeleteItem={(idx) => handleDeleteItineraryItem(day.dayLabel, idx)}
                            />
                        </div>
                    ))}
                </div>
            </div>
            )}

            {activeTab === 'expenses' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full max-w-6xl mx-auto pb-6">
                    <ExpenseTracker 
                        expenses={expenses} 
                        onAddExpense={(record) => setExpenses([record, ...expenses])} 
                        onDeleteExpense={(id) => setExpenses(expenses.filter(e => e.id !== id))} 
                        exchangeRate={exchangeRate} 
                        onExchangeRateChange={setExchangeRate} 
                    />
                </div>
            )}

            {activeTab === 'food' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full max-w-6xl mx-auto flex flex-col pb-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
                        <FoodRoulette foodList={foodList} />
                        <FoodTags 
                          foodList={foodList} 
                          onAddFood={(food) => !foodList.includes(food) && setFoodList([...foodList, food])} 
                          onDeleteFood={(food) => setFoodList(foodList.filter(f => f !== food))} 
                        />
                    </div>
                </div>
            )}

            {activeTab === 'info' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto pt-4 pb-10">
                    <div className="space-y-8">
                        <InfoSection />
                        <UsefulLinks />
                        <PackingList 
                          packedItems={packedItems} 
                          onToggleItem={(item) => setPackedItems(prev => ({...prev, [item]: !prev[item]}))} 
                        />
                    </div>
                    <div className="mt-12 opacity-80"><Footer /></div>
                </div>
            )}
        </div>
      </main>

      <button onClick={handleSaveData} className="fixed z-50 bottom-6 right-6 md:bottom-10 md:right-10 bg-indigo-600 dark:bg-neon-blue text-white p-4 rounded-full shadow-xl hover:scale-110 active:scale-95 border-4 border-white dark:border-gray-900 group">
         <Save size={24} className="group-hover:animate-pulse" />
      </button>

      {showSaveToast && (
        <div className="fixed z-[60] bottom-24 right-6 bg-emerald-500 text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4">
            <CheckCircle size={20} />
            <span className="font-bold text-sm">已存入手機快取！</span>
        </div>
      )}
      
      {!isDarkMode && <SakuraBackground />}
    </div>
  );
};

export default App;
