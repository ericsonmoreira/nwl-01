import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native'
import { Feather as Icon, FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../services/api';
import {
  Container,
  PointImage,
  PointName,
  PointItems,
  Address,
  AddressTitle,
  AddressContent,
  Footer,
  Button,
  ButtonText
} from './styles';

interface Params {
  point_id: number;
}

interface Data {
  point: {
    image: string;
    name: string;
    email: string;
    whatsapp: string;
    city: string;
    uf: string;
  };
  items: {
    title: string
  }
}

const Detail = () => {

  const navigation = useNavigation();
  const route = useRoute();

  const routeParams = route.params as Params;


  useEffect(() => {
    api.get(`points/${routeParams.point_id}`).then(response => {

    });
  }, [])

  /**
   * Trata o clique no botão de voltar.
   */
  function handleNavigateBack() {
    navigation.goBack();
  }

  return (
    <>
      <Container>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={20} color="#34cb79" />
        </TouchableOpacity>
        <PointImage source={{ uri: 'http://192.168.1.2:3333/uploads/5bc8320e4161-mercado.jpg' }} />
        <PointName>Mercadão do João.</PointName>
        <PointItems>Lâmpadas, Óleo de cozinha.</PointItems>
        <Address>
          <AddressTitle>Endereço</AddressTitle>
          <AddressContent>Tabuleirod o Norte - Ce</AddressContent>
        </Address>
      </Container>
      <Footer>
        <Button onPress={() => { }} >
          <FontAwesome name="whatsapp" size={20} color="#FFF" />
          <ButtonText>Whatsapp</ButtonText>
        </Button>
        <Button onPress={() => { }} >
          <Icon name="mail" size={20} color="#FFF" />
          <ButtonText>E-mail</ButtonText>
        </Button>
      </Footer>
    </>
  );
}

export default Detail;