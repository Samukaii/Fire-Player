import {StyleSheet} from 'react-native';
import * as ltStyles from './listMusics';
import * as mdStyles from './musicDetails';
import styled from 'styled-components/native';

export const st_generic = StyleSheet.create({
  lista: {marginLeft: 10, marginRight: 10, height: '85%'},
});

export const {...st_listMusics} = ltStyles;
export const {...st_musicDetails} = mdStyles;
