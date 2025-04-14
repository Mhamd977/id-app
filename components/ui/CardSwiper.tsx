import { View, Text, FlatList, Dimensions } from 'react-native';
import idData from '../../assets/data/data.json';

interface SwiperDataItem {
    id: number;
    cardType: string;
    fullName?: string;
    carsAllowed?: string[];
    expiryDate?: string;
    issueDate?: string;
    nationality?: string;
    bloodType?: string;
    address?: string;
    governorate?: string;
    plateNumber?: string;
    color?: string;
    model?: string;
    year?: string;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;
const SPACING = 10;

export default function CardSwiper({ data }: { data: SwiperDataItem[] }) {
    const renderCard = ({ item }: { item: SwiperDataItem }) => {
        switch (item.cardType) {
            case 'driver licence':
                return (
                    <View style={{ width: CARD_WIDTH }} className='bg-white p-4 rounded-lg shadow-lg border border-gray-200 mx-2'>
                        <Text className='text-xl font-bold mb-2'>{item.cardType}</Text>
                        <View className='space-y-2'>
                            <Text className='text-base'>{item.fullName}</Text>
                            <Text className='text-sm text-gray-600'>Allowed Vehicles: {item.carsAllowed?.join(', ')}</Text>
                            <Text className='text-sm text-gray-600'>Expiry: {item.expiryDate}</Text>
                            <Text className='text-sm text-gray-600'>Issue Date: {item.issueDate}</Text>
                        </View>
                    </View>
                );
            case 'car licence':
                return (
                    <View style={{ width: CARD_WIDTH }} className='bg-white p-4 rounded-lg shadow-lg border border-gray-200 mx-2'>
                        <Text className='text-xl font-bold mb-2'>{item.cardType}</Text>
                        <View className='space-y-2'>
                            <Text className='text-base'>{item.fullName}</Text>
                            <Text className='text-sm text-gray-600'>Plate: {item.plateNumber}</Text>
                            <Text className='text-sm text-gray-600'>Model: {item.model}</Text>
                            <Text className='text-sm text-gray-600'>Year: {item.year}</Text>
                            <Text className='text-sm text-gray-600'>Color: {item.color}</Text>
                        </View>
                    </View>
                );
            default:
                return (
                    <View style={{ width: CARD_WIDTH }} className='bg-white p-4 rounded-lg shadow-lg border border-gray-200 mx-2'>
                        <Text className='text-xl font-bold'>{item.cardType}</Text>
                    </View>
                );
        }
    };

    return (
        <FlatList
            data={data}
            renderItem={renderCard}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH + SPACING * 2}
            decelerationRate="fast"
            contentContainerStyle={{
                paddingHorizontal: SPACING,
            }}
        />
    );
}
