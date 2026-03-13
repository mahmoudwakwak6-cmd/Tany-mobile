import React, { useState } from 'react';
import { View, useWindowDimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Ionicons } from '@expo/vector-icons';
import { useAppContext } from '../../context/AppContext';

// استيراد الشاشات (تأكد من وجود الملفات دي)
import HomeScreen from './index';
import SellWasteScreen from './sell-waste';
import ReportsScreen from './reports';
import ProfileScreen from './profile';

export default function TabLayout() {
  const layout = useWindowDimensions();
  const { theme, lang } = useAppContext();
  const isDark = theme === 'dark';
  const isAr = lang === 'ar';

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'home', title: 'Home', icon: 'home-outline' },
    { key: 'sell', title: 'Sell', icon: 'camera-outline' },
    { key: 'reports', title: 'Reports', icon: 'bar-chart-outline' },
    { key: 'profile', title: 'Profile', icon: 'person-outline' },
  ]);

  // ربط المفاتيح بالشاشات
  const renderScene = SceneMap({
    home: HomeScreen,
    sell: SellWasteScreen,
    reports: ReportsScreen,
    profile: ProfileScreen,
  });

  // تصميم شريط التنقل السفلي المخصص
  const renderTabBar = (props: any) => {
    return (
      <View style={[styles.tabBar, { backgroundColor: isDark ? '#1A1A1A' : '#FFF' }]}>
        {props.navigationState.routes.map((route: any, i: number) => {
          const color = index === i ? '#009688' : '#888';
          return (
            <TouchableOpacity
              key={route.key}
              style={styles.tabItem}
              onPress={() => setIndex(i)}
            >
              <Ionicons name={route.icon} size={24} color={color} />
              <Text style={[styles.tabText, { color }]}>{route.title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      tabBarPosition="bottom" // شريط التنقل تحت
      renderTabBar={renderTabBar}
      swipeEnabled={true} // أهم خاصية: التمرير بالتاتش
    />
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 70,
    borderTopWidth: 0.5,
    borderTopColor: '#eee',
    elevation: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: 11,
    marginTop: 4,
    fontWeight: '500',
  },
});