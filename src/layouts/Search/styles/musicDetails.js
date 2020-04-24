import {StyleSheet} from 'react-native';
import Colors from '../../../config/styles';

export const st_generic = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.themeDark,
    paddingTop: '15%',
    paddingBottom: '20%',
    width: '100%',
    height: '100%',
    margin: 0,
  },
});
export const st_infoMusic = StyleSheet.create({
  image: {
    width: 250,
    height: 250,
    borderRadius: 10,
    borderColor: Colors.themeLight,
    borderWidth: 2,
  },
  title: {
    color: Colors.themeLight,
    fontWeight: 'bold',
    margin: 10,
    fontSize: 18,
  },
  artist: {
    color: Colors.themeLight,
    fontSize: 16,
    marginBottom: 10,
  },
  album: {
    color: Colors.themeLight,
    fontSize: 16,
    marginBottom: 10,
  },
});
export const st_tracklist = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: 20,
  },
  base: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'flex-start',
  },
  info: {
    paddingLeft: 10,
    paddingRight: 20,
    width: 250,
  },
  image: {
    width: 75,
    height: 75,
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
  artist: {
    color: 'white',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export const st_audioPlayer = StyleSheet.create({
  slider: {
    height: 50,
    width: 200,
    color: 'white',
    marginRight: 10,
  },
  base: {
    flexDirection: 'row',
    backgroundColor: Colors.button,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 30,
    borderWidth: 2,
    borderColor: Colors.borderTheme,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
});
