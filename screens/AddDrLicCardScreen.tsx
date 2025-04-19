import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Crypto from 'expo-crypto';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { app } from '../firebase/firebaseConfig';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

import { RootStackParamList } from '../navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const AddDrLicCardScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [fullName, setFullName] = useState('');
  const [number, setNumber] = useState('');
  const [cmc, setCmc] = useState('');

  const handleSave = async () => {
    if (!fullName || !number || !cmc) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    try {
      const id = Crypto.randomUUID();
      const db = getFirestore(app);
      const newCard = {
        id: id,
        cardType: 'visa',
        fullName,
        number,
        cmc
      };

      await addDoc(collection(db, 'cards'), newCard);

      Alert.alert("Success", "Data saved successfully!");
      navigation.navigate("Home");

    } catch (error : any) {
      Alert.alert("Error", "Failed to save data.");
      console.error("Error saving data:", error);
    }
  };


  return (
    <SafeAreaView className="flex-1 p-4">
      <View className="space-y-4">
        <Text className="text-xl font-bold">Add Dr. License Card</Text>
        <TextInput
          className="border border-gray-300 rounded-md p-2"
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
        />
        <TextInput
          className="border border-gray-300 rounded-md p-2"
          placeholder="Number"
          value={number}
          onChangeText={setNumber}
        />
        <TextInput
          className="border border-gray-300 rounded-md p-2"
          placeholder="CMC"
          value={cmc}
          onChangeText={setCmc}
        />
        <Button title="Save" onPress={handleSave} />
      </View>
    </SafeAreaView>
  );
};

export default AddDrLicCardScreen;