import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather as Icon } from '@expo/vector-icons';
import { SvgUri } from 'react-native-svg';
import api from '../../services/api';
import * as Location from 'expo-location';

import {
  Container,
  Title,
  Description,
  MapContainer,
  Map,
  ItemsContainer,
  Item,
  ItemTitle,
  MapMarker,
  MapMarkerImage,
  MapMarkerContainer,
  MapMarkerTitle,
} from './styles';


interface PColeta {
  id: number;
  image_url: string;
  name: string;
  latitude: number;
  longitude: number;
}

interface Item {
  id: number;
  title: string;
  image_url: string;
}

const Points = () => {

  const [items, setItems] = useState<Item[]>([] as Item[]);
  const [points, setPoints] = useState<PColeta[]>([] as PColeta[]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);

  // para carregar os pontos.
  useEffect(() => {
    api.get('points', {
      params: {
        uf: 'CE',
        city: 'Tabuleiro do Norte',
        items: [1, 2]
      }
    }).then(response => {
      setPoints(response.data);
      // console.log(points);
    });
  }, [])

  // para carreggar a localização inicial.
  useEffect(() => {
    async function loadPosition() {
      const { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Opppsss...', 'Precisamos de sua permissão para obter a localização.');
      }
      const location = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = location.coords;
      setInitialPosition([latitude, longitude]);
    };
    loadPosition();
  }, []);

  // Para buscar os items da api.
  useEffect(() => {
    api.get('items').then(response => {
      setItems(response.data);
    });
  }, []);

  const navigation = useNavigation();

  /**
   * Trata o clique no botão de voltar.
   */
  function handleNavigateBack() {
    navigation.goBack();
  }

  /**
   * Trata o clique de um Marker para mostrar os detalher de um Ponto de Coleta.
   */
  function handleNavigateToDetail(id: number) {
    navigation.navigate('Detail', { point_id: id });
  }

  return (
    <>
      <Container>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={20} color="#34cb79" />
        </TouchableOpacity>

        <Title>Bem vindo.</Title>
        <Description>Encontre no mapa um Ponto de Coleta.</Description>

        <MapContainer>
          {initialPosition[0] !== 0 && (
            <Map
              loadingEnabled={initialPosition[0] === 0}
              initialRegion={{
                latitude: initialPosition[0],
                longitude: initialPosition[1],
                latitudeDelta: 0.014,
                longitudeDelta: 0.014
              }}>
              {points.map(point => (
                <MapMarker
                  key={String(point.id)}
                  onPress={() => handleNavigateToDetail(point.id)}
                  coordinate={{
                    latitude: point.latitude,
                    longitude: point.longitude,
                  }}>
                  <MapMarkerContainer>
                    <MapMarkerImage source={{ uri: point.image_url }} />
                    <MapMarkerTitle>
                      {point.name}
                    </MapMarkerTitle>
                  </MapMarkerContainer>
                </MapMarker>
              ))}
            </Map>
          )}
        </MapContainer>
      </Container>
      <ItemsContainer>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20
          }} >

          {items.map(item => (
            <Item key={String(item.id)} onPress={() => { }} >
              <SvgUri width={42} height={42} uri={item.image_url} />
              <ItemTitle>{item.title}</ItemTitle>
            </Item>
          ))}

        </ScrollView>
      </ItemsContainer>
    </>
  );
}

const styles = StyleSheet.create({

  itemsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 32,
  },

  selectedItem: {
    borderColor: '#34CB79',
    borderWidth: 2,
  },

  itemTitle: {
    fontFamily: 'Roboto_400Regular',
    textAlign: 'center',
    fontSize: 13,
  },
});

export default Points;