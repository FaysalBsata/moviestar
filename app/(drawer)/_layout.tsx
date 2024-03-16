import { Ionicons } from '@expo/vector-icons';
import { colorTokens } from '@tamagui/themes';
import { Drawer } from 'expo-router/drawer';
import React from 'react';
const Layout = () => {
  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        drawerHideStatusBarOnOpen: true,
        drawerActiveBackgroundColor: colorTokens.dark.blue.blue7,
        drawerActiveTintColor: '#fff',
        drawerLabelStyle: { marginLeft: -16 },
      }}>
      <Drawer.Screen
        name="home"
        options={{
          title: 'Moviestar',
          headerShown: false,
          drawerIcon: ({ color, size }) => <Ionicons name="home-outline" {...{ size, color }} />,
        }}
      />
      <Drawer.Screen
        name="favorite"
        options={{
          title: 'My Favorites',
          headerShown: false,
          drawerIcon: ({ color, size }) => <Ionicons name="star-outline" {...{ size, color }} />,
        }}
      />
    </Drawer>
  );
};

export default Layout;
