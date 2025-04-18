import { View, Text } from 'react-native';

export default function AboutScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl text-right">تم عمل هذا التطبيق من قبلي.</Text>
      <Text className='text-right text-bold'>محمد ناصر</Text>
    </View>
  );
}
