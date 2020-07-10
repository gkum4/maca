import React, { useCallback } from 'react';

import { View, Text, FlatList, TouchableOpacity, Alert, LayoutAnimation } from 'react-native';

import { AntDesign } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

import { useFrutas } from '../../hooks/frutas';

import { ordenaFrutas } from '../../utils/functions';

import FrutasDoDiaListItem from '../../components/FrutasDoDiaListItem';

import styles from './styles';

const Dieta = () => {
  const navigation = useNavigation();

  const { frutasDoDia, gerarFrutasDoDia, frutas, deletarFruta } = useFrutas();

  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity style={{ marginRight: 15 }} onPress={gerarFrutasDoDia}>
        <AntDesign name="reload1" size={25} />
      </TouchableOpacity>
    )
  });

  const handleProximaDietaPress = useCallback(() => {
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
          onPress: () => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            frutasDoDia.forEach((item) => {
              deletarFruta(item.id);
            });
            gerarFrutasDoDia();
            gerarFrutasDoDia();
          },
        },
      ],
      { cancelable: true },
    );
  }, [frutasDoDia, gerarFrutasDoDia, deletarFruta]);

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
            onPress={gerarFrutasDoDia}
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
              onPress={handleProximaDietaPress}
            >
              <Text style={styles.gerarFrutasDoDiaButtonText}>Próxima dieta</Text>
            </TouchableOpacity>
          )}
        />
      )}

    </View>
  );
}

export default Dieta;