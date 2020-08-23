import React, { useCallback } from 'react';

import { View, Text, FlatList, TouchableOpacity, Alert, LayoutAnimation, AsyncStorage } from 'react-native';

import { AntDesign } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

import { useFrutas } from '../../hooks/frutas';

import FrutasDoDiaListItem from '../../components/FrutasDoDiaListItem';

import styles from './styles';

const Dieta = () => {
  const navigation = useNavigation();

  const { 
    frutasDoDia, 
    gerarFrutasDoDia, 
    frutas, 
    deletarFruta,
    setFrutasDoDia,
  } = useFrutas();

  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity style={{ marginRight: 15 }} onPress={async () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
        gerarFrutasDoDia();
      }}>
        <AntDesign name="reload1" size={25} />
      </TouchableOpacity>
    )
  });

  const handleProximaDietaPress = () => {
    Alert.alert(
      'Consumiu todas as frutas?',
      undefined,
      [
        {
          text: 'Nope',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: async () => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
            frutasDoDia.map((item) => {
              deletarFruta(item.id);
            });
            setFrutasDoDia([]);
          },
        },
      ],
      { cancelable: true },
    );
  }

  return (
    <View style={styles.container}>
      {frutasDoDia.length === 0 ? 
      (
        <View style={styles.gerarButtonContainer}>
          {frutas.length === 0 && <Text style={styles.grayText}>Suas frutas acabaram</Text>}
          <TouchableOpacity 
            style={[styles.gerarFrutasDoDiaButton, frutas.length === 0 && {
              backgroundColor: '#A9CDE3',
            }]}
            disabled={frutas.length === 0}
            onPress={async () => {
              gerarFrutasDoDia();
            }}
          >
            <Text style={styles.gerarFrutasDoDiaButtonText}>Gerar dieta</Text>
          </TouchableOpacity>
        </View>
      ) :
      (
        <FlatList 
          data={frutasDoDia}
          style={styles.frutasList}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: fruta }) => (
            <FrutasDoDiaListItem fruta={fruta} key={fruta.id}/>
          )}
          ListEmptyComponent={() => (
            <View style={styles.semFrutasContainer}>
              <Text style={styles.grayText}>Você não tem nenhuma fruta</Text>
            </View>
          )}
          ListHeaderComponent={() => (
            <Text style={styles.boldText}>Frutas do dia</Text>
          )}
          ListFooterComponent={() => (
            <TouchableOpacity 
              style={[styles.gerarFrutasDoDiaButton, { marginTop: 15 }]}
              onPress={() => {
                handleProximaDietaPress();
              }}
            >
              <Text style={styles.gerarFrutasDoDiaButtonText}>Pronto!</Text>
            </TouchableOpacity>
          )}
        />
      )}

    </View>
  );
}

export default Dieta;