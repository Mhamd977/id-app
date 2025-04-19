import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { app } from '../firebase/firebaseConfig';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { RootStackParamList } from '../navigation';
import * as Crypto from 'expo-crypto';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddCarLicCard'>;

interface CarLicenseData {
  id: string;
  cardType: string;
  fullName: string;
  plateNumber: string;
  model: string;
  year: string;
  color: string;
}

const AddCarLicCardScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [fullName, setFullName] = useState('');
  const [plateNumber, setPlateNumber] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [color, setColor] = useState('');

  const handleSave = async () => {
    if (!fullName || !plateNumber || !model || !year || !color) {
        Alert.alert('Error', 'Please fill all the fields');
        return;
    }

    const id = Crypto.randomUUID();
    const newCardData: CarLicenseData = {
        id: id,
        cardType: 'car licence',
        fullName,
        plateNumber,
        model,
        year,  
        color,
      };
    
      const db = getFirestore(app);

    try {
        const docRef = await addDoc(collection(db, "carLicenceCards"), newCardData);
        console.log("Document written with ID: ", docRef.id);
        navigation.navigate('Home');
    } catch (error) {
        let errorMessage = 'Could not save car license data';
        if (error instanceof Error) {
            errorMessage = `Could not save car license data: ${error.message}`;
        } else if (typeof error === 'string') {
            errorMessage = `Could not save car license data: ${error}`;
        } else {
            errorMessage = `Could not save car license data: ${JSON.stringify(error)}`;
        }

        console.error('Error saving car license data:', error);
        Alert.alert('Error', errorMessage);
    }
  };

  return (
    <SafeAreaView className="flex-1 p-4">
      <View className="space-y-4">
        <Text className="text-lg font-bold">Full Name</Text>
        <TextInput
          className="border border-gray-300 rounded p-2"
          value={fullName}
          onChangeText={setFullName}
        />

        <Text className="text-lg font-bold">Plate Number</Text>
        <TextInput
          className="border border-gray-300 rounded p-2"
          value={plateNumber}
          onChangeText={setPlateNumber}
        />

        <Text className="text-lg font-bold">Model</Text>
        <TextInput
          className="border border-gray-300 rounded p-2"
          value={model}
          onChangeText={setModel}
        />

        <Text className="text-lg font-bold">Year</Text>
        <TextInput
          className="border border-gray-300 rounded p-2"
          value={year}
          onChangeText={setYear}
          keyboardType="numeric"
        />

        <Text className="text-lg font-bold">Color</Text>
        <TextInput
          className="border border-gray-300 rounded p-2"
          value={color}
          onChangeText={setColor}
        />

        <Button title="Save" onPress={handleSave} />
      </View>
    </SafeAreaView>
  );
};

export default AddCarLicCardScreen;