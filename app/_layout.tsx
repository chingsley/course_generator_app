// app/_layout.tsx
import { UserDetail, UserDetailContext, UserDetailContextType } from '@/context/UserDetailContext';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'outfit': require('./../assets/fonts/Outfit-Regular.ttf'),
    'outfit-bold': require('./../assets/fonts/Outfit-Bold.ttf'),
    'roboto': require('./../assets/fonts/Roboto-Regular.ttf'),
    'roboto-bold': require('./../assets/fonts/Roboto-Bold.ttf'),
  });

  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
  const contextValue: UserDetailContextType = { userDetail, setUserDetail } as UserDetailContextType;

  // Don’t render anything (or show a splash) until fonts are ready
  if (!fontsLoaded) {
    return null;
  }

  return (
    <UserDetailContext.Provider value={contextValue}>

      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </GestureHandlerRootView>
    </UserDetailContext.Provider>
  );
}
