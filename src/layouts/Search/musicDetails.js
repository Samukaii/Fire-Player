import React, {Component} from 'react';
import {st_musicDetails} from './styles';
import axios from 'axios';

import {
  Text,
  Image,
  View,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';

const DZapi = axios.create();
const {
  st_infoMusic,
  st_audioPlayer,
  st_tracklist,
  st_generic,
} = st_musicDetails;

class Track extends Component {
  state = {
    timePlaying: '00:00',
    timeTotal: '00:00',
    statusMusic: 0,
    isPlaying: false,
    positionMusic: 0,
    musicLength: 0,

    trackListMusics: [],
  };

  item = this.props.route.params.product;

  componentDidMount() {
    this.loadTracksDeezer();
  }

  converterTempo = miliseconds => {
    let totalSeconds = Math.round(miliseconds / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.round((totalSeconds / 60 - minutes) * 60);

    let minutesFormated = minutes < 10 ? '0' + minutes : minutes;
    let secondsFormated = seconds < 10 ? '0' + seconds : seconds;

    return minutesFormated + ':' + secondsFormated;
  };

  loadTracksDeezer = async () => {
    const responseDZ = await DZapi.get(this.item.album.tracklist);
    const {data} = responseDZ.data;
    console.log(data);
    this.setState({
      trackListMusics: data,
    });
  };

  renderTrackList = ({item}) => (
    <TouchableOpacity style={st_tracklist.base}>
      <Image
        source={{uri: this.item.album.cover_medium}}
        style={st_tracklist.image}
      />
      <View style={st_tracklist.info}>
        <Text style={st_tracklist.title}>{item.title_short}</Text>
        <Text style={st_tracklist.artist}>{item.artist.name}</Text>
      </View>
      <View
        style={{justifyContent: 'center', alignContent: 'center', width: 18}}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>
          {item.track_position}
        </Text>
      </View>
    </TouchableOpacity>
  );
  render() {
    return (
      <ScrollView>
        <ImageBackground
          style={st_generic.root}
          source={{uri: this.item.album.cover_xl}}
          blurRadius={100}
          imageStyle={{
            opacity: 0.5,
            transform: [{scaleX: 10}, {scaleY: 10}],
          }}>
          <Image
            source={{
              uri: this.item.album.cover_xl,
            }}
            style={st_infoMusic.image}
          />
          <Text style={st_infoMusic.title}>{this.item.title}</Text>
          <Text style={st_infoMusic.artist}>{this.item.artist.name}</Text>
          <Text style={st_infoMusic.album}>{this.item.album.title}</Text>

          <FlatList
            style={st_tracklist.root}
            data={this.state.trackListMusics}
            keyExtractor={item => item.id}
            renderItem={this.renderTrackList}
          />
        </ImageBackground>
      </ScrollView>
    );
  }
}

export default Track;
