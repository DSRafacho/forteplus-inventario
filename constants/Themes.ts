import { DefaultTheme } from '@react-navigation/native';
import Colors from './Colors';


export const DarkTheme = {
    ...DefaultTheme,
    colors: {
        primary: '#f72585',
        background: 'rgb(242, 242, 242)',
        card: '#012a4a', // Cor dos bgs da navigation
        text: '#f1f1f3', // Cor dos textos da navigation
        border: '#a9d6e5', // Cor da borda da bottom tab
        notification: '#ff0000', // Não sei ainda
      },
};

export const LightTheme = {
    ...DefaultTheme,
    colors: {
      primary: '#f72585',
      background: '#96c11f',
      card: '#f1f1f3', // Cor dos bgs da navigation
      text: '#0c609c', // Cor dos textos da navigation
      border: '#fff', // Cor da borda da bottom tab
      notification: '#ff0000', // Não sei ainda
    },
};