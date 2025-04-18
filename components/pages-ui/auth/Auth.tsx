// components/pages-ui/auth/Auth.tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import Login from './Login';
import Registration from './Registration';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const switchToLogin = () => setIsLogin(true);
  const switchToRegistration = () => setIsLogin(false);

  return (
    <View className="w-full">
      {isLogin ? (
        <Login 
          switchToRegistration={switchToRegistration} 
        />
      ) : (
        <Registration 
          onSuccess={switchToLogin} 
          switchToLogin={switchToLogin} 
        />
      )}
    </View>
  );
}
