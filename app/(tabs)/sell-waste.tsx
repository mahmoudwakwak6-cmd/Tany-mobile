import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  Dimensions, 
  Modal, 
  TextInput 
} from 'react-native';

import { useAppContext } from '../../context/AppContext';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function SellWasteScreen() {
  const { t, theme, lang, addBooking } = useAppContext();
  
  const isDark = theme === 'dark';
  const isAr = lang === 'ar';

  // حالات التحكم في النافذة المنبثقة والكمية
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [amount, setAmount] = useState('1');

  const categories = [
    { id: '1', name: isAr ? 'بلاستيك' : 'Plastic', icon: 'logo-pwa', unit: isAr ? 'كجم' : 'kg' },
    { id: '2', name: isAr ? 'أوراق' : 'Paper', icon: 'document-text-outline', unit: isAr ? 'كجم' : 'kg' },
    { id: '3', name: isAr ? 'معادن' : 'Metals', icon: 'hardware-chip-outline', unit: isAr ? 'كجم' : 'kg' },
    { id: '4', name: isAr ? 'إلكترونيات' : 'E-Waste', icon: 'phone-portrait-outline', unit: isAr ? 'قطعة' : 'unit' },
    { id: '5', name: isAr ? 'زجاج' : 'Glass', icon: 'cube-outline', unit: isAr ? 'كجم' : 'kg' },
    { id: '6', name: isAr ? 'نفايات عضوية' : 'Organic Waste', icon: 'leaf-outline', unit: isAr ? 'كجم' : 'kg' },
    { id: '7', name: isAr ? 'ملابس' : 'Clothing', icon: 'shirt-outline', unit: isAr ? 'كجم' : 'kg' },
    { id: '8', name: isAr ? 'أثاث' : 'Furniture', icon: 'bed-outline', unit: isAr ? 'قطعة' : 'unit' },
    { id: '9', name: isAr ? 'بطاريات' : 'Batteries', icon: 'battery-charging-outline', unit: isAr ? 'قطعة' : 'unit' },
    { id: '10', name: isAr ? 'زيوت' : 'Oils', icon: 'water-outline', unit: isAr ? 'لتر' : 'liter' },
    { id: '11', name: isAr ? 'إطارات' : 'Tires', icon: 'car-outline', unit: isAr ? 'قطعة' : 'unit' },
    { id: '12', name: isAr ? 'خشب' : 'Wood', icon: 'cube-outline', unit: isAr ? 'كجم' : 'kg' },
    { id: '13', name: isAr ? 'بقايا طعام' : 'Food Waste', icon: 'fast-food-outline', unit: isAr ? 'كجم' : 'kg' },
  ];

  // دالة فتح النافذة
  const openAmountModal = (item: any) => {
    setSelectedItem(item);
    setAmount('1');
    setModalVisible(true);
  };

  // دالة التأكيد والإضافة
  const confirmAdd = () => {
    if (selectedItem) {
      addBooking({
        id: Math.random().toString(),
        name: selectedItem.name,
        unit: `${amount} ${selectedItem.unit}`,
        date: new Date().toLocaleDateString()
      });
      setModalVisible(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#FFF' }]}>
      
      <Text style={[styles.mainTitle, { color: isDark ? '#FFF' : '#333' }]}>
        {t('sell')}
      </Text>

      <FlatList
        data={categories}
        numColumns={2}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[styles.card, { backgroundColor: isDark ? '#1E1E1E' : '#F9F9F9' }]}
            onPress={() => openAmountModal(item)}
          >
            <View style={styles.iconContainer}>
              <Ionicons name={item.icon as any} size={40} color="#009688" />
            </View>
            <Text style={[styles.cardText, { color: isDark ? '#FFF' : '#333' }]}>{item.name}</Text>
            <Ionicons name="add-circle" size={26} color="#009688" style={styles.addIcon} />
          </TouchableOpacity>
        )}
      />

      {/* نافذة تحديد الكمية */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: isDark ? '#1E1E1E' : '#FFF' }]}>
            
            <Text style={[styles.modalTitle, { color: isDark ? '#FFF' : '#333' }]}>
              {isAr ? 'حدد الكمية' : 'Set Amount'} ({selectedItem?.name})
            </Text>

            <View style={styles.counterRow}>
              <TouchableOpacity onPress={() => setAmount(Math.max(1, parseInt(amount) - 1).toString())}>
                <Ionicons name="remove-circle-outline" size={40} color="#009688" />
              </TouchableOpacity>
              
              <TextInput 
                style={[styles.amountInput, { color: isDark ? '#FFF' : '#333' }]}
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
              />

              <TouchableOpacity onPress={() => setAmount((parseInt(amount) + 1).toString())}>
                <Ionicons name="add-circle-outline" size={40} color="#009688" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.confirmBtn} onPress={confirmAdd}>
              <Text style={styles.confirmBtnText}>{isAr ? 'إضافة للحجوزات' : 'Add to Bookings'}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={{color: 'red', marginTop: 15}}>{isAr ? 'إلغاء' : 'Cancel'}</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, paddingHorizontal: 15 },
  mainTitle: { fontSize: 30, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  row: { justifyContent: 'space-between', marginBottom: 15 },
  card: {
    width: width * 0.44,
    height: 160,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, padding: 10
  },
  iconContainer: { marginBottom: 10 },
  cardText: { fontSize: 18, fontWeight: 'bold' },
  addIcon: { position: 'absolute', bottom: 15, right: 15 },
  
  // تنسيق المودال
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '80%', padding: 30, borderRadius: 30, alignItems: 'center' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  counterRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 30 },
  amountInput: { fontSize: 24, fontWeight: 'bold', marginHorizontal: 20, textAlign: 'center', width: 60 },
  confirmBtn: { backgroundColor: '#009688', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 15 },
  confirmBtnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' }
});