import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Tabs, Link } from 'expo-router';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';


const Layout = () => {
  return ( <Tabs 
  screenOptions={{
    headerStyle: {
      backgroundColor: Colors.primary,
    },
    headerTintColor: '#fff', 
    tabBarActiveTintColor: Colors.primary,
    }}
  >
    <Tabs.Screen name="sets" options={{ 
      title: 'Sets',
      tabBarIcon:({size, color}) => (
      <Ionicons name="pricetags-outline" size={size} color={color}/>
      ),
      headerRight: () => (
        <Link href="/(modals)/set/create" asChild>
          <TouchableOpacity style={{marginRight: 10}}>
            <Ionicons name="add-outline" size={26} color="white" />
          </TouchableOpacity>
        </Link>
      ), 
  }} 
  />
  <Tabs.Screen
        name="search"
        options={{
          title: 'Storage',
          tabBarIcon: ({ size, color }) => ( 
          <Ionicons name="folder-open-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Sores',
          tabBarIcon: ({ size, color }) => (<
            Ionicons name="ribbon-outline" size={size} color={color} />
          ),
        }}
        />
        <Tabs.Screen
        name="view"
        options={{
          title: 'View',
          tabBarIcon: ({ size, color }) => (<
            Ionicons name="paper-plane-outline" size={size} color={color} />
          ),
        }}
        />
  </Tabs>
  );
};

export default Layout;

