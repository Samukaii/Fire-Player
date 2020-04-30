import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {st_background} from './styles';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import MusicFiles, {CoverImage} from 'react-native-get-music-files-v3dev-test';
import {faPlay, faPause, faThList} from '@fortawesome/free-solid-svg-icons';
import Tron from 'reactotron-react-native';
import MusicPlayer from './musicPlayer';
var Sound = require('react-native-sound');

const OffTracks = () => {
  const [songs, setSongs] = useState({
    results: [],
    length: 0,
  });
  const [currentTrack, setCurrentTrack] = useState({
    song: new Sound('', ''),
    artist: '',
  });
  const [isPlay, setIsPlay] = useState(false);
  const [iconPlay, setIconPlay] = useState(faPlay);

  useEffect(() => {
    Sound.setCategory('Playback');
    songs.results.length === 0 ? getPermissionsAsync() : () => {};
  }, []);

  useEffect(() => {
    currentTrack.song.play();
  }, [currentTrack.song]);

  const checkPermission = async () => {
    getPermissionsAsync().then(perm => {
      switch (perm) {
        case RESULTS.UNAVAILABLE:
          //console.log('Recurso indisponível');
          break;
        case RESULTS.DENIED:
          //console.log('Recurso ainda não solicitado');
          request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
          updatePermissionsAsync();
          break;
        case RESULTS.GRANTED:
          //console.log('Recurso permitido');
          getSongsAsync();
          break;
        case RESULTS.BLOCKED:
          //console.log('Recurso negado');
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
    const changes = {results: songResult.results, length: songResult.length};
    setSongs({...changes});
  };

  function playSong(item) {
    const song = new Sound('', item.path, err => {
      if (err) {
        return;
      }
      if (currentTrack.song.isLoaded()) {
        currentTrack.song.setVolume(0.0);
        currentTrack.song.stop(() => {
          setCurrentTrack(
            Object.assign({...currentTrack}, {song: song, ...item}),
          );
          Tron.log(currentTrack);
        });
      } else
        setCurrentTrack(
          Object.assign({...currentTrack}, {song: song, ...item}),
        );
    });
  }
  const renderMusics = ({item}) => {
    return (
      <View style={{backgroundColor: '#eee'}}>
        <CoverImage source={item.path} style={{width: 100, height: 100}} />
        <Text>{item.title}</Text>
        <Text>{item.artist}</Text>
        <Text>{item.album}</Text>
        <TouchableOpacity
          style={{padding: 10, backgroundColor: '#3030'}}
          onPress={() => {
            playSong(item);
          }}>
          <Text>Tocar</Text>
        </TouchableOpacity>
      </View>
    );
  };
  function switchPlay() {
    const cs = currentTrack.song;
    const play = currentTrack.song.isPlaying();

    play ? cs.pause() : cs.play();
    play ? setIconPlay(faPlay) : setIconPlay(faPause);
  }

  return (
    <View style={st_background.root}>
      <TouchableOpacity onPress={checkPermission}>
        <Text>Pesquisar</Text>
      </TouchableOpacity>
      <FlatList
        data={songs.results}
        keyExtractor={item => parseInt(item.id)}
        renderItem={renderMusics}
      />
      <MusicPlayer
        iconPlay={iconPlay}
        switchPlay={switchPlay}
        item={currentTrack}
      />
    </View>
  );
};
export default OffTracks;
