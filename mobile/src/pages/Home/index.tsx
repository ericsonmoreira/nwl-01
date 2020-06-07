import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// @ts-ignore
import logo from '../../assets/logo.png';
// @ts-ignore
import homeBackground from '../../assets/home-background.png';

import {
  Container,
  Main,
  Title,
  Description,
  Footer,
  Button,
  ButtonIcons,
  ButtonText
} from './styles';

const Home: React.FC = () => {

  const navigation = useNavigation();

  function handleNavigationToPoints() {
    navigation.navigate('Points');
  }

  return (
    <Container source={homeBackground} imageStyle={{ width: 274, height: 368 }}>
      <Main>
        <Image source={logo} />
        <Title>
          Seu marketplace de coleta de resíduos.
        </Title>
        <Description>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Description>
      </Main>

      <Footer>
        <Button onPress={handleNavigationToPoints}>
          <ButtonIcons>
            <Icon name="arrow-right" color="#FFF" size={24} />
          </ButtonIcons>
          <ButtonText>
            Entrar
          </ButtonText>
        </Button>
      </Footer>
    </Container>
  );
}

const styles = StyleSheet.create({

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

});

export default Home;
