// screens/HomeScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { Container } from '../components/container/Container';
import IdCard from '../components/ui/IdCard';
import CardSwiper from '../components/ui/CardSwiper';
import Auth from '../components/pages-ui/auth/Auth';

import idData from '../assets/data/data.json';

import { initializeApp } from '@firebase/app';
import { getAuth, onAuthStateChanged, signOut, User } from '@firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCFMidDp5HQYM1Wj-xoIBIpnq6xSwvgOdA",
  authDomain: "digital-id-af592.firebaseapp.com",
  projectId: "digital-id-af592",
  storageBucket: "digital-id-af592.firebasestorage.app",
  messagingSenderId: "398825313124",
  appId: "1:398825313124:web:3b83ad7e1c0a59822f6071",
  measurementId: "G-EC0VB88Z5J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <Container>
        <View className="flex-1 justify-center items-center">
          <Text>Loading...</Text>
        </View>
      </Container>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <Container>
          {user ? (
            <View>
              <View className="mt-3 flex-row justify-between items-center mb-4">
                <Text className="text-lg font-bold">Welcome, {user.displayName || user.email}</Text>
                <TouchableOpacity
                  onPress={handleSignOut}
                  className="bg-red-500 px-4 py-2 rounded-md"
                >
                  <Text className="text-white">Sign Out</Text>
                </TouchableOpacity>
              </View>

              <View className='mt-3'>
                <IdCard data={idData.data} homePage={true} />
              </View>
              <View className='mt-5'>
                <CardSwiper data={idData.swiperData} />
              </View>
            </View>
          ) : (
            <Auth />
          )}
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
}
