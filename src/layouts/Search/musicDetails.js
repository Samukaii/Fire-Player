import React, {useState, useEffect} from 'react';
import {st_musicDetails} from './styles';
import axios from 'axios';
import {ScrollView, FlatList} from 'react-native';
import Tron from 'reactotron-react-native';
const Sound = require('react-native-sound');

//
//         MUSIC DETAILS
//

export default function musicDetails({route}) {
  const {product} = route.params;
  const DZapi = axios.create();
  const {st_infoMusic, st_tracklist} = st_musicDetails;
  const [trackListMusics, setTrackListMusics] = useState([]);

  useEffect(() => {
    loadTracksDeezer();
  }, []);

  async function loadTracksDeezer() {
    const responseDZ = await DZapi.get(product.album.tracklist);
    const {data} = responseDZ.data;

    setTrackListMusics(data);
  }

  function renderTrackList({item}) {
    const {Title, Artist, NumberTrack} = st_tracklist;
    const {Base, Info, ImageCover} = st_tracklist;
    const {NumberTrackContainer} = st_tracklist;

    return (
      <Base>
        <ImageCover source={{uri: product.album.cover_medium}} />

        <Info>
          <Title>{item.title_short}</Title>
          <Artist>{item.artist.name}</Artist>
        </Info>

        <NumberTrackContainer>
          <NumberTrack>{item.track_position}</NumberTrack>
        </NumberTrackContainer>
      </Base>
    );
  }

  const {Root, ImageCover, Title, Artist, Album} = st_infoMusic;
  const {List} = st_tracklist;
  return (
    <ScrollView>
      <Root
        source={{uri: product.album.cover_xl}}
        blurRadius={100}
        imageStyle={{opacity: 0.5, transform: [{scaleX: 10}, {scaleY: 10}]}}>
        <ImageCover source={{uri: product.album.cover_xl}} />

        <Title>{product.title}</Title>
        <Artist>{product.artist.name}</Artist>
        <Album>{product.album.title}</Album>

        <FlatList
          style={List.Root}
          data={trackListMusics}
          keyExtractor={item => item.id}
          renderItem={renderTrackList}
        />
      </Root>
    </ScrollView>
  );
}
