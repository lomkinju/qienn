
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
    dayLabel: "D1", date: "2/9 (一)", theme: "抵達東京、淺草寺與晴空塔", themeIcon: "🏯", status: "Planned",
    items: [
      { time: "10:40", activity: "抵達成田機場", location: "Narita International Airport", detail: "領取行李、購買/儲值 Suica。前往 Skyliner 月台。" },
      { time: "11:40", activity: "搭乘 Skyliner", location: "Narita Airport Station", detail: "前往日暮里，車程約 40 分鐘。在車上可以小睡或看窗外風景。" },
      { time: "12:30", activity: "日暮里中餐：馬賊拉麵", location: "Nippori Station", detail: "嘗試有名的手打拉麵，口感扎實。" },
      { time: "14:30", activity: "淺草雷門 & 仲見世通", location: "Kaminarimon Gate", detail: "在雷門拍照，沿途吃人形燒、抹茶甜點。" },
      { time: "16:00", activity: "淺草寺參拜", location: "Sensō-ji", detail: "求籤（御神籤）、參觀本堂。附近有淺草神社也可一併參觀。" },
      { time: "17:30", activity: "隅田川步道 (Sumida River)", location: "Sumida Park", detail: "沿著河流散步往晴空塔前進，這段路拍晴空塔最漂亮。" },
      { time: "18:30", activity: "東京晴空塔 (展望台)", location: "Tokyo Skytree", detail: "俯瞰東京夜景。若下雨可轉往室內商場 Solamachi。" },
      { time: "20:30", activity: "晚餐：晴空塔利久牛舌", location: "Tokyo Solamachi", detail: "來自仙台的名店，牛舌非常厚實脆口。" },
      { time: "22:00", activity: "前往 DUAL 堀切 Check-in", location: "DUAL Horikiri", detail: "休息。住處附近有便利商店可買隔天早餐。" }
    ]
  },
  {
    dayLabel: "D2", date: "2/10 (二)", theme: "上野公園文化、銀座時尚", themeIcon: "🗼", status: "Planned",
    items: [
      { time: "09:30", activity: "上野公園散策", location: "Ueno Park", detail: "欣賞不忍池風景。若體力足夠可看「西鄉隆盛」像。" },
      { time: "10:30", activity: "上野動物園", location: "Ueno Zoo", detail: "必看大熊貓！園區很大，建議預留 2 小時。" },
      { time: "13:00", activity: "阿美橫町：鐵火丼", location: "Ameyoko", detail: "熱鬧的露天商場。午餐吃便宜大碗的海鮮丼。" },
      { time: "15:00", activity: "銀座 Uniqlo 旗艦店", location: "UNIQLO Ginza", detail: "12 層樓的旗艦店，有銀座限定款式與客製化服務。" },
      { time: "17:00", activity: "銀座藝術水族館", location: "Art Aquarium Museum GINZA", detail: "位於銀座三越內，非常適合拍照的絕美水族展。" },
      { time: "18:30", activity: "東京車站：丸之內夜景", location: "Tokyo Station", detail: "拍紅磚建築外觀。地下街有「一番街」可以逛動漫周邊。" },
      { time: "20:00", activity: "晚餐：銀座篝拉麵", location: "Ginza Kagari Main Branch", detail: "超濃郁的雞白湯拉麵（可能需要排隊）。" },
      { time: "21:30", activity: "芝公園看東京鐵塔", location: "Shiba Park", detail: "在公園草皮與東京鐵塔合影，浪漫滿分。" }
    ]
  },
  {
    dayLabel: "D3", date: "2/11 (三)", theme: "池袋動漫、新宿歌舞伎町", themeIcon: "🛍️", status: "Planned",
    items: [
      { time: "10:30", activity: "池袋 Sunshine City", location: "Sunshine City, Ikebukuro", detail: "直奔寶可夢中心旗艦店！還有蠟筆小新專賣店。" },
      { time: "12:30", activity: "中餐：池袋無敵家拉麵", location: "Mutekiya Ramen", detail: "超有名濃郁系，雖然排隊久但值得一試。" },
      { time: "14:30", activity: "池袋 Animate 旗艦店", location: "Animate Ikebukuro", detail: "動漫聖地巡禮。1-9 樓逛到腳軟。" },
      { time: "16:00", activity: "新大久保韓國街", location: "Shin-Okubo", detail: "吃起司熱狗小吃，逛韓系化妝品店。" },
      { time: "18:00", activity: "新宿 3D 巨大貓咪", location: "Cross Shinjuku Vision", detail: "在新宿東口外牆看那隻會動的貓咪，非常壯觀。" },
      { time: "19:00", activity: "歌舞伎町巡禮", location: "Kabukicho", detail: "拍哥吉拉飯店頭部、感受東洋第一紅燈區的霓虹氛圍。" },
      { time: "20:30", activity: "晚餐：思出橫丁 (Piss Alley)", location: "Omoide Yokocho", detail: "復古巷弄吃串燒、喝杯小酒。體驗正宗昭和風。" },
      { time: "22:00", activity: "東京都廳展望台", location: "Tokyo Metropolitan Government Building", detail: "免費看新宿高樓夜景。開放時間請確認當日公告。" }
    ]
  },
  {
    dayLabel: "D4", date: "2/12 (四)", theme: "明治神宮、原宿、澀谷 SKY", themeIcon: "⛩️", status: "Planned",
    items: [
      { time: "09:00", activity: "明治神宮參拜", location: "Meiji Jingu", detail: "早起避開人潮，感受巨大的鳥居與森林芬多精。" },
      { time: "11:00", activity: "竹下通潮流探索", location: "Takeshita Street", detail: "吃可麗餅、看奇特的街頭時尚服裝店。" },
      { time: "13:00", activity: "原宿午餐：阿夫利柚子鹽拉麵", location: "AFURI Harajuku", detail: "清爽不膩的柚子味拉麵，女性人氣極高。" },
      { time: "15:00", activity: "表參道與 Kiddy Land", location: "Kiddy Land Harajuku", detail: "逛精緻玩具店。表參道的建築也非常值得拍照。" },
      { time: "17:00", activity: "澀谷交叉口 & 八公像", location: "Shibuya Crossing", detail: "全世界最繁忙的路口，一定要去二樓星巴克俯拍。在進展望台前先拍照。" },
      { time: "18:40", activity: "Shibuya Sky (預約時段)", location: "SHIBUYA SKY", detail: "【重點行程】已預約 18:40。欣賞東京絕美夜景與十字路口俯瞰。" },
      { time: "20:30", activity: "晚餐：釣船茶屋ざうお 澀谷店", location: "Zauo Shibuya", detail: "獨特的室內釣魚餐廳！可以體驗自己釣魚並請廚房料理，趣味性十足。" },
      { time: "22:00", activity: "澀谷 MEGA 唐吉訶德", location: "MEGA Don Quijote Shibuya", detail: "24 小時營業，最後補貨各類日本零食與小物。" }
    ]
  },
  {
    dayLabel: "D5", date: "2/13 (五)", theme: "春日部「蠟筆小新」聖地朝聖", themeIcon: "🖍️", status: "Planned",
    items: [
      { time: "09:30", activity: "出發前往春日部", location: "Kasukabe Station", detail: "從北千住站轉乘東武晴空塔線。錄下小新發車音樂。" },
      { time: "11:00", activity: "Sato-Kokonokado (百貨)", location: "Ito-Yokado Kasukabe", detail: "電影中的原型百貨。頂樓有蠟筆小新歷史展示區。" },
      { time: "12:30", activity: "春日部午餐：當地食堂", location: "Kasukabe City", detail: "隨意找一家小店，體驗日本郊區小鎮的溫馨感。" },
      { time: "14:00", activity: "首都圈外郭放水路", location: "Metropolitan Area Outer Underground Discharge Channel", detail: "【 Minecraft 級壯觀】地下神殿導覽（需事先網約）。" },
      { time: "16:30", activity: "Lala Garden 布里布里電影院", location: "Lala Garden Kasukabe", detail: "小新主題遊樂場，有許多限定版夾娃娃機。" },
      { time: "18:30", activity: "北千住晚餐：居酒屋街", location: "Kita-Senju Station", detail: "在轉乘站北千住吃晚餐。這裡有很多平價好吃的在地料理。" },
      { time: "21:00", activity: "返回堀切住處", location: "DUAL Horikiri", detail: "整理這幾天買的戰利品。" }
    ]
  },
  {
    dayLabel: "D6", date: "2/14 (六)", theme: "築地海鮮、秋葉原、原宿泡湯", themeIcon: "🧖", status: "Planned",
    items: [
      { time: "08:30", activity: "築地場外市場", location: "Tsukiji Outer Market", detail: "早餐吃生魚片、玉子燒、烤牛雜。記得早點到。" },
      { time: "11:00", activity: "秋葉原電器街", location: "Akihabara Electric Town", detail: "除了電器，還有 Radio Kaikan 逛公仔與周邊。" },
      { time: "13:00", activity: "秋葉原午餐：牛かつ もと村", location: "Gyukatsu Motomura Akihabara", detail: "自己DIY烤炸牛排，外酥內嫩超美味。" },
      { time: "15:00", activity: "中野 Broadway", location: "Nakano Broadway", detail: "古早味玩具、稀有收藏品的天堂。B1 樓有八層冰淇淋。" },
      { time: "17:30", activity: "原宿小杉湯 (Kosugiyu)", location: "Kosugiyu Harajuku", detail: "【特色行程】在原宿潮流區體驗古老公共錢湯，洗去疲勞。" },
      { time: "19:30", activity: "晚餐：原宿炸豬排", location: "Tonkatsu Maisen Aoyama Main Store", detail: "著名的黑豬肉炸豬排，肉質鮮甜。" },
      { time: "21:30", activity: "神田萬世橋夜遊", location: "Maach Ecute Kanda Manseibashi", detail: "舊鐵道紅磚倉庫改裝的文創空間，非常有氣氛。" }
    ]
  },
  {
    dayLabel: "D7", date: "2/15 (日)", theme: "下北澤文青、代官山散策", themeIcon: "🎸", status: "Planned",
    items: [
      { time: "10:00", activity: "豪德寺 (招財貓神社)", location: "Gotokuji Temple", detail: "拍滿地的小招財貓，非常療癒。位於世田谷區。" },
      { time: "12:00", activity: "下北澤午餐：湯咖哩", location: "Rojiura Curry SAMURAI. Shimokitazawa", detail: "招牌蔬菜湯咖哩，營養又美味，一定要排隊。" },
      { time: "14:00", activity: "下北澤古著與音樂店", location: "Shimokitazawa", detail: "探索各類二手服飾、黑膠唱片行。這區路較複雜可開啟導覽。" },
      { time: "16:30", activity: "代官山蔦屋書店", location: "Daikanyama T-Site", detail: "【全球最美書店】體驗安靜的高級代官山文青氣息。" },
      { time: "18:30", activity: "中目黑目黑川散步", location: "Meguro River", detail: "雖然非櫻花季，但兩岸的個性小店與燈光也非常有格調。" },
      { time: "20:00", activity: "晚餐：惠比壽花園廣場", location: "Ebisu Garden Place", detail: "享受高級感的晚餐，拍《花樣男子》取景鐘塔夜景。" },
      { time: "22:00", activity: "最後的便利商店掃貨", location: "7-Eleven Horikiri", detail: "買一堆日本超商甜點回住處當宵夜。" }
    ]
  },
  {
    dayLabel: "D8", date: "2/16 (一)", theme: "柴又老街、離境回程", themeIcon: "🛫", status: "Planned",
    items: [
      { time: "09:30", activity: "柴又帝釋天老街", location: "Shibamata Taishakuten", detail: "離堀切很近！體驗老江戶風情，吃草糰子。這裡是《男人真命苦》拍攝地。" },
      { time: "11:30", activity: "午餐：柴又川甚鰻魚飯", location: "Shibamata Kawajin", detail: "百年鰻魚老店，為旅程畫下完美的句點。" },
      { time: "13:30", activity: "堀切菖浦園散步", location: "Horikiri Shobuen Garden", detail: "回住處拿行李前，在當地的特色庭園走走。" },
      { time: "15:30", activity: "前往成田機場", location: "Narita Airport Terminal 1", detail: "建議提前 3 小時抵達。在機場免稅店做最後採買。" },
      { time: "19:55", activity: "飛機起飛 (回台)", location: "Narita International Airport", detail: "帶著滿滿的回憶與戰利品回台灣！預計 23:10 抵達 TPE。" }
    ]
  }
];

export const INITIAL_EXPENSES = [];

export const CURRENCY_RATE = 0.215;
