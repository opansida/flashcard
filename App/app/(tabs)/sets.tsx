import { View, Text, TouchableOpacity, FlatList, RefreshControl, ListRenderItem, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getMySets } from '@/data/api'
import { defaultStyleSheet } from '@/constants/Styles';
import { Link } from 'expo-router';
import Colors from '@/constants/Colors';

const Page = () => {
  const [sets, setSets] = useState<{ id: string; set: Set; canEdit: boolean }[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    loadSets();
  }, []);

//load sets
const loadSets = async () => {
  const data = await getMySets();
  console.log("🚀 ~ file: sets.tsx:11 ~ loadSets ~ data:", data);
  setSets(data); 
};
  
  
  const renderSetRow: ListRenderItem<{ id: string; set: Set; canEdit: boolean }> = ({
    item: { set, canEdit },
  }) => {
    return (
      <View style={styles.setRow}>
        <View>
          <Text style={styles.rowTitle}>{set.title}</Text>
          <Text style={{ color: '#808080' }}>{set.cards} Cards</Text>
          <Text style={{ color: '#808080' }}>{set.description}</Text>

          <View style={{flexDirection:'row', gap: 4, marginTop:10}}>
          <Link href={`/(learn)/${set.id}?limit=15`} asChild>
                  <TouchableOpacity style={defaultStyleSheet.button}>
                    <Text style={defaultStyleSheet.buttonText}>Max 15 Cards</Text>
                  </TouchableOpacity>
            </Link>
            <Link href={`/(learn)/${set.id}?limit=30`} asChild>
                  <TouchableOpacity style={defaultStyleSheet.button}>
                    <Text style={defaultStyleSheet.buttonText}>Max 30 Cards</Text>
                  </TouchableOpacity>
            </Link>
          </View>


          {canEdit && (
            <Link href={`/(modals)/(cards)/${set.id}`} asChild>
                  <TouchableOpacity style={defaultStyleSheet.button}>
                    <Text style={defaultStyleSheet.buttonText}>Edit</Text>
                  </TouchableOpacity>
            </Link>
          )}
        </View>
      </View>
    );
  };


  return (
    <View style={defaultStyleSheet.container}>
      {!sets.length && (
        <Link href='/(tabs)/search' asChild>
          <TouchableOpacity style={{}}>
          <Text style={{ textAlign: 'center', padding: 20, color: '#3f3f3f' }}>
            Add New Set
          </Text>
          </TouchableOpacity>
        </Link>
      )}

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
    margin: 8,
    padding: 16,
    backgroundColor: '#b8bab9',
    flexDirection: 'row',
  },
  rowTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
});

export default Page;