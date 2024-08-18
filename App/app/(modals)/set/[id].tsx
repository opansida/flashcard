import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { addToFavorites, Set, getSet } from '@/data/api';
import { defaultStyleSheet } from '@/constants/Styles';

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [set, setSet] = useState<Set>();
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    const loadSet = async () => {
      try {
        const data = await getSet(id);
        console.log("🚀 ~ file: [id].tsx:16 ~ loadSet ~ data:", data); 
        console.log("🚀 ~ file: [id].tsx:17 ~ loadSet ~ set.image.url:", data?.image?.[0]?.url);
        setSet(data);
      } catch (error) {
        console.error("Error loading set:", error);
      }
    };
    loadSet();
  }, [id]);

  // add as a favorite and go back
  const onAddToFavorites = async () => {
    try {
      await addToFavorites(id);
      console.log('Navigating to /sets');
      router.navigate('/sets'); //use navigate not push
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  return (
    <View style={styles.container}>
      {set && (
        <View style={{ alignItems: 'flex-start', padding: 16, gap: 10, flex: 1 }}>
          <Text style={styles.header}>{set.title}</Text>
          <Text style={{ color: '#666' }}>{set.cards} Cards</Text>
          {set.image && set.image[0]?.url && (
            <Image source={{ uri: set.image[0].url }} style={styles.image} />
          )}
          <Text>{set.description}</Text>
          <Text style={{ color: '#666' }}>Created by: {set.creator}</Text>
        </View>
      )}
      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity style={defaultStyleSheet.bottomButton} onPress={onAddToFavorites}>
          <Text style={defaultStyleSheet.buttonText}>Favorites</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
  },
});

export default Page;

