// File: AdminPanel.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, Button, StyleSheet, Alert } from 'react-native';
import { collection, getDocs, updateDoc, doc, getFirestore, DocumentData,query, where } from 'firebase/firestore';
import { app } from '../firebase/firebaseConfig';
type Gender = 'Male' | 'Female';
interface IdData {
  id: string;
  name: string;
  lastName: string;
  fatherName: string;
  motherName: string;
  gender: Gender;
  dateOfBirth: string;
  locationOfBirth: string;
  governorate: string;
  civilRegistryNumber: string;
  maritalStatus: string;
  bloodType: string;
  idIssueDate: string;
  address: string;
  idNumber: string;
  imageUrl: string; 
  status: 'pending' | 'verified'; 
}


const AdminPanel = () => {
  const [idData, setIdData] = useState<IdData[]>([]);
  
  const db = getFirestore(app);
  
  useEffect(() => {
    const fetchData = async () => {
     
      try {
        const q = query(collection(db, 'IdData'));
        const querySnapshot = await getDocs(q);
        const data: IdData[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<IdData, 'id'>),
        }));
        setIdData(data);
       
      } catch (error) {
        Alert.alert("Error", "Failed to load data.");

        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

 const handleVerify = async (id: string) => {
    try {
      await updateDoc(doc(db, 'IdData', id), {
        status: 'verified'
      }); 
      setIdData(idData.map(item => item.id === id ? { ...item, status: 'verified' } : item));
    } catch (error) {
      console.error("Error updating document: ", error);
      Alert.alert("Error", "Failed to update status.");
    }
  };

  const renderItem = ({ item }: { item: IdData }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.text}>Name: {item.name}</Text>
      <Text style={styles.text}>Last Name: {item.lastName}</Text>
      <Text style={styles.text}>Father's Name: {item.fatherName}</Text>
      <Text style={styles.text}>Mother's Name: {item.motherName}</Text>
      <Text style={styles.text}>Gender: {item.gender}</Text>
      <Text style={styles.text}>Date of Birth: {item.dateOfBirth}</Text>
      <Text style={styles.text}>Location of Birth: {item.locationOfBirth}</Text>
      <Text style={styles.text}>Governorate: {item.governorate}</Text>
      <Text style={styles.text}>Civil Registry Number: {item.civilRegistryNumber}</Text>
      <Text style={styles.text}>Marital Status: {item.maritalStatus}</Text>
      <Text style={styles.text}>Blood Type: {item.bloodType}</Text>
      <Text style={styles.text}>ID Issue Date: {item.idIssueDate}</Text>
      <Text style={styles.text}>Address: {item.address}</Text>
      <Text style={styles.text}>ID Number: {item.idNumber}</Text>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <Text style={styles.text}>Status: {item.status}</Text>

      
       {item.status === 'pending' && (
        
        <Button title="Verify" onPress={() => handleVerify(item.id)} />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Panel</Text>
     
      <FlatList
        data={idData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
  text:{
    marginBottom: 5
  }
});

export default AdminPanel;