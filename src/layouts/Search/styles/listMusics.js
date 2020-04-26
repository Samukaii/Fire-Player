import Colors from '../../../config/styles';
import styled from 'styled-components/native';

export const st_search = {
  TextButton: styled.Text`
    color: ${Colors.textThemeLight};
  `,
  Button: styled.TouchableOpacity`
    background-color: ${Colors.themeLight};
    padding: 12px;
    color: ${Colors.textThemeLight};
    width: 27%;
    border-radius: 5px;
  `,
  Input: styled.TextInput`
    padding: 10px;
    width: 70%;
    color: ${Colors.textThemeDark};
    background-color: ${Colors.themeLight};
    margin-right: 3%;
    border-radius: 15px;
  `,
  Base: styled.View`
    display: 'flex';
    flex-direction: row;
    padding: 15px;
    margin-top: 6px;
  `,
  Root: styled.View`
    background-color: ${Colors.searchBackground};
  `,
};

export const st_results = {
  ImageCover: styled.Image`
    width: 100px;
    height: 100px;
  `,
  Info: styled.View`
    padding-left: 15px;
    padding-right: 15px;
  `,
  Base: styled.View`
    background-color: ${Colors.background};
    margin: 7px 0px 7px 0px;
    padding: 10px 30px 10px 10px;
    display: flex;
    flex-direction: row;
    border-color: ${Colors.borderTheme};
    border-bottom-width: 2px;
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
  TextButton: styled.Text`
    color: ${Colors.textThemeLight};
  `,
  Title: styled.Text`
    font-size: 18pt;
    font-weight: bold;
    color: ${Colors.textThemeLight};
  `,
  Artist: styled.Text`
    font-size: 15pt;
    color: ${Colors.textThemeLight};
  `,
};
