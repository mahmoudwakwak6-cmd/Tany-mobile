import React, { useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Platform, View, StyleSheet, Dimensions } from 'react-native';
import { useAppContext } from '../../context/AppContext';
import { withLayoutContext } from 'expo-router';

const { width } = Dimensions.get('window');
const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator);

export default function TabLayout() {
  // سحب البيانات من الـ Context
  const { t, isDark, userRole } = useAppContext();

  // ده المكان الصح للـ Log عشان يتأكد الـ Role إيه
  useEffect(() => {
    console.log("--------------------------");
    console.log("الـ Role الحالي في الـ Layout هو:", userRole);
    console.log("--------------------------");
  }, [userRole]);

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#F5F5F5' }]}>
      <TopTabs
        key={`nav-${userRole}`} // إجباري لإعادة بناء التابات
        tabBarPosition="bottom"
        screenOptions={{
          swipeEnabled: true,
          tabBarActiveTintColor: '#009688',
          tabBarInactiveTintColor: isDark ? '#888' : '#aaa',
          tabBarIndicatorStyle: { 
            backgroundColor: '#009688', 
            top: 0, height: 4, borderRadius: 10, width: width / 10, marginLeft: width / 45, 
          },
          tabBarStyle: {
            backgroundColor: isDark ? '#1E1E1E' : '#FFF',
            height: 75,
            marginBottom: 20,
            marginHorizontal: 10,
            borderRadius: 20,
            elevation: 10,
            position: 'absolute',
            left: 0, right: 0, bottom: 0,
            borderTopWidth: 0,
          },
          tabBarLabelStyle: { fontSize: 9, fontWeight: '700' },
          tabBarItemStyle: { height: 70, justifyContent: 'center' },
          tabBarShowIcon: true,
        }}
      >
        {/* 1. الرئيسية */}
        <TopTabs.Screen
          name="index"
          options={{
            title: t('home'),
            tabBarIcon: ({ color }: { color: string }) => <Ionicons name="home" size={20} color={color} />,
          }}
        />

        {/* 2. شاشة البيع - تظهر للعميل فقط */}
        {userRole === 'customer' ? (
          <TopTabs.Screen
            name="sell"
            options={{
              title: t('sell'),
              tabBarIcon: ({ color }: { color: string }) => <Ionicons name="add-circle" size={24} color={color} />,
            }}
          />
        ) : null}

        {/* 3. شاشة الطلبات - تظهر للمصنع فقط */}
        {userRole === 'factory' ? (
          <TopTabs.Screen
            name="orders"
            options={{
              title: t('orders'),
              tabBarIcon: ({ color }: { color: string }) => <Ionicons name="list" size={20} color={color} />,
            }}
          />
        ) : null}

        {/* 4. الشاشات المشتركة */}
        <TopTabs.Screen
          name="reports"
          options={{
            title: t('reports'),
            tabBarIcon: ({ color }: { color: string }) => <Ionicons name="stats-chart" size={20} color={color} />,
          }}
        />

        <TopTabs.Screen
          name="profile"
          options={{
            title: t('profile'),
            tabBarIcon: ({ color }: { color: string }) => <Ionicons name="person" size={20} color={color} />,
          }}
        />

        <TopTabs.Screen
          name="settings"
          options={{
            title: t('settings'),
            tabBarIcon: ({ color }: { color: string }) => <Ionicons name="settings" size={20} color={color} />,
          }}
        />

        {/* قفل أي ملفات تانية بتظهر لوحدها */}
        <TopTabs.Screen name="explore" options={{ href: null, tabBarItemStyle: { display: 'none' } } as any} />
        <TopTabs.Screen name="two" options={{ href: null, tabBarItemStyle: { display: 'none' } } as any} />

      </TopTabs>
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1 } });