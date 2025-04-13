import { View, Text } from 'react-native'
import React from 'react'

interface IdCardDataSectionProps {
    idData: {
        name: string;
        lastName: string;
        fatherName: string;
        motherName: string;
        locationOfBirth: string;
        dateOfBirth: string;
        idNumber: string;
    }
}

export default function IdCardDataSection({ idData }: IdCardDataSectionProps) {
    return (
        <View className='flex-1'>
            {/* Personal Information */}
            <View className='mt-2'>
                <View className='flex flex-row gap-2 justify-end items-center'>
                    <Text className='text-base text-gray-600'>{idData.name}</Text>
                    <Text className='font-semibold text-black'>الاسم:</Text>
                </View>
                <View className='flex flex-row gap-2 justify-end items-center'>
                    <Text className='text-base text-gray-600'>{idData.lastName}</Text>
                    <Text className='font-semibold text-black'>الشهرة:</Text>
                </View>
                <View className='flex flex-row gap-2 justify-end items-center'>
                    <Text className='text-base text-gray-600'>{idData.fatherName}</Text>
                    <Text className='font-semibold text-black'>اسم الأب:</Text>
                </View>
                <View className='flex flex-row gap-2 justify-end items-center'>
                    <Text className='text-base text-gray-600'>{idData.motherName}</Text>
                    <Text className='font-semibold text-black'>اسم الأم:</Text>
                </View>
            </View>

            {/* Birth Information */}
            <View className='mt-4'>
                <View className='flex flex-row gap-2 justify-end items-center'>
                    <Text className='text-base text-gray-600'>{idData.locationOfBirth}</Text>
                    <Text className='font-semibold text-black'>مكان الولادة:</Text>
                </View>
                <View className='flex flex-row gap-2 justify-end items-center'>
                    <Text className='text-base text-gray-600'>{idData.dateOfBirth}</Text>
                    <Text className='font-semibold text-black'>تاريخ الولادة:</Text>
                </View>
            </View>

            {/* ID Number */}
            <View className='mt-6 bg-blue-50 p-2 rounded-md'>
                <Text className='text-center text-xl font-bold tracking-wider'>{idData.idNumber}</Text>
            </View>
        </View>
    )
}