import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation, route }: HomeScreenProps) {
  const [menuItems, setMenuItems] = useState<{ dishName: string, description: string, course: string, price: number }[]>([]);

  useEffect(() => {
    if (route.params?.newItem) {
      const newItem = route.params.newItem;
      
      // Validate the price to ensure it's a number
      const price = isNaN(newItem.price) ? 0 : Number(newItem.price);

      setMenuItems((prevItems) => [
        ...prevItems, 
        { ...newItem, price } // Ensure price is a number
      ]);
    }
  }, [route.params?.newItem]);

  const calculateAveragePrice = (course: string) => {
    const filteredItems = menuItems.filter(item => item.course === course && !isNaN(item.price));
    const totalPrice = filteredItems.reduce((acc, item) => acc + item.price, 0);
    return filteredItems.length > 0 ? totalPrice / filteredItems.length : 0;
  };

  // Function to delete a menu item
  const deleteItem = (index: number) => {
    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete this dish?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            const updatedMenuItems = menuItems.filter((_, itemIndex) => itemIndex !== index);
            setMenuItems(updatedMenuItems); // Update the state with the new list
          },
        },
      ],
      { cancelable: true }
    );
  };

  // Calculate average prices for each course type
  const startersAvg = calculateAveragePrice('Starters');
  const mainsAvg = calculateAveragePrice('Mains');
  const dessertsAvg = calculateAveragePrice('Desserts');

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={{ width: 200, height: 200 }} />
      <Text style={styles.title}>Christoffel's Kitchen</Text>
      <View style={styles.navlinks}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddMenu')}>
          <Text style={styles.buttonText}>Add Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('FilterMenu', { menuItems })}
        >
          <Text style={styles.buttonText}>Filtered Menu</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.total}>Total Items: {menuItems.length}</Text>

      <View style={styles.averageContainer}>
        <Text style={styles.averageText}>Starters Average: ZAR {startersAvg.toFixed(2)}</Text>
        <Text style={styles.averageText}>Mains Average: ZAR {mainsAvg.toFixed(2)}</Text>
        <Text style={styles.averageText}>Desserts Average: ZAR {dessertsAvg.toFixed(2)}</Text>
      </View>

      {/* Display Existing Items */}
      <Text style={styles.sectionTitle}>Current Menu Items</Text>
      <FlatList
        style={{ width: '100%' }}
        data={menuItems}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.menuItem}>
            <View style={styles.itemDetails}>
              <Text style={styles.dishNameandCourse}>{item.dishName} - {item.course}</Text>
              <Text style={styles.dishDescriptionText}>{item.description}</Text>
              <Text style={styles.dishPriceText}>ZAR {item.price.toFixed(2)}</Text>
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteItem(index)}
            >
              <Text style={styles.deleteButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No menu items available</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'black',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white',
  },
  menuItem: {
    borderBottomWidth: 1,
    paddingVertical: 10,
    color: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemDetails: {
    flex: 1,
    marginRight: 10,
  },
  navlinks: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    width: '100%',
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
    margin: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
  total: {
    color: 'white',
  },
  dishNameandCourse: {
    fontSize: 18,
    color: 'white',
    marginBottom: 5,
  },
  dishDescriptionText: {
    color: 'white',
    marginBottom: 5,
  },
  dishPriceText: {
    color: 'white',
  },
  averageContainer: {
    marginVertical: 20,
    width: '100%',
    alignItems: 'center',
  },
  averageText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 20,
    color: 'white',
    marginTop: 20,
    marginBottom: 10,
  },
  emptyText: {
    color: 'white',
    fontStyle: 'italic',
    marginTop: 20,
  },
});
