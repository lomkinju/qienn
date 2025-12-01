
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
import { ITINERARY_DATA, INITIAL_EXPENSES, FOOD_LIST, CURRENCY_RATE } from './constants';
import { LayoutDashboard, Map, Wallet, Utensils, Info, Save, CheckCircle, Plane } from 'lucide-react';
import { DayPlan, ItineraryItem, ExpenseRecord } from './types';

type Tab = 'home' | 'itinerary' | 'expenses' | 'food' | 'info';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  
  // -- Global State --
  const [itinerary, setItinerary] = useState<DayPlan[]>(ITINERARY_DATA);
  const [expenses, setExpenses] = useState<ExpenseRecord[]>(INITIAL_EXPENSES);
  const [foodList, setFoodList] = useState<string[]>(FOOD_LIST);
  const [exchangeRate, setExchangeRate] = useState<number>(CURRENCY_RATE);
  const [packedItems, setPackedItems] = useState<Record<string, boolean>>({});
  
  const [showSaveToast, setShowSaveToast] = useState(false);
  const [daysUntilTrip, setDaysUntilTrip] = useState(0);

  // -- Itinerary Scroll State --
  const itineraryContainerRef = useRef<HTMLDivElement>(null);

  // -- Load Data on Mount --
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
      } catch (e) {
        console.error("Failed to load saved data", e);
      }
    }

    // Calculate days until trip
    const targetDate = new Date('2026-02-09T06:40:00');
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();
    const days = Math.ceil(difference / (1000 * 3600 * 24));
    setDaysUntilTrip(days > 0 ? days : 0);

  }, []);

  // -- Save Data --
  const handleSaveData = () => {
    const dataToSave = {
      itinerary,
      expenses,
      foodList,
      exchangeRate,
      packedItems
    };
    localStorage.setItem('tokyoTrip2026_v1', JSON.stringify(dataToSave));
    
    // Show toast
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

  const scrollToDay = (index: number) => {
    if (itineraryContainerRef.current) {
        const cardWidth = itineraryContainerRef.current.offsetWidth;
        itineraryContainerRef.current.scrollTo({
            left: cardWidth * index,
            behavior: 'smooth'
        });
    }
  };

  // -- Food Handlers --
  const handleAddFood = (food: string) => {
    if (!foodList.includes(food)) {
      setFoodList([...foodList, food]);
    }
  };

  const handleDeleteFood = (food: string) => {
    setFoodList(foodList.filter(f => f !== food));
  };

  // -- Expense Handlers --
  const handleAddExpense = (record: ExpenseRecord) => {
    setExpenses([record, ...expenses]);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  // -- Packing List Handler --
  const handleTogglePackingItem = (item: string) => {
    setPackedItems(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  // Responsive NavButton: Stacked on mobile, Row on Desktop
  const NavButton = ({ tab, icon: Icon, label }: { tab: Tab; icon: any; label: string }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`relative group flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-1 lg:gap-3 w-full p-2 lg:p-3 rounded-xl transition-all duration-300 ${
        activeTab === tab 
          ? 'bg-white shadow-lg shadow-indigo-200 text-indigo-600' 
          : 'text-slate-500 hover:bg-white/60 hover:text-slate-800'
      }`}
    >
      <Icon size={24} strokeWidth={activeTab === tab ? 2.5 : 2} className={`shrink-0 ${activeTab === tab ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
      
      <span className={`text-[10px] lg:text-base font-medium transition-opacity duration-200 ${activeTab === tab ? 'font-bold' : ''}`}>
        {label}
      </span>

      {/* Active Indicator Strip (Desktop) */}
      {activeTab === tab && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-500 rounded-l-full hidden lg:block"></div>
      )}
    </button>
  );

  return (
    <div className="flex h-screen bg-slate-50 text-slate-800 font-sans overflow-hidden">
      
      {/* Sidebar Navigation (Universal) */}
      <aside className="flex flex-col w-20 lg:w-64 h-full bg-white/80 backdrop-blur-xl border-r border-slate-200 p-2 lg:p-4 shrink-0 z-50 shadow-sm">
        
        {/* Logo Section */}
        <div className="flex items-center justify-center lg:justify-start gap-3 px-0 lg:px-2 mb-6 lg:mb-10 mt-2">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-2 rounded-lg shadow-lg shadow-indigo-200 shrink-0">
                <Plane className="text-white" size={24} />
            </div>
            <h1 className="font-extrabold text-xl tracking-wider text-slate-800 hidden lg:block">
                TOKYO <span className="text-indigo-600">2026</span>
            </h1>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-2 lg:space-y-3">
          <NavButton tab="home" icon={LayoutDashboard} label="總覽" />
          <NavButton tab="itinerary" icon={Map} label="行程" />
          <NavButton tab="expenses" icon={Wallet} label="記帳" />
          <NavButton tab="food" icon={Utensils} label="美食" />
          <NavButton tab="info" icon={Info} label="資訊" />
        </nav>

        {/* Footer (Desktop Only) */}
        <div className="mt-auto pt-6 border-t border-slate-200 hidden lg:block">
           <div className="bg-slate-100 rounded-xl p-4 text-xs text-slate-500 border border-slate-200">
              <p className="font-medium mb-2">距離出發還有 <span className="text-indigo-600 font-bold text-base ml-1">{daysUntilTrip}</span> 天</p>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-indigo-400 to-purple-400 h-full rounded-full transition-all duration-1000" 
                    style={{ width: `${Math.min(100, Math.max(5, (1 - (daysUntilTrip / 365)) * 100))}%` }}
                  ></div>
              </div>
           </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 relative h-full overflow-hidden flex flex-col bg-slate-50/50">
        
        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8 relative scroll-smooth">
            
            {activeTab === 'home' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6 max-w-6xl mx-auto pb-10">
                <Header />
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <div className="xl:col-span-1 h-full"><StatsCard /></div>
                    <div className="xl:col-span-2 h-full"><LogisticsCard /></div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                   <div className="lg:col-span-2"><WeatherCard /></div>
                   <div className="lg:col-span-1"><JapanesePhraseCard /></div>
                </div>
                <div className="hidden md:block"><Footer /></div>
            </div>
            )}

            {activeTab === 'itinerary' && (
            <div className="animate-in fade-in zoom-in-95 duration-300 h-full flex flex-col">
                <div className="flex items-center justify-between mb-6 px-2 shrink-0">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-800 tracking-tight">每日行程</h2>
                        <p className="text-slate-500 text-sm mt-1">左右滑動卡片切換天數</p>
                    </div>
                    {/* Day Quick Links */}
                    <div className="flex gap-2 overflow-x-auto max-w-[150px] sm:max-w-none no-scrollbar py-2">
                        {itinerary.map((day, idx) => (
                            <button 
                                key={idx}
                                onClick={() => scrollToDay(idx)}
                                className="px-3 py-1.5 rounded-full text-xs font-bold bg-white text-slate-600 border border-slate-200 hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors shadow-sm whitespace-nowrap"
                            >
                                {day.dayLabel}
                            </button>
                        ))}
                    </div>
                </div>
                
                {/* Horizontal Scroll Snap Container */}
                <div 
                    ref={itineraryContainerRef}
                    className="flex-1 flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 no-scrollbar items-start px-2"
                    style={{ scrollBehavior: 'smooth' }}
                >
                    {itinerary.map((day, index) => (
                        <div key={index} className="snap-center min-w-full md:min-w-[calc(100%-2rem)] lg:min-w-full h-full flex flex-col">
                            <DayCard 
                                day={day} 
                                onAddItem={(item) => handleAddItineraryItem(day.dayLabel, item)}
                                onUpdateItem={(itemIdx, item) => handleUpdateItineraryItem(day.dayLabel, itemIdx, item)}
                                onDeleteItem={(itemIdx) => handleDeleteItineraryItem(day.dayLabel, itemIdx)}
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
                    onAddExpense={handleAddExpense}
                    onDeleteExpense={handleDeleteExpense}
                    exchangeRate={exchangeRate}
                    onExchangeRateChange={setExchangeRate}
                />
            </div>
            )}

            {activeTab === 'food' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full max-w-6xl mx-auto flex flex-col pb-6">
                 <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-white rounded-2xl shadow-md text-pink-500">
                        <Utensils size={32} />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-slate-800 tracking-tight">美食攻略</h2>
                        <p className="text-slate-500 text-sm mt-1">吃什麼？交給命運決定，享受東京美味</p>
                    </div>
                 </div>
                 {/* Roulette and List Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 min-h-[500px]">
                    <FoodRoulette foodList={foodList} />
                    <FoodTags 
                        foodList={foodList} 
                        onAddFood={handleAddFood}
                        onDeleteFood={handleDeleteFood}
                    />
                </div>
            </div>
            )}

            {activeTab === 'info' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto pt-4 md:pt-10 pb-10">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-slate-800 mb-2">旅遊資訊</h2>
                    <p className="text-slate-500">行前準備、實用連結與打包檢查</p>
                </div>
                
                <div className="space-y-8">
                    <InfoSection />
                    <UsefulLinks />
                    <PackingList packedItems={packedItems} onToggleItem={handleTogglePackingItem} />
                </div>
                
                <div className="mt-12 opacity-80">
                    <Footer />
                </div>
            </div>
            )}

        </div>
      </main>

      {/* Floating Save Button */}
      <button
        onClick={handleSaveData}
        className="fixed z-50 bottom-6 right-6 md:bottom-10 md:right-10 bg-indigo-600 hover:bg-indigo-500 text-white p-4 rounded-full shadow-xl shadow-indigo-300 transition-all hover:scale-110 active:scale-95 border-4 border-white group"
        title="儲存所有變更"
      >
         <Save size={24} className="group-hover:animate-pulse" />
      </button>

      {/* Save Toast */}
      <div 
        className={`fixed z-[60] bottom-24 right-6 md:bottom-24 md:right-10 bg-emerald-500 text-white px-5 py-3 rounded-xl shadow-xl shadow-emerald-200 flex items-center gap-3 transition-all duration-300 ${
            showSaveToast ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-90 pointer-events-none'
        }`}
      >
        <CheckCircle size={20} />
        <span className="font-bold text-sm">已儲存變更！</span>
      </div>
      
      {/* Background Effect */}
      <SakuraBackground />

    </div>
  );
};

export default App;
