import { View, Text, ScrollView } from 'react-native';
import AdminPanel from '../admin/AdminPanel';
import { Container } from '../components/container/Container';

export default function AboutScreen() {
  return (
    <ScrollView className="fr">
      <Container>
        <Text className="text-2xl text-right">تم عمل هذا التطبيق من قبلي.</Text>
        <Text className='text-right text-bold'>حسن عطار</Text>
        <AdminPanel />
      </Container>
    </ScrollView>
  );
}
