// screens/HomeScreen.tsx
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { Container } from '../components/container/Container';
import IdCard from '../components/ui/IdCard';
import CardSwiper from '../components/ui/CardSwiper';
import Auth from '../components/pages-ui/auth/Auth';

import { getFirestore, query, collection, where, getDocs } from 'firebase/firestore';
import { app } from '../firebase/firebaseConfig';

import idData from '../assets/data/data.json';

import { initializeApp } from '@firebase/app';
import { getAuth, onAuthStateChanged, signOut, User } from '@firebase/auth';
import AddBtnLink from '../components/ui/add-id-data/AddBtnLink';

const firebaseConfig = {

};

// Initialize Firebase

const auth = getAuth(app);

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [theIdData, setTheIdData] = useState<any>(null);
  const [idDataStatus, setIdDataStatus] = useState<string | boolean | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        setUser(currentUser);
  
        if (currentUser) {
          const storedData = await AsyncStorage.getItem('@idData');
          if (storedData) {
            const parsedData = JSON.parse(storedData);
            setTheIdData(parsedData);
            setIdDataStatus(parsedData.status);
            setLoading(false); 
          }
          const db = getFirestore(app);
  
          const userEmail = currentUser.email;
  
          const q = query(collection(db, 'IdData'), where('userEmail', '==', userEmail));
          const querySnapshot = await getDocs(q);
  
          if (querySnapshot.empty) {
            setIdDataStatus(false);
            try {
              await AsyncStorage.removeItem("@idData");
            } catch (e) {
              console.error("Error removing data from AsyncStorage", e);
            }
          } else {
            querySnapshot.forEach(async (doc) => {
              const data = doc.data()
              setTheIdData(data);
              
              console.log("Document data:", data);
              try {
                await AsyncStorage.setItem('@idData', JSON.stringify(data));
              } catch (e) {
                console.error("Error saving data to AsyncStorage", e);
              }
              if (idDataStatus !== data.status) {
                setIdDataStatus(data.status);
              }
            });
          }
        }
  
        setLoading(false);
      });
  
      // Cleanup subscription
      return () => unsubscribe();
    }, []);
  

  console.log("theIdData", theIdData);

  useEffect(() => {
    
  }, [idDataStatus])


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
      <ScrollView className=''>
        <Container>
          {user ? (
            <View>

              <View className="mt-3 flex-row justify-between items-center mb-4">
                <Text className="text-lg font-bold">Welcome, {user.displayName || user.email}</Text>
                <TouchableOpacity onPress={handleSignOut} className="bg-red-500 px-4 py-2 rounded-md">
                  <Text className="text-white">Sign Out</Text>
                </TouchableOpacity>
              </View>

              {idDataStatus === 'verified' ?
                (<View className='mt-3'>
                  {theIdData &&
                    <IdCard data={theIdData} homePage={true} />
                  }
                </View>)
                : idDataStatus === false ? (
                  <AddBtnLink />
                ) : idDataStatus === null ? null : (
                <AddBtnLink />
              )}
              <View className='mt-5 mb-5'>
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
