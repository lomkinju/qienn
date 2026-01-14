
import { DayPlan, FlightDetails, AccommodationDetails, Costs, ExpenseRecord } from './types';

export const FLIGHTS: FlightDetails[] = [
  { direction: 'Departure', date: '2/9 (一)', time: '06:40 → 10:40', airportCode: 'TPE → NRT', city: '台北 → 東京' },
  { direction: 'Return', date: '2/16 (一)', time: '19:55 → 23:10', airportCode: 'NRT → TPE', city: '東京 → 台北' }
];

export const ACCOMMODATION: AccommodationDetails = {
  name: '北千住 (Kita-Senju) 民宿',
  location: '北千住車站附近',
  period: '2/9 (一) 至 2/16 (一)',
  nights: 7
};

export const COSTS: Costs = {
  flightTotal: 76530,
  flightPerPerson: 12755,
  accommodationTotal: 34087,
  accommodationPerPerson: 5681
};

export const FOOD_LIST: string[] = [
  "燒肉", "壽司", "迴轉壽司", "拉麵", "蕎麥麵", "烏龍麵",
  "咖哩飯", "炸豬排", "湯咖哩", "鰻魚飯", "壽喜燒", "涮涮鍋", "關東煮",
  "章魚燒", "炒麵", "定食", "家庭餐廳"
];

