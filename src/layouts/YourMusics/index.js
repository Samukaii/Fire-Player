import React, {useState, use} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {st_background} from './styles';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import MusicFiles, {CoverImage} from 'react-native-get-music-files-v3dev-test';

const OffTracks = () => {
  const [songs, setSongs] = useState({
    results: [
      {
        id: '',
        title: 'Samuka',
        album: '',
        artist: '',
        duration: 0,
        path: '',
      },
    ],
    length: 0,
  });

  const checkPermission = async () => {
    getPermissionsAsync().then(perm => {
      switch (perm) {
        case RESULTS.UNAVAILABLE:
          console.log('Recurso indisponível');
          break;
        case RESULTS.DENIED:
          console.log('Recurso ainda não solicitado');
          request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
          updatePermissionsAsync();
          break;
        case RESULTS.GRANTED:
          console.log('Recurso permitido');
          getSongsAsync();
          break;
        case RESULTS.BLOCKED:
          console.log('Recurso negado');
          break;
      }
    });
  };

  const getPermissionsAsync = async () => {
    const permissionResult = await check(
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    );
    return permissionResult;
  };
  const getSongsAsync = async () => {
    const songResult = await MusicFiles.getSongs({});
    setSongs({results: songResult.results, length: songResult.length});
  };

  const renderMusics = results => (
    <View style={{backgroundColor: 'red'}}>
      <Text>{results.title}</Text>
      <Text>{results.artist}</Text>
      <Text>{results.album}</Text>
    </View>
  );

  return (
    <View style={st_background.root}>
      <TouchableOpacity onPress={checkPermission}>
        <Text>Pesquisar</Text>
      </TouchableOpacity>
      <FlatList
        style={{backgroundColor: 'green', flex: 1}}
        data={songs.results}
        keyExtractor={item => parseInt(item.id)}
        renderItem={renderMusics}
      />
    </View>
  );
};
export default OffTracks;
