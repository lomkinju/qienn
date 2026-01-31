
import { DayPlan, FlightDetails, AccommodationDetails, Costs } from './types';

export const FLIGHTS: FlightDetails[] = [
  { direction: 'Departure', date: '2/9 (一)', time: '06:40 → 10:40', airportCode: 'TPE → NRT', city: '台北 → 東京' },
  { direction: 'Return', date: '2/16 (一)', time: '19:55 → 23:10', airportCode: 'NRT → TPE', city: '東京 → 台北' }
];

export const ACCOMMODATION: AccommodationDetails = {
  name: 'DUAL 堀切 (DUAL Horikiri)',
  location: '4 Chome-2-3 Horikiri, Katsushika City, Tokyo 124-0006',
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
      { time: "10:40", activity: "抵達東京成田機場 (NRT)", location: "Narita International Airport", detail: "辦理入境手續。建議事先查好 Terminal/Gate 資訊。" },
      { time: "11:30", activity: "NRT 搭乘 Skyliner", location: "Narita Airport Terminal 1 Station", detail: "前往日暮里。購買 Skyliner 來回票通常比單程划算。" },
      { time: "12:30", activity: "日暮里附近中餐", location: "Nippori Station", detail: "轉盤決定" },
      { time: "14:30", activity: "淺草地區", location: "Sensō-ji", detail: "淺草寺、雷門、淺草商店街。" },
      { time: "14:30", activity: "晴空塔室內購物", location: "Tokyo Solamachi", detail: "雨天備案：若下雨可直接前往晴空塔水族館與購物中心。", isBackup: true },
      { time: "17:00", activity: "晴空塔", location: "Tokyo Skytree", detail: "決定是否參觀水族館，或直接上展望台。" },
      { time: "21:00", activity: "前往 DUAL 堀切住所", location: "4 Chome-2-3 Horikiri, Katsushika City, Tokyo 124-0006", detail: "Check-in。確認 Wi-Fi 和暖氣運作正常。" }
    ]
  },
  {
    dayLabel: "D2", date: "2/10 (二)", theme: "上野文化、銀座時尚、東京鐵塔", themeIcon: "🗼", status: "Planned",
    items: [
      { time: "10:30", activity: "上野動物園", location: "Ueno Zoo", detail: "熊貓觀看可能需要排隊或預約。" },
      { time: "12:30", activity: "阿美橫町午餐", location: "Ameyoko", detail: "有很多便宜的海鮮丼和小吃可選。" },
      { time: "14:30", activity: "東京車站", location: "Tokyo Station", detail: "丸之內紅磚建築、Tokyo Character Street。" },
      { time: "16:00", activity: "銀座", location: "Ginza", detail: "逛街。" },
      { time: "18:00", activity: "東京鐵塔", location: "Tokyo Tower", detail: "準備上展望台或在外圍拍照。" }
    ]
  },
  {
    dayLabel: "D3", date: "2/11 (三)", theme: "池袋動漫、新宿夜生活", themeIcon: "🛍️", status: "Planned",
    items: [
      { time: "11:00", activity: "池袋景點", location: "Animate Ikebukuro", detail: "Animate、JUMP Shop。" },
      { time: "11:00", activity: "Sunshine City (太陽城)", location: "Sunshine City, Ikebukuro", detail: "雨天首選備案：包含水族館、寶可夢中心、室內樂園。", isBackup: true },
      { time: "15:00", activity: "新大久保", location: "Shin-Okubo", detail: "逛小物、小吃，體驗東京的韓國城氛圍。" },
      { time: "18:30", activity: "新宿歌舞伎町", location: "Kabukicho", detail: "歌舞伎町、東口商圈、UNIQLO、Bic Camera。" }
    ]
  },
  {
    dayLabel: "D4", date: "2/12 (四)", theme: "原宿潮流、Shibuya Sky", themeIcon: "⛩️", status: "Planned",
    items: [
      { time: "11:00", activity: "竹下通", location: "Takeshita Street", detail: "購物買衣服，感受年輕潮流氣息。" },
      { time: "12:30", activity: "表參道", location: "Omotesandō", detail: "散步拍照，欣賞精品建築。" },
      { time: "13:30", activity: "明治神宮", location: "Meiji Jingu", detail: "從原宿口進入，預留至少 1.5 小時。" },
      { time: "18:00", activity: "Shibuya Sky", location: "SHIBUYA SKY", detail: "需提前預訂門票，建議日落時段。" }
    ]
  },
  {
    dayLabel: "D5", date: "2/13 (五)", theme: "春日部「小新、神殿」朝聖", themeIcon: "🖍️", status: "Planned",
    items: [
      { time: "10:40", activity: "春日部站朝聖", location: "Kasukabe Station", detail: "錄下小新發車音樂，車站內外的小新看板拍一輪。" },
      { time: "11:15", activity: "Sato-Kokonokado", location: "Ito-Yokado Kasukabe", detail: "拍蝙蝠標誌、逛 3 樓展示區，買限定的「蝙蝠商標」周邊。" },
      { time: "12:00", activity: "春日部八幡神社", location: "Kasukabe Hachiman Shrine", detail: "【拍照點】 穿梭在紅色鳥居參道，拍出最有質感的日本味照片。" },
      { time: "14:30", activity: "首都圈外郭放水路", location: "Metropolitan Area Outer Underground Discharge Channel", detail: "【震撼點】 從南櫻井站過去，進入地下神殿，感受 Minecraft 級的壯觀柱子。" },
      { time: "16:30", activity: "Lala Garden 春日部", location: "Lala Garden Kasukabe", detail: "【好逛好買重點】 直衝 3 樓「布里布里電影院」。拍巨大的電影看板。" }
    ]
  },
  {
    dayLabel: "D6", date: "2/14 (六)", theme: "中野秋葉原爆買、原宿泡湯", themeIcon: "🧖", status: "Planned",
    items: [
      { time: "10:00", activity: "中野 Nakano Broadway", location: "Nakano Broadway", detail: "動漫周邊、手辦、收藏品、小玩具爆買。" },
      { time: "13:00", activity: "秋葉原", location: "Akihabara Electric Town", detail: "Animate、JUMP Shop、電器街、動漫周邊狂掃。" },
      { time: "15:30", activity: "KOSUGIYU HARAJUKU", location: "Kosugiyu Harajuku", detail: "泡湯放鬆、休息、拍照打卡。" }
    ]
  },
  {
    dayLabel: "D7", date: "2/15 (日)", theme: "下北澤文青、古著、湯咖哩", themeIcon: "🎸", status: "Planned",
    items: [
      { time: "11:30", activity: "湯咖哩 SAMURAI", location: "Rojiura Curry SAMURAI. Shimokitazawa", detail: "很有名，建議先抽號碼牌。" },
      { time: "14:30", activity: "下北澤古著巡禮", location: "Shimokitazawa", detail: "在巷弄中挖掘古著，體驗 Minecraft 洞穴模組風。" },
      { time: "14:30", activity: "代官山蔦屋書店", location: "Daikanyama T-Site", detail: "備案：若不喜歡古著，可轉往代官山散步。", isBackup: true }
    ]
  },
  {
    dayLabel: "D8", date: "2/16 (一)", theme: "離境日", themeIcon: "🛫", status: "Planned",
    items: [
      { time: "12:00", activity: "住宿周邊最終採購", location: "4 Chome-2-3 Horikiri, Katsushika City, Tokyo 124-0006", detail: "建議在住處附近或轉乘大站完成最後補貨。" },
      { time: "16:00", activity: "前往成田機場 (NRT)", location: "Narita International Airport", detail: "預留充裕時間。" }
    ]
  }
];

export const INITIAL_EXPENSES = [];

export const CURRENCY_RATE = 0.215;
