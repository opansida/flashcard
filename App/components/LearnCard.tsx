import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '@/data/api';

interface Props {
  card: Card;
  isFront: boolean;
  textHidden?: boolean;
}
const LearnCard = ({ card, isFront, textHidden }: Props) => {
  return (
    <View style={styles.container}>
      {isFront && !textHidden && <Text style={styles.text}>{card.question}</Text>}
      {!isFront && <Text style={styles.text}>{card.answer}</Text>}
    </View>
  );
};
export default LearnCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#b8bab9',
    width: 300,
    height: 300,
    justifyContent: 'center',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    shadowColor: '#a2b3a3',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },

  text: {
    fontSize: 18,
    color: '#000',
    alignSelf: 'center',
    marginTop: 20,
  },
});