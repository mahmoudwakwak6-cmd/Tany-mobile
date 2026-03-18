import React, { createContext, useState, useContext, useMemo } from 'react';

// --- 1. تعريف الأنواع (Interfaces) ---
interface Booking { 
  id: string; 
  name: string; 
  unit: string; 
  date: string; 
  image?: string; 
}

interface Category { 
  id: string; 
  name: string; 
  icon: string; 
  unit: string; 
}

interface AppContextType {
  lang: 'ar' | 'en';
  theme: 'light' | 'dark';
  userRole: 'customer' | 'factory' | null;
  isLoggedIn: boolean;
  bookings: Booking[];
  addBooking: (item: Booking) => void;
  setUserRole: (role: 'customer' | 'factory' | null) => void;
  setIsLoggedIn: (status: boolean) => void;
  toggleLang: () => void;
  toggleTheme: () => void;
  t: (key: string) => string;
  isDark: boolean;
  isAr: boolean;
  getCategories: () => Category[];
}

// --- 2. القاموس اللغوي الكامل ---
const translations: any = {
  ar: { 
    home: 'الرئيسية', sell: 'بيع', orders: 'الطلبات', reports: 'تقارير', 
    profile: 'حسابي', settings: 'الإعدادات', unit: 'الوحدة' 
  },
  en: { 
    home: 'Home', sell: 'Sell', orders: 'Orders', reports: 'Reports', 
    profile: 'Profile', settings: 'Settings', unit: 'Unit' 
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  // --- 3. حالات التطبيق (States) ---
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [userRole, setUserRole] = useState<'customer' | 'factory' | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);

  // --- 4. الدوال الأساسية ---
  const toggleLang = () => setLang(l => l === 'ar' ? 'en' : 'ar');
  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');
  const t = (key: string) => translations[lang][key] || key;
  const addBooking = (item: Booking) => setBookings(prev => [item, ...prev]);

  // --- 5. قائمة الأصناف الكاملة (Categories) ---
  const categories = useMemo(() => [
    { id: '1', name: lang === 'ar' ? 'بلاستيك' : 'Plastic', icon: 'logo-pwa', unit: 'كجم' },
    { id: '2', name: lang === 'ar' ? 'ورق' : 'Paper', icon: 'document-text', unit: 'كجم' },
    { id: '3', name: lang === 'ar' ? 'معادن' : 'Metals', icon: 'hardware-chip', unit: 'كجم' },
    { id: '4', name: lang === 'ar' ? 'إلكترونيات' : 'E-Waste', icon: 'phone-portrait', unit: 'قطعة' },
    { id: '5', name: lang === 'ar' ? 'زجاج' : 'Glass', icon: 'wine', unit: 'كجم' },
    { id: '6', name: lang === 'ar' ? 'عضوي' : 'Organic', icon: 'leaf', unit: 'كجم' },
    { id: '7', name: lang === 'ar' ? 'ملابس' : 'Clothes', icon: 'shirt', unit: 'كجم' },
    { id: '8', name: lang === 'ar' ? 'أثاث' : 'Furniture', icon: 'bed', unit: 'قطعة' },
    { id: '9', name: lang === 'ar' ? 'بطاريات' : 'Battery-charging', icon: 'battery-charging', unit: 'قطعة' }
  ], [lang]);

  return (
    <AppContext.Provider value={{ 
      lang, theme, userRole, isLoggedIn, bookings, addBooking,
      setUserRole, setIsLoggedIn, toggleLang, toggleTheme, t, 
      isDark: theme === 'dark', 
      isAr: lang === 'ar',
      getCategories: () => categories
    }}>
      {children}
    </AppContext.Provider>
  );
};

// --- 6. Hook المخصص ---
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};