export const ITINERARY_DATA: DayPlan[] = [
  {
    dayLabel: "D1", date: "2/9 (一)", theme: "抵達、淺草古都巡禮", themeIcon: "🏯", status: "Planned",
    items: [
      { time: "10:40", activity: "抵達東京成田機場 (NRT)", detail: "辦理入境手續。建議事先查好 Terminal/Gate 資訊。" },
      { time: "11:30", activity: "NRT 搭乘 Skyliner", detail: "前往日暮里。購買 Skyliner 來回票通常比單程划算。" },
      { time: "12:30", activity: "日暮里附近中餐", detail: "轉盤決定" },
      { time: "14:30", activity: "淺草地區", detail: "淺草寺、雷門、淺草商店街。" },
      { time: "14:30", activity: "晴空塔室內購物", detail: "雨天備案：若下雨可直接前往晴空塔水族館與購物中心。", isBackup: true },
      { time: "17:00", activity: "晴空塔", detail: "決定是否參觀水族館，或直接上展望台。" },
      { time: "18:30", activity: "晚餐", detail: "轉盤決定" },
      { time: "21:00", activity: "前往北千住住所", detail: "Check-in。確認 Wi-Fi 和暖氣運作正常。" },
      { time: "22:00", activity: "唐吉訶德/住所周邊", detail: "買宵夜、補給品。" }
    ]
  },
  {
    dayLabel: "D2", date: "2/10 (二)", theme: "上野文化、銀座時尚、東京鐵塔", themeIcon: "🗼", status: "Planned",
    items: [
      { time: "09:30", activity: "上野車站早餐", detail: "9:30 出門" },
      { time: "10:30", activity: "上野動物園", detail: "熊貓觀看可能需要排隊或預約。" },
      { time: "12:30", activity: "阿美橫町午餐", detail: "有很多便宜的海鮮丼和小吃可選。" },
      { time: "14:30", activity: "東京車站", detail: "丸之內紅磚建築、Tokyo Character Street。" },
      { time: "16:00", activity: "銀座", detail: "逛街。" },
      { time: "16:00", activity: "有樂町 Big Camera / MUJI", detail: "備案：若不想逛精品，可轉往有樂町旗艦店。", isBackup: true },
      { time: "18:00", activity: "東京鐵塔", detail: "準備上展望台或在外圍拍照。" },
      { time: "19:30", activity: "晚餐", detail: "燒肉" },
      { time: "21:30", activity: "回家", detail: "便利商店買消夜" }
    ]
  },
  {
    dayLabel: "D3", date: "2/11 (三)", theme: "次文化動漫、新宿夜生活", themeIcon: "🛍️", status: "Planned",
    items: [
      { time: "10:30", activity: "前往池袋車站", detail: "10:30 出門" },
      { time: "11:00", activity: "池袋景點", detail: "Animate、JUMP Shop。" },
      { time: "11:00", activity: "Sunshine City (太陽城)", detail: "雨天首選備案：包含水族館、寶可夢中心、室內樂園。", isBackup: true },
      { time: "13:00", activity: "池袋午餐", detail: "壽喜燒 (Sukiyaki)" },
      { time: "15:00", activity: "新大久保", detail: "逛小物、小吃，體驗東京的韓國城氛圍。" },
      { time: "18:30", activity: "新宿", detail: "歌舞伎町、東口商圈、UNIQLO、Bic Camera。" },
      { time: "20:00", activity: "晚餐", detail: "推薦：拉麵或居酒屋。" },
      { time: "22:30", activity: "回家", detail: "若時間充裕，可考慮東京都廳拍免費夜景。" }
    ]
  },
  {
    dayLabel: "D4", date: "2/12 (四)", theme: "原宿潮流、Shibuya Sky", themeIcon: "⛩️", status: "Planned",
    items: [
      { time: "10:00", activity: "原宿早餐", detail: "10:00 出門。推薦：竹下通可麗餅。" },
      { time: "11:00", activity: "竹下通", detail: "購物買衣服，感受年輕潮流氣息。" },
      { time: "12:30", activity: "表參道", detail: "散步拍照，欣賞精品建築。" },
      { time: "13:30", activity: "明治神宮", detail: "從原宿口進入，預留至少 1.5 小時。" },
      { time: "15:00", activity: "澀谷午餐", detail: "" },
      { time: "16:00", activity: "澀谷商圈", detail: "大購物、拍攝十字路口。" },
      { time: "18:00", activity: "Shibuya Sky", detail: "需提前預訂門票，建議日落時段。" },
      { time: "20:00", activity: "晚餐", detail: "轉盤決定" }
    ]
  },
  {
    dayLabel: "D5", date: "2/13 (五)", theme: "橫濱一日遊 (轉盤版)", themeIcon: "🎡", status: "Planned",
    items: [
      { time: "09:00", activity: "起床、早餐", detail: "" },
      { time: "10:00", activity: "出發前往橫濱", detail: "搭乘電車前往。" },
      { time: "10:40", activity: "橫濱紅磚倉庫", detail: "拍照、逛特色小店。" },
      { time: "12:30", activity: "橫濱中華街午餐", detail: "小籠包、炒麵、點心。" },
      { time: "14:00", activity: "山下公園", detail: "散步、拍港灣風景。" },
      { time: "15:30", activity: "合味道紀念館", detail: "Cup Noodles Museum。DIY杯麵、拍照、玩互動展。" },
      { time: "18:30", activity: "晚餐", detail: "轉盤決定（港未來周邊餐廳隨機挑，日式/義式/海鮮）。" },
      { time: "20:00", activity: "搭車回東京", detail: "" },
      { time: "21:00", activity: "回住所、休息", detail: "" }
    ]
  },
  {
    dayLabel: "D6", date: "2/14 (六)", theme: "中野秋葉原爆買、原宿泡湯", themeIcon: "🧖", status: "Planned",
    items: [
      { time: "09:00", activity: "起床、早餐", detail: "住所附近簡單吃。" },
      { time: "10:00", activity: "中野 Nakano Broadway", detail: "動漫周邊、手辦、收藏品、小玩具爆買。" },
      { time: "12:00", activity: "中野午餐", detail: "中野附近餐廳，轉盤決定。" },
      { time: "13:00", activity: "秋葉原", detail: "Animate、JUMP Shop、電器街、動漫周邊狂掃。" },
      { time: "15:30", activity: "KOSUGIYU HARAJUKU", detail: "泡湯放鬆、休息、拍照打卡。" },
      { time: "17:30", activity: "居酒屋晚餐", detail: "喝小酒、吃日式下酒菜。" },
      { time: "19:30", activity: "回住所", detail: "休息。" }
    ]
  },
  {
    dayLabel: "D7", date: "2/15 (日)", theme: "下北澤文青、古著、湯咖哩", themeIcon: "🎸", status: "Planned",
    items: [
      { time: "09:00", activity: "起床、早餐", detail: "面對明天要回國的現實。" },
      { time: "10:30", activity: "出發前往下北澤", detail: "約 50 分鐘車程。" },
      { time: "11:30", activity: "湯咖哩排隊 (如: SAMURAI)", detail: "很有名，建議先抽號碼牌。" },
      { time: "13:00", activity: "午餐：湯咖哩", detail: "清單上的重點美食。" },
      { time: "14:30", activity: "古著巡禮", detail: "在巷弄中挖掘古著，體驗 Minecraft 洞穴模組風。" },
      { time: "14:30", activity: "代官山 / 惠比壽", detail: "備案：若不喜歡古著，可轉往代官山散步。", isBackup: true },
      { time: "16:00", activity: "天馬咖哩麵包", detail: "必買的小吃，邊走邊吃。" },
      { time: "17:30", activity: "手沖咖啡休憩", detail: "下北澤有許多特色獨立咖啡廳。" },
      { time: "19:00", activity: "最後晚餐", detail: "順眼的炸豬排或定食。" },
      { time: "21:00", activity: "回住所、最後整理", detail: "確認行李沒超重。" }
    ]
  },
  {
    dayLabel: "D8", date: "2/16 (一)", theme: "離境日", themeIcon: "🛫", status: "Planned",
    items: [
      { time: "上午", activity: "整理行李、Check-out", detail: "檢查有無遺落物品。" },
      { time: "12:00", activity: "最終午餐/採購", detail: "建議在北千住車站周邊完成最後補貨。" },
      { time: "16:00", activity: "前往成田機場 (NRT)", detail: "預留充裕時間。" },
      { time: "19:55", activity: "酷航 TR875 班機", detail: "東京 (NRT) → 台北 (TPE)" }
    ]
  }
];

export const INITIAL_EXPENSES: ExpenseRecord[] = [];

export const CURRENCY_RATE = 0.215;
