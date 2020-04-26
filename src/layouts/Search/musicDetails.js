import React, {Component, useState, useEffect} from 'react';
import {st_musicDetails} from './styles';
import axios from 'axios';
import {milisecToTime} from '../../operations/Time';
import {ScrollView, FlatList} from 'react-native';
import Tron from 'reactotron-react-native';

//
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
/*class Track extends Component {
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

export default Track;*/
