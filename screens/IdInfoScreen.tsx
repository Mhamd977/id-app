import { View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Container } from '../components/container/Container'

import IdCard from '../components/ui/IdCard'

import AsyncStorage from '@react-native-async-storage/async-storage';


export default function IdInfoScreen() {

  const [idData, setIdData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('@idData');
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setIdData(parsedData);
        }
      } catch (error) {
        console.error("Error retrieving data from AsyncStorage", error);
      }
    };
    fetchData();
  }, []);



  return (
    <ScrollView>
      <Container>
        <View className='mt-3'>
          {idData !== null && (
            <IdCard data={idData} homePage={false} />
          )}
        </View>
      </Container>
    </ScrollView>
  )
}