
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
  
  const [showSaveToast, setShowSaveToast] = useState(false);

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
      } catch (e) {
        console.error("Failed to load saved data", e);
      }
    }
  }, []);

  // -- Save Data --
  const handleSaveData = () => {
    const dataToSave = {
      itinerary,
      expenses,
      foodList,
      exchangeRate
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

  // Responsive NavButton: Stacked on mobile, Row on Desktop
  const NavButton = ({ tab, icon: Icon, label }: { tab: Tab; icon: any; label: string }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`relative group flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-1 lg:gap-3 w-full p-2 lg:p-3 rounded-xl transition-all duration-300 ${
        activeTab === tab 
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
          : 'text-gray-400 hover:bg-gray-800 hover:text-gray-100'
      }`}
    >
      <Icon size={24} strokeWidth={activeTab === tab ? 2.5 : 2} className="shrink-0" />
      
      {/* Text Label: Small on mobile, Normal on Large Screens */}
      <span className={`text-[10px] lg:text-base font-medium transition-opacity duration-200`}>
        {label}
      </span>

      {/* Active Indicator Strip (Desktop) */}
      {activeTab === tab && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-l-full hidden lg:block"></div>
      )}
    </button>
  );

  return (
    <div className="flex h-screen bg-[#0c1221] text-gray-100 font-sans overflow-hidden">
      
      {/* Sidebar Navigation (Universal) */}
      <aside className="flex flex-col w-20 lg:w-64 h-full bg-gray-900/50 backdrop-blur-xl border-r border-gray-800 p-2 lg:p-4 shrink-0 z-50">
        
        {/* Logo Section */}
        <div className="flex items-center justify-center lg:justify-start gap-3 px-0 lg:px-2 mb-6 lg:mb-10 mt-2">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-lg shadow-lg shrink-0">
                <Plane className="text-white" size={24} />
            </div>
            <h1 className="font-extrabold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-white hidden lg:block">
                TOKYO 2026
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
        <div className="mt-auto pt-6 border-t border-gray-800 hidden lg:block">
           <div className="bg-gray-800/50 rounded-lg p-3 text-xs text-gray-500">
              <p>距離出發還有 300+ 天</p>
              <div className="w-full bg-gray-700 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-indigo-500 w-[10%] h-full rounded-full"></div>
              </div>
           </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 relative h-full overflow-hidden flex flex-col">
        
        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8 relative scroll-smooth">
            
            {activeTab === 'home' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6 max-w-6xl mx-auto">
                <Header />
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <div className="xl:col-span-1 h-full"><StatsCard /></div>
                    <div className="xl:col-span-2 h-full"><LogisticsCard /></div>
                </div>
                <WeatherCard />
                <div className="hidden md:block"><Footer /></div>
            </div>
            )}

            {activeTab === 'itinerary' && (
            <div className="animate-in fade-in zoom-in-95 duration-300 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4 px-2 shrink-0">
                    <div>
                        <h2 className="text-2xl font-bold text-white tracking-wide">每日行程</h2>
                        <p className="text-gray-400 text-sm">左右滑動切換天數</p>
                    </div>
                    {/* Day Quick Links */}
                    <div className="flex gap-1 overflow-x-auto max-w-[150px] sm:max-w-none no-scrollbar">
                        {itinerary.map((day, idx) => (
                            <button 
                                key={idx}
                                onClick={() => scrollToDay(idx)}
                                className="px-3 py-1 rounded-full text-xs font-bold bg-gray-800 hover:bg-indigo-600 hover:text-white text-gray-400 border border-gray-700 transition-colors whitespace-nowrap"
                            >
                                {day.dayLabel}
                            </button>
                        ))}
                    </div>
                </div>
                
                {/* Horizontal Scroll Snap Container */}
                <div 
                    ref={itineraryContainerRef}
                    className="flex-1 flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 no-scrollbar items-start"
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
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full max-w-6xl mx-auto">
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
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full max-w-6xl mx-auto flex flex-col">
                 <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-pink-500/20 rounded-xl">
                        <Utensils className="text-pink-400" size={28} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white tracking-wide">美食攻略</h2>
                        <p className="text-pink-300 text-sm">吃什麼？交給命運決定</p>
                    </div>
                 </div>
                 {/* Roulette and List Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-[500px]">
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
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto pt-4 md:pt-10">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-white mb-2">旅遊資訊</h2>
                    <p className="text-gray-400">行前準備與注意事項</p>
                </div>
                <InfoSection />
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
        className="fixed z-50 bottom-6 right-6 md:bottom-10 md:right-10 bg-indigo-600 hover:bg-indigo-500 text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110 active:scale-95 border-4 border-gray-900 group"
        title="儲存所有變更"
      >
         <Save size={24} className="group-hover:animate-pulse" />
      </button>

      {/* Save Toast */}
      <div 
        className={`fixed z-[60] bottom-24 right-6 md:bottom-24 md:right-10 bg-emerald-500 text-white px-4 py-2 rounded-lg shadow-xl flex items-center gap-2 transition-all duration-300 ${
            showSaveToast ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-90 pointer-events-none'
        }`}
      >
        <CheckCircle size={18} />
        <span className="font-bold text-sm">已儲存變更！</span>
      </div>

    </div>
  );
};

export default App;
