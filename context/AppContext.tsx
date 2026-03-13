import React, { createContext, useState, useContext } from 'react';

// تعريف شكل الحجز
interface Booking {
  id: string;
  name: string;
  unit: string;
  date: string;
}

interface AppContextType {
  lang: 'ar' | 'en';
  theme: 'light' | 'dark';
  bookings: Booking[]; // قائمة الحجوزات
  addBooking: (item: Booking) => void; // دالة الإضافة
  toggleLang: () => void;
  toggleTheme: () => void;
  t: (key: string) => string;
}

const translations = {
  ar: { home: 'الرئيسية', sell: 'بيع', login: 'دخول', bookings: 'حجوزاتك الحالية', noBookings: 'لا يوجد حجوزات بعد' },
  en: { home: 'Home', sell: 'Sell', login: 'Login', bookings: 'Your Bookings', noBookings: 'No bookings yet' }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [bookings, setBookings] = useState<Booking[]>([]); // المخزن المؤقت

  const toggleLang = () => setLang(l => l === 'ar' ? 'en' : 'ar');
  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');
  
  // دالة إضافة حجز جديد
  const addBooking = (item: Booking) => {
    setBookings(prev => [item, ...prev]); // بيضيف الجديد فوق القديم
  };

  const t = (key: string) => (translations[lang] as any)[key] || key;

  return (
    <AppContext.Provider value={{ lang, theme, bookings, addBooking, toggleLang, toggleTheme, t }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('Error Context');
  return context;
};