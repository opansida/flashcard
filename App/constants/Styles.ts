import { StyleSheet } from 'react-native';
import Colors from './Colors';


const defaultStyleSheet = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomButton: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
    width: 300,
    flex: 1,
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: Colors.darkGrey,
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginVertical: 4,
    backgroundColor: '#fff',
  },
  //descriptionInput
  descriptionInput: {
    height: 80,
    borderColor: Colors.darkGrey,
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginVertical: 4,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 40,
    textAlign: 'center',
  },
  //other styles
});

export { defaultStyleSheet };