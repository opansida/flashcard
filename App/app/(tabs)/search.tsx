import {
  View,
  Text,
  ListRenderItem,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Set, getSets } from '@/data/api';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import Colors from '@/constants/Colors';
import { transformImage } from '@xata.io/client';  
import { defaultStyleSheet } from '@/constants/Styles';
import 'react-native-url-polyfill/auto';

const Page = () => {
  const [sets, setSets] = useState<Set[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    loadSets();
  }, []);

  const loadSets = async () => {
    const data = await getSets();
    console.log("🚀 ~ file: sets.tsx:11 ~ loadSets ~ data:", data);
    setSets(data);
  };

  const renderSetRow: ListRenderItem<Set> = ({ item }) => {
    // handle URL
    const imageUrl = item.image && item.image.length > 0 ? item.image[0].url : null;

    return (
      <Link href={`/(modals)/set/${item.id}`} asChild>
        <TouchableOpacity style={styles.setRow}>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            {imageUrl ? (
              <Image
                source={{ uri: transformImage(imageUrl, { width: 100, height: 100 }) }}
                style={{ width: 60, height: 60, borderRadius: 8 }}
              />
            ) : (
              <View style={{ width: 50, height: 50, backgroundColor: '#b8bab9' }} />
            )}
            <View style={{ flex: 1 }}>
              <Text style={styles.rowTitle}>{item.title}</Text>
              <Text style={{ color: '#808080' }}>{item.cards} Cards</Text>
              <Text style={{ color: '#808080' }}>{item.description}</Text>
              <Text style={{ color: '#808080' }}>{item.xata.createdAt.substring(0, 10)}</Text>         
            </View>
            <Ionicons name="chevron-forward-outline" size={24} color="black" />
          </View>
        </TouchableOpacity>
      </Link>
    );
  };

  return (
    <View style={defaultStyleSheet.container}>
      <FlatList
        data={sets}
        renderItem={renderSetRow}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={loadSets} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  setRow: {
    padding: 16,
    backgroundColor: '#b8bab9',
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey,
  },
  rowTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
});

export default Page;
