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
        <View className='flex-1 mt-5'>
            <View className='flex flex-row gap-1 justify-end '>
                <Text>{idData.name}</Text>
                <Text className='font-semibold'>الاسم:</Text>
            </View>
            <View className='flex flex-row gap-1 justify-end '>
                <Text>{idData.lastName}</Text>
                <Text className='font-semibold'>الشهرة:</Text>
            </View>
            <View className='flex flex-row gap-1 justify-end '>
                <Text>{idData.fatherName}</Text>
                <Text className='font-semibold'>اسم الأب:</Text>
            </View>
            <View className='flex flex-row gap-1 justify-end '>
                <Text>{idData.motherName}</Text>
                <Text className='font-semibold'>اسم الأم:</Text>
            </View>
            <View className='flex flex-row gap-1 justify-end mt-7'>
                <Text>{idData.locationOfBirth}</Text>
                <Text className='font-semibold'>مكان الولادة:</Text>
            </View>
            <View className='flex flex-row gap-1 justify-end '>
                <Text>{idData.dateOfBirth}</Text>
                <Text className='font-semibold'>تاريخ الولادة:</Text>
            </View>
            <View className='flex flex-row gap-1 justify-center mt-1'>
                <Text className='text-xl'>{idData.idNumber}</Text>
            </View>
        </View>
    )
}