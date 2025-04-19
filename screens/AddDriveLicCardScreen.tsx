import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { app } from '../firebase/firebaseConfig';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { RootStackParamList } from '../navigation';
import * as Crypto from 'expo-crypto';
  
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const AddDriveLicCardScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [fullName, setFullName] = useState('');
  const [nationality, setNationality] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [address, setAddress] = useState('');
  const [governorate, setGovernorate] = useState('');
  const [carsAllowed, setCarsAllowed] = useState<string[]>([]);
  const [newCarAllowed, setNewCarAllowed] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const handleAddCar = () => {
    if (newCarAllowed.trim() !== '') {
      setCarsAllowed([...carsAllowed, newCarAllowed]);
      setNewCarAllowed('');
    }
  };

  const handleDeleteCar = (car: string) => {
    setCarsAllowed(carsAllowed.filter((c) => c !== car));
  };

  const db = getFirestore(app);

  const handleSave = async () => {
    if (!fullName || !nationality || !bloodType || !address || !governorate || carsAllowed.length === 0 || !issueDate || !expiryDate) {
        Alert.alert("Error", "Please fill in all fields.");
        return;
      }
    try {
      const id = Crypto.randomUUID()
      const docRef = await addDoc(collection(db, 'driverLicenceCards'), {
        id: id,
        cardType: 'driver licence',
        fullName,
        nationality,
        bloodType,
        address,
        governorate,
        carsAllowed: carsAllowed,
        issueDate,
        expiryDate,
      });      
      console.log("Document written with ID: ", docRef.id);
      Alert.alert("Success", "Card saved successfully.");
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error saving data:', error);
      Alert.alert('Error', 'Failed to save data.');
    }
  };

  return (
    <SafeAreaView className="flex-1 p-4">
      <ScrollView>
        <View className="space-y-4">
          <Text className="text-lg font-semibold">Full Name</Text>
          <TextInput
            className="border border-gray-300 rounded-md p-2"
            value={fullName}
            onChangeText={setFullName}
            placeholder="Enter full name"
          />

          <Text className="text-lg font-semibold">Nationality</Text>
          <TextInput
            className="border border-gray-300 rounded-md p-2"
            value={nationality}
            onChangeText={setNationality}
            placeholder="Enter nationality"
          />

          <Text className="text-lg font-semibold">Blood Type</Text>
          <TextInput
            className="border border-gray-300 rounded-md p-2"
            value={bloodType}
            onChangeText={setBloodType}
            placeholder="Enter blood type"
          />

          <Text className="text-lg font-semibold">Address</Text>
          <TextInput
            className="border border-gray-300 rounded-md p-2"
            value={address}
            onChangeText={setAddress}
            placeholder="Enter address"
          />

          <Text className="text-lg font-semibold">Governorate</Text>
          <TextInput
            className="border border-gray-300 rounded-md p-2"
            value={governorate}
            onChangeText={setGovernorate}
            placeholder="Enter governorate"
          />
            <Text className="text-lg font-semibold">Cars Allowed</Text>
            <View className="flex flex-row items-center space-x-2">
              <TextInput
                className="border border-gray-300 rounded-md p-2 flex-1"
                value={newCarAllowed}
                onChangeText={setNewCarAllowed}
                placeholder="Enter car type"
              />
              <Button title="Add" onPress={handleAddCar} />
            </View>
            {carsAllowed.map((car, index) => (
              <View key={index} className="flex flex-row items-center space-x-2">
                <Text className="flex-1">{car}</Text>
                <Button title="Delete" onPress={() => handleDeleteCar(car)} />
              </View>
            ))}

          <Text className="text-lg font-semibold">Issue Date</Text>
          <TextInput
            className="border border-gray-300 rounded-md p-2"
            value={issueDate}
            onChangeText={setIssueDate}
            placeholder="Enter issue date"
          />

          <Text className="text-lg font-semibold">Expiry Date</Text>
          <TextInput
            className="border border-gray-300 rounded-md p-2"
            value={expiryDate}
            onChangeText={setExpiryDate}
            placeholder="Enter expiry date"
          />

          <Button title="Save" onPress={handleSave} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddDriveLicCardScreen;