
export type ItineraryStatus = 'Planned' | 'Unplanned';

export interface ItineraryItem {
  time: string;
  activity: string;
  detail: string;
  isHighlight?: boolean;
  isBackup?: boolean; // 新增：是否為備用方案
}

export interface DayPlan {
  dayLabel: string;
  date: string;
  theme: string;
  themeIcon: string;
  status: ItineraryStatus;
  items: ItineraryItem[];
}

export interface FlightDetails {
  direction: 'Departure' | 'Return';
  date: string;
  time: string;
  airportCode: string;
  city: string;
}

export interface AccommodationDetails {
  name: string;
  location: string;
  period: string;
  nights: number;
}

export interface Costs {
  flightTotal: number;
  flightPerPerson: number;
  accommodationTotal: number;
  accommodationPerPerson: number;
}

export type ExpenseCategory = 'Food' | 'Transport' | 'Shopping' | 'Ticket' | 'Accommodation' | 'Other' | 'Activity';

export interface ExpenseRecord {
  id: string;
  date: string;
  item: string;
  category: ExpenseCategory;
  amount: number;
  payer: string;
}
