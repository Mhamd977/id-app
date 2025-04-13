import { View, Text, Image } from 'react-native'
import React from 'react'
import { Container } from '../components/container/Container'
import CardTitle from '../components/ui/CardTitle'
import SubCardTitle from '../components/ui/SubCardTitle'

import IdCardDataSection from '../components/ui/IdCardDataSection'

import treeLogo from '../assets/images/tree-logo.png';
import idData from '../assets/data/data.json'
import profileImage from '../assets/images/profile-blank.jpg';

export default function IdInfoScreen() {
  return (
    <Container>
      <View className='mt-3 w-full bg-white p-4 rounded-lg shadow-lg border border-gray-200'>
        <View className='flex flex-row justify-between items-center mb-4'>
          <View className='w-12 h-12 flex justify-center items-center'>
            <Image className='w-full h-full object-cover' source={treeLogo} />
          </View>
          <View className='flex items-end'>
            <CardTitle />
            <SubCardTitle />
          </View>
        </View>

        {/*  */}
        <View className='flex flex-row gap-6'>
          {/* Photo Section */}
          <View className='flex justify-center items-center p-2 rounded-md'>
            <Image className='w-36 h-44 object-cover' source={profileImage} />
          </View>

          {/* Data Section */}
          <IdCardDataSection idData={idData.data} />
        </View>
        
        <View className='mt-1 flex flex-row justify-end'>
          <Text>الملاحظات</Text>
        </View>
      </View>
    </Container>
  )
}