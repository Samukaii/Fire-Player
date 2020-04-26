import React, {Component} from 'react';
import DZapi from '../../services/Deezer.Api';
import {st_listMusics, st_generic} from './styles';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {FlatList, ToastAndroid, TextInput} from 'react-native';

const {st_results, st_search} = st_listMusics;

class ListMusics extends Component {
  pesquisa = texto => {};
  state = {
    fimPesquisa: false,
    term: 'projota',
    results: [],
    page: 1,
    limit: 10,
    limitMax: 50,
    resultCount: 0,
  };
  componentDidMount() {
    this.loadTracksDeezer();
  }

  loadTracksDeezer = async (
    offsetLimit = 0,
    term = 'projota',
    limit = 10,
    more = false,
  ) => {
    const responseDZ = await DZapi.get(
      `/search/track?q=${encodeURI(term)}&limit=${limit}&index=${offsetLimit}`,
    );
    const {data, resultCount} = responseDZ.data;
    const {page} = this.state;

    if (resultCount !== 0) this.setState({page: page + 1});
    else this.setState({fimPesquisa: true});

    if (more) {
      this.setState({
        results: [...this.state.results, ...data],
      });
    } else {
      this.setState({
        fimPesquisa: false,
        page: 1,
        results: data,
      });
      ToastAndroid.showWithGravity(
        'Pesquisando por ' + term,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
  };

  loadMoreDeezer = () => {
    const {page, term, limit, limitMax, fimPesquisa, results} = this.state;
    const resultCount = results.length;

    if (!fimPesquisa && resultCount < limitMax) {
      ToastAndroid.showWithGravity(
        'Carregandro mais músicas...',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      const offset = page * limit;
      const rest = limitMax - resultCount >= 10 ? 10 : limitMax - resultCount;
      this.loadTracksDeezer(offset, term, rest, true);
    } else
      ToastAndroid.showWithGravity(
        'Fim da lista',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
  };

  renderItemDeezer = ({item}) => (
    <View style={st_results.base}>
      <Image source={{uri: item.album.cover_medium}} style={st_results.image} />
      <View style={st_results.info}>
        <Text style={st_results.title}>{item.title}</Text>
        <Text style={st_results.artist}>{item.artist.name}</Text>

        <TouchableOpacity
          style={st_results.button}
          onPress={() => {
            this.props.navigation.navigate('details', {product: item});
          }}>
          <Text style={{color: 'white'}}>Ouvir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  render() {
    return (
      <View style={{backgroundColor: '#112'}}>
        <View style={st_search.base}>
          <TextInput
            style={st_search.input}
            onSubmitEditing={() => this.loadTracksDeezer(0, this.state.term)}
            placeholder="Digite aqui uma música"
            placeholderTextColor="#222"
            onChangeText={text => {
              this.setState({term: text});
            }}
          />
          <TouchableOpacity
            style={st_search.button}
            onPress={() => {
              this.loadTracksDeezer(0, this.state.term);
            }}>
            <Text style={{color: 'white'}}>Pesquisar</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          style={st_generic.lista}
          data={this.state.results}
          keyExtractor={item => item.id}
          renderItem={this.renderItemDeezer}
          onEndReached={this.loadMoreDeezer}
          onEndReachedThreshold={0.1}
        />
      </View>
    );
  }
}

export default ListMusics;
