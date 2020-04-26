import {StyleSheet} from 'react-native';
import Colors from '../../../config/styles';
import styled from 'styled-components/native';

export const st_generic = {
  Root: styled.View`
    align-items: center;
    background-color: ${Colors.themeDark};
    padding: 15% 0% 20% 0%;
    width: 100%;
    height: 100%;
    margin: 0px;
  `,
};

export const st_infoMusic = {
  Root: styled.ImageBackground`
    align-items: center;
    background-color: ${Colors.themeDark};
    padding: 15% 0% 20% 0%;
    width: 100%;
    height: 100%;
    margin: 0px;
  `,
  ImageCover: styled.Image`
    width: 250px;
    height: 250px;
    border: 2px solid ${Colors.textThemeLight};
    border-radius: 10px;
  `,
  Title: styled.Text`
    color: ${Colors.textThemeLight};
    font-weight: bold;
    margin: 10px;
    font-size: 18px;
  `,
  Artist: styled.Text`
    color: ${Colors.textThemeLight};
    font-size: 16px;
    margin-bottom: 10px;
  `,
  Album: styled.Text`
    color: ${Colors.textThemeLight};
    font-size: 16px;
    margin-bottom: 10px;
  `,
};

export const st_tracklist = {
  List: StyleSheet.create({Root: {marginTop: 20, flex: 1}}),
  Base: styled.TouchableOpacity`
    flex-direction: row;
    margin-bottom: 20px;
    justify-content: flex-start;
  `,
  Info: styled.View`
    padding-left: 10px;
    padding-right: 20px;
    width: 250px;
  `,
  ImageCover: styled.Image`
    width: 75px;
    height: 75px;
  `,
  Button: styled.TouchableOpacity`
    padding: 12px;
    background-color: ${Colors.button};
    color: ${Colors.textThemeLight};
    width: 85px;
    margin-top: 15px;
    border-radius: 7px;
    align-items: center;
  `,
  Artist: styled.Text`
    color: ${Colors.textThemeLight};
  `,
  Title: styled.Text`
    color: ${Colors.textThemeLight};
    font-weight: bold;
  `,
  NumberTrackContainer: styled.View`
    justify-content: center;
    align-content: center;
    width: 18;
  `,
  NumberTrack: styled.Text`
    color: ${Colors.textThemeLight};
    font-weight: bold;
  `,
};

export const st_audioPlayer = {
  Slider: styled.Slider`
    height: 50px;
    width: 200px;
    color: ${Colors.themeLight};
    margin-right: 10;
  `,
  Base: styled.View`
    flex-direction: row;
    background-color: ${Colors.button};
    border-radius: 30px;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px 0px 30px;
    border-width: 2px;
    border-color: ${Colors.borderTheme};
  `,
  Button: styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    padding: 30;
  `,
};
