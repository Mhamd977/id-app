import { View, Text, Image, ScrollView } from 'react-native'
import React from 'react'
import { Container } from '../components/container/Container'
import CardTitle from '../components/ui/CardTitle'
import SubCardTitle from '../components/ui/SubCardTitle'

import IdCardDataSection from '../components/ui/IdCardDataSection'

import treeLogo from '../assets/images/tree-logo.png';
import idData from '../assets/data/data.json'
import profileImage from '../assets/images/profile-blank.jpg';
import IdCard from '../components/ui/IdCard'

export default function IdInfoScreen() {
  return (
    <ScrollView>
      <Container>
        <View className='mt-3'>
          <IdCard homePage={false} />
        </View>
      </Container>
    </ScrollView>
  )
}