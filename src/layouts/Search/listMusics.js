import React, {useState, useEffect} from 'react';
import Api from '../../services/Deezer.Api';
import {st_listMusics, st_generic} from './styles';
import {FlatList, ToastAndroid} from 'react-native';
import Tron from 'reactotron-react-native';

//
//        LIST MUSICS
//

export default function ListMusics({navigation}) {
  const {navigate} = navigation;
  const {st_results, st_search} = st_listMusics;
  const {CENTER, SHORT, showWithGravity} = ToastAndroid;
  const [searchState, setSearchState] = useState({
    term: 'projota',
    results: [],
    next: undefined,
    maxTotal: 30,
    total: 0,
  });

  useEffect(() => {
    preLoadTracks();
  }, []);

  async function preLoadTracks() {
    const response = await Api.get('search/track?q=projota&limit=10&index=0');
    const {data, next, total} = response.data;

    const changes = Object.assign((q = {...searchState}), {
      results: [...data],
      next: next,
      total: total,
    });
    setSearchState(changes);
  }

  async function reLoadTracks() {
    const response = await Api.get(searchState.next);
    const {data, next} = response.data;

    const changes = Object.assign((q = {...searchState}), {
      results: [...searchState.results, ...data],
      next: next,
    });

    setSearchState(changes);
    showWithGravity('Carregando Mais Músicas...', SHORT, CENTER);
  }

  async function searchNewTracks(query = 'projota') {
    const response = await Api.get(`search/track?q=${query}&limit=10`);
    const {data, next} = response.data;

    const changes = Object.assign((q = {...searchState}), {
      results: [...data],
      next: next,
    });
    setSearchState(changes);
  }

  function loadMoreDeezer() {
    const {next, maxTotal, results} = searchState;
    const isNext = typeof next !== undefined;
    const isFullList = results.length >= maxTotal;
    const canRecharge = isNext && !isFullList;

    if (canRecharge) reLoadTracks();
    else showWithGravity('Fim da lista', SHORT, CENTER);
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
        <Input
          onSubmitEditing={() => searchNewTracks(searchState.term)}
          placeholder="Digite aqui uma música"
          placeholderTextColor="#222"
          onChangeText={text => (searchState.term = text)}
        />
        <Button onPress={() => searchNewTracks(searchState.term)}>
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
