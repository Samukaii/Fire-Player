import {StyleSheet} from 'react-native';
import Colors from '../../../config/styles';

export const st_search = StyleSheet.create({
  button: {
    padding: 12,
    backgroundColor: Colors.button,
    color: 'white',
    width: '27%',
    borderRadius: 5,
  },
  input: {
    padding: 10,
    width: '70%',
    color: '#000',
    backgroundColor: Colors.themeLight,
    marginRight: '3%',
    borderRadius: 15,
  },
  base: {
    display: 'flex',
    flexDirection: 'row',
    padding: 15,
    marginTop: 6,
  },
});

export const st_results = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
  info: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  base: {
    backgroundColor: Colors.background,
    marginVertical: 7,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 30,
    display: 'flex',
    flexDirection: 'row',
    borderColor: Colors.borderTheme,
    borderBottomWidth: 2,
  },
  button: {
    padding: 12,
    backgroundColor: Colors.button,
    color: 'white',
    width: 85,
    marginTop: 15,
    borderRadius: 7,
    alignItems: 'center',
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  artist: {
    fontSize: 15,
    color: 'white',
  },
});
