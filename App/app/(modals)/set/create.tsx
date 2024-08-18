import { View, Text, TouchableOpacity, TextInput, Switch, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { addToFavorites, createSet } from '@/data/api';
import { defaultStyleSheet } from '@/constants/Styles';
import * as ImagePicker from 'expo-image-picker';

const Page = () => {
  const router = useRouter();
  const [information, setInformation] = useState({
    title: '',
    description: '',
    private: true,
    image: null as any,
  });
  
  
  //request media library permissions 
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
      base64: true, 
    });

    console.log(result);
    
  
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setInformation({ ...information, image: result.assets[0].base64 });
    }
  };

  // create set, add new favorite and go back
  const onCreateSet = async () => {
    const newSet = await createSet(information);
    await addToFavorites(newSet.id);
    router.back();
  };

  return (
    <>
      <View style={[defaultStyleSheet.container, { marginTop: 20, marginHorizontal: 16 }]}>
        <TextInput
          style={defaultStyleSheet.input}
          placeholder="Title"
          value={information.title}
          onChangeText={(text) => setInformation({ ...information, title: text })}
        />
        <TextInput
          style={defaultStyleSheet.descriptionInput}
          placeholder="Description"
          value={information.description}
          onChangeText={(text) => setInformation({ ...information, description: text })}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 8 }}>
          <Switch
            value={information.private}
            onValueChange={(value) => setInformation({ ...information, private: value })}
          />
          <Text>Private</Text>
        </View>

        <TouchableOpacity style={defaultStyleSheet.button} onPress={pickImage}>
          <Text style={defaultStyleSheet.buttonText}>Choose Image</Text>
        </TouchableOpacity>

        {information.image && (
          <Image
            source={{ uri: `data:image/jpeg;base64,${information.image}` }}
            style={{ width: '100%', height: 200, marginTop: 16 }} 
          />
        )}
      </View>

      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity style={defaultStyleSheet.bottomButton} onPress={onCreateSet}>
          <Text style={defaultStyleSheet.buttonText}>Create</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Page;

