// components/pages-ui/auth/Login.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';

interface LoginProps {
  switchToRegistration: () => void;
}

export default function Login({ switchToRegistration }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const auth = getAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Login successful - auth state listener in HomeScreen will handle the redirect
    } catch (error: any) {
      let errorMessage = 'Failed to sign in';
      if (error.code === 'auth/invalid-credential') {
        errorMessage = 'Invalid email or password';
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email';
      }
      Alert.alert('Login Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="mt-5 p-6 bg-white rounded-lg shadow-md">
      <Text className="text-2xl font-bold text-center mb-6">Sign In</Text>

      <View className="mb-4">
        <Text className="text-gray-700 mb-2">Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          autoCapitalize="none"
          keyboardType="email-address"
          className="border border-gray-300 p-3 rounded-md"
        />
      </View>

      <View className="mb-6">
        <Text className="text-gray-700 mb-2">Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
          className="border border-gray-300 p-3 rounded-md"
        />
      </View>

      <TouchableOpacity 
        onPress={handleLogin}
        disabled={loading}
        className={`p-3 rounded-md ${loading ? 'bg-gray-400' : 'bg-blue-500'}`}
      >
        <Text className="text-white text-center font-bold">
          {loading ? 'Signing In...' : 'Sign In'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={switchToRegistration} className="mt-4">
        <Text className="text-blue-500 text-center">
          Need an account? Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
}
