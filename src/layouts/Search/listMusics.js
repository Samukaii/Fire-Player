import React, {useState, useEffect} from 'react';
import DZapi from '../../services/Deezer.Api';
import {st_listMusics, st_generic} from './styles';
import {FlatList, ToastAndroid} from 'react-native';

//
//        LIST MUSICS
//

export default function ListMusics({navigation}) {
  const {navigate} = navigation;
  const {st_results, st_search} = st_listMusics;
  const {CENTER, SHORT, showWithGravity} = ToastAndroid;
  const [searchState, setSearchState] = useState({
    fimPesquisa: false,
    term: 'projota',
    results: [],
    page: 1,
    limit: 10,
    limitMax: 50,
    resultCount: 0,
  });

  useEffect(() => {
    loadTracksDeezer();
  }, []);

  async function loadTracksDeezer(
    offsetLimit = 0,
    term = 'projota',
    limit = 10,
    more = false,
  ) {
    const responseDZ = await DZapi.get(
      `/search/track?q=${encodeURI(term)}&limit=${limit}&index=${offsetLimit}`,
    );
    const {data, resultCount} = responseDZ.data;
    const {page} = searchState;

    changePage(resultCount, page);
    visualCallback(more, data, term);

    const changePage =
      resultCount !== 0
        ? () => {
            setSearchState({page: page + 1});
          }
        : () => {
            setSearchState({fimPesquisa: true});
          };

    const visualCallback = isRecharging
      ? () => {
          setSearchState({results: [...searchState.results, ...data]});
        }
      : () => {
          setSearchState({fimPesquisa: false, page: 1, results: data});
          showWithGravity('pesquisando por ' + term, SHORT, CENTER);
        };
  }

  function loadMoreDeezer() {
    const {page, term, limit, limitMax, fimPesquisa, results} = searchState;
    const resultCount = results.length;

    const canRecharge = !fimPesquisa && resultCount < limitMax ? true : false;

    tryRecharge();
    visualCallback();

    const tryRecharge = canRecharge
      ? () => {
          const offset = page * limit;
          const rest =
            limitMax - resultCount >= 10 ? 10 : limitMax - resultCount;

          loadTracksDeezer(offset, term, rest, true);
        }
      : () => {};

    const visualCallback = canRecharge
      ? () => {
          showWithGravity('Carregandro mais músicas...', SHORT, CENTER);
        }
      : () => {
          showWithGravity('Fim da Lista', SHORT, CENTER);
        };
  }

  function renderItemDeezer({item}) {
    const {Info, Title, Artist, TextButton} = st_results;
    const {Base, ImageCover, Button} = st_results;
    return (
      <Base>
        <ImageCover source={{uri: item.album.cover_medium}} />
        <Info>
          <Title>{item.title}</Title>
          <Artist>{item.artist.name}</Artist>

          <Button>
            <TextButton
              onPress={() => {
                navigate('details', {product: item});
              }}>
              Ouvir
            </TextButton>
          </Button>
        </Info>
      </Base>
    );
  }
  const {Base, Input, Button, TextButton, Root} = st_search;
  const {lista} = st_generic;
  return (
    <Root>
      <Base>
        <Input />
        <Button>
          <TextButton>Pesquisar</TextButton>
        </Button>
      </Base>
      <FlatList
        style={lista}
        data={searchState.results}
        keyExtractor={item => item.id}
        renderItem={renderItemDeezer}
        onEndReached={loadMoreDeezer}
        onEndReachedThreshold={0.1}
      />
    </Root>
  );
}
/*class ListMusics extends Component {
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

export default ListMusics;*/
