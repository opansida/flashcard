import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Linking, StyleSheet } from 'react-native';

const ViewPDFs = () => {
  const [pdfFiles, setPdfFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPDFs = async () => {
      try {
        const response = await fetch('http://localhost:3000/pdfs'); 
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPdfFiles(data);
      } catch (error) {
        console.error('Error fetching PDF files:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPDFs();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={pdfFiles}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item}</Text>
            <Button
              title="View"
              onPress={() => Linking.openURL(`http://localhost:3000/uploads/${item}`)} 
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    marginBottom: 8,
  },
});

export default ViewPDFs;

