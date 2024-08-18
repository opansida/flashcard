import React, { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text } from 'react-native';
import { USER_STORAGE_KEY } from '@/data/api';

const Page = () => {
  const [hasID, setHasID] = useState(false);
  const [idMessage, setIdMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadId = async () => {
      try {
        const id = await AsyncStorage.getItem(USER_STORAGE_KEY);
        if (id) {
          console.log('Stored ID:', id); // output the stored ID
          setIdMessage(`Stored ID: ${id}`);
        } else {
          const randomUserid = Math.random().toString(36);
          console.log('Generated ID:', randomUserid); 
          await AsyncStorage.setItem(USER_STORAGE_KEY, randomUserid);
          setIdMessage(`Generated ID: ${randomUserid}`);
        }
        setHasID(true); 
      } catch (error) {
        console.error('Error loading ID:', error);
      }
    };
    loadId();
  }, []);

  if (hasID) {
    return <Redirect href="/(tabs)/sets" />;
  } else {
    return (
      <View>
        <Text>Loading...</Text>
        {idMessage && <Text>{idMessage}</Text>}
      </View>
    );
  }
};

export default Page;

