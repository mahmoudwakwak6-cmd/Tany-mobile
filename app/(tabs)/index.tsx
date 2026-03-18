import React from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions } from 'react-native';
import { useAppContext } from '../../context/AppContext';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { isDark, t, userRole } = useAppContext();

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#121212' : '#F5F5F5' }]}>
      <View style={styles.welcomeSection}>
        <Text style={[styles.welcomeText, { color: isDark ? '#FFF' : '#333' }]}>
          {t('home')} - {userRole === 'customer' ? 'العميل' : 'المصنع'}
        </Text>
      </View>

      <ScrollView 
        horizontal 
        pagingEnabled 
        showsHorizontalScrollIndicator={false}
        style={styles.slider}
      >
        <View style={[styles.slide, { backgroundColor: '#009688' }]}>
          <Text style={styles.slideText}>جمع مخلفاتك وساعد البيئة</Text>
        </View>
        <View style={[styles.slide, { backgroundColor: '#2E7D32' }]}>
          <Text style={styles.slideText}>حول الروبابيكيا لفلوس كاش</Text>
        </View>
      </ScrollView>

      <View style={styles.statsContainer}>
        <Text style={[styles.sectionTitle, { color: isDark ? '#FFF' : '#333' }]}>نشاطك الأخير</Text>
        <View style={[styles.emptyBox, { backgroundColor: isDark ? '#1E1E1E' : '#FFF' }]}>
          <Text style={{color: '#888'}}>لا توجد بيانات حالياً</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  welcomeSection: { padding: 20, marginTop: 10 },
  welcomeText: { fontSize: 24, fontWeight: 'bold' },
  slider: { height: 150, marginVertical: 10 },
  slide: { width: width - 40, marginHorizontal: 20, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  slideText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  statsContainer: { padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  emptyBox: { height: 100, borderRadius: 15, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#EEE', borderStyle: 'dashed' }
});