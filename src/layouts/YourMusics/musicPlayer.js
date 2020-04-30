import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import Colors from '../../config/styles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';
import {CoverImage} from 'react-native-get-music-files-v3dev-test';
import {
  faCaretSquareLeft,
  faCaretSquareRight,
} from '@fortawesome/free-regular-svg-icons';

export default function MusicPlayer(props) {
  return (
    <Player>
      <AlbumCover>
        <CoverImage source={props.item.path} width={250} height={250} />
      </AlbumCover>
      <Artist>{props.item.artist}</Artist>
      <Title>{props.item.title}</Title>
      <Duration maximumValue={100} minimumValue={0} />
      <Controller>
        <Prev>
          <FontAwesomeIcon icon={faAngleLeft} color="#eee" size={35} />
        </Prev>
        <Play onPress={() => props.switchPlay()}>
          <FontAwesomeIcon icon={props.iconPlay} color="#eee" size={25} />
        </Play>
        <Next>
          <FontAwesomeIcon icon={faAngleRight} color="#eee" size={35} />
        </Next>
      </Controller>
    </Player>
  );
}

const Artist = styled.Text`
  color: #ff0;
`;
const Duration = styled.Slider`
  padding: 0px;
  width: 102%;
`;
const Player = styled.View`
  width: 100%;
  align-items: center;
  padding-top: 60px;
`;
const Title = styled.Text`
  color: #ff0;
`;
const Controller = styled.View`
  width: 100%;
  background-color: #334;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 60px;
  border: solid ${Colors.borderTheme};
  border-width: 0px;
  border-top-width: 2px;
`;

const Play = styled.TouchableOpacity`
  margin: 10px;
`;
const Prev = styled.TouchableOpacity`
  margin: 10px;
`;
const Next = styled.TouchableOpacity`
  margin: 10px;
`;

const AlbumCover = styled.View`
  background-color: #fff;
  height: 250px;
  width: 250px;
`;
