import { View, TouchableOpacity, Image, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/index'; 

import CardTitle from './CardTitle'
import SubCardTitle from './SubCardTitle'

import IdCardDataSection from './IdCardDataSection';

import idData from '../../assets/data/data.json'
import profileImage from '../../assets/images/profile-blank.jpg';
import treeLogo from '../../assets/images/tree-logo.png';


export default function IdCard() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const handlePress = () => {
        navigation.navigate('IdInfo');
    };

    return (
        <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
            <View className='w-full bg-white p-4 rounded-lg shadow-lg border border-gray-200'>
                {/* Header Section */}
                <View className='flex flex-row justify-between items-center mb-4'>
                    <View className='w-12 h-12 flex justify-center items-center'>
                        <Image className='w-full h-full object-cover' source={treeLogo} />
                    </View>
                    <View className='flex items-end'>
                        <CardTitle />
                        <SubCardTitle />
                    </View>
                </View>

                {/* Main Content */}
                <View className='flex flex-row gap-6'>
                    {/* Photo Section */}
                    <View className='flex justify-center items-center p-2 rounded-md'>
                        <Image className='w-36 h-44 object-cover' source={profileImage} />
                    </View>

                    {/* Data Section */}
                    <IdCardDataSection idData={idData.data} />
                </View>

                {/* Footer Section */}
                <View className='mt-4 pt-2 border-t border-gray-200'>
                    <View className='flex flex-row justify-between items-center'>
                        <View className='w-24 h-8 bg-gray-200'></View>
                        <Text className='text-sm text-gray-600'>تاريخ الإصدار: {idData.data.idIssueDate}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}
