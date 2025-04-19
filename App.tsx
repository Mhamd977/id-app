import { View, Text } from 'react-native';
import Navigation from './navigation';
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import React, { useState, useEffect } from 'react';
import { app } from './firebase/firebaseConfig';
import { NavigationContainer } from '@react-navigation/native';
import Auth from './components/pages-ui/auth/Auth';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <Navigation /> : <Auth />}
    </NavigationContainer>
  );
}
