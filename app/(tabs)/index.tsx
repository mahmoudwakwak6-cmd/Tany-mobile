import React from 'react';

import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  StatusBar 
} from 'react-native';

import { useAppContext } from '../../context/AppContext';

import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {

  // استخراج البيانات اللي محتاجينها من الـ Context
  const { 
    t, 
    theme, 
    bookings, 
    lang 
  } = useAppContext();

  // تحديد الحالة الحالية (داكن أم فاتح / عربي أم إنجليزي)
  const isDark = theme === 'dark';
  const isAr = lang === 'ar';

  return (
    <View 
      style={[
        styles.container, 
        { backgroundColor: isDark ? '#121212' : '#FFFFFF' }
      ]}
    >
      
      {/* ضبط شكل شريط الساعة والبطارية أعلى الشاشة */}
      <StatusBar 
        barStyle={isDark ? "light-content" : "dark-content"} 
      />

      {/* منطقة العنوان (Header) */}
      <View 
        style={[
          styles.header, 
          { flexDirection: isAr ? 'row-reverse' : 'row' }
        ]}
      >
        <Text 
          style={[
            styles.title, 
            { color: isDark ? '#FFFFFF' : '#333333' }
          ]}
        >
          {t('home')}
        </Text>

        <Ionicons 
          name="notifications-outline" 
          size={26} 
          color={isDark ? '#009688' : '#333333'} 
        />
      </View>


      {/* الجزء الخاص بعرض البيانات أو رسالة "لا يوجد بيانات" */}
      <View style={styles.content}>
        
        <Text 
          style={[
            styles.subtitle, 
            { textAlign: isAr ? 'right' : 'left' }
          ]}
        >
          {t('bookings')}
        </Text>

        {bookings.length === 0 ? (
          
          // في حالة عدم وجود حجوزات (Empty State)
          <View style={styles.emptyContainer}>
            
            <View style={styles.emptyIconWrapper}>
              <Ionicons 
                name="receipt-outline" 
                size={60} 
                color="#009688" 
              />
            </View>

            <Text style={[styles.emptyText, { color: isDark ? '#AAAAAA' : '#666666' }]}>
              {t('noBookings')}
            </Text>

          </View>

        ) : (

          // في حالة وجود حجوزات (عرض القائمة)
          <FlatList
            data={bookings}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => (
              
              <View 
                style={[
                  styles.card, 
                  { 
                    backgroundColor: isDark ? '#1E1E1E' : '#F9F9F9',
                    flexDirection: isAr ? 'row-reverse' : 'row' 
                  }
                ]}
              >
                
                <View style={styles.cardInfo}>
                  <Text style={[styles.cardName, { color: isDark ? '#FFFFFF' : '#333333' }]}>
                    {item.name}
                  </Text>
                  
                  <Text style={styles.cardDate}>
                    {item.date}
                  </Text>
                </View>

                <Text style={styles.cardUnit}>
                  {item.unit}
                </Text>

              </View>
            )}
          />

        )}
      </View>

    </View>
  );
}

// التنسيقات (Styles)
const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingTop: 50, // مسافة لضمان عدم التداخل مع نوتش الموبايل
  },

  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    marginBottom: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
  },

  subtitle: {
    fontSize: 16,
    color: '#888888',
    marginBottom: 20,
  },

  emptyContainer: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyIconWrapper: {
    marginBottom: 15,
    opacity: 0.5,
  },

  emptyText: {
    fontSize: 18,
    textAlign: 'center',
  },

  card: {
    padding: 20,
    borderRadius: 18,
    marginBottom: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    
    // لإعطاء لمسة ظل خفيفة
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  cardInfo: {
    flex: 1,
  },

  cardName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },

  cardDate: {
    fontSize: 13,
    color: '#999999',
  },

  cardUnit: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#009688',
  }

});