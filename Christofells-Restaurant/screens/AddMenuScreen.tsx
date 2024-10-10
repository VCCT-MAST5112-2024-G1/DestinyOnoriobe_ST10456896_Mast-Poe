// screens/AddMenuScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

const courses = ['Starters', 'Mains', 'Desserts'];

type AddMenuScreenProps = NativeStackScreenProps<RootStackParamList, 'AddMenu'>;

export default function AddMenuScreen({ navigation }: AddMenuScreenProps) {
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState(courses[0]);
  const [price, setPrice] = useState('');

  const handleSubmit = () => {
    const newItem = { dishName, description, course, price: parseFloat(price) };
    navigation.navigate('Home', { newItem });
  };

  return (
    <View style={styles.container}>
        <View style={styles.addDiv}>
            <Text style={styles.title}>Add Menu</Text>
            <Text style={styles.label}>Dish Name:</Text>
            <TextInput style={styles.input} onChangeText={setDishName} value={dishName} />

            <Text style={styles.label}>Description:</Text>
            <TextInput style={styles.input} onChangeText={setDescription} value={description} />

            <Text style={styles.label}>Course:</Text>
            <Picker selectedValue={course} onValueChange={setCourse}>
                {courses.map((course) => (
                    <Picker.Item key={course} label={course} value={course} />
                ))}
            </Picker>

            <Text style={styles.label}>Price:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setPrice}
                value={price}
                keyboardType="numeric"
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Add Dish</Text>
            </TouchableOpacity>
        </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  addDiv: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 20,
    height: '100%',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'black',
    color: 'black',
  },
  label: {
    fontSize: 18,
    marginVertical: 8,
    color: 'black',
  },
  input: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 15,
    marginBottom: 10,
    color: 'black',
    backgroundColor: 'white',   
    width: '100%',
  },
  button: {
    backgroundColor: 'black',
    color: 'red',
    borderRadius: 5,
    padding: 10,
    margin: 5,
    width: '100%',
    justifyContent: 'center',   
    textAlign: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
});