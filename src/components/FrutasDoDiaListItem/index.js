import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  LayoutAnimation
} from 'react-native';

import { AntDesign } from '@expo/vector-icons';

import FrutasImages from '../../utils/FrutasImages';

import { handleFrutaNome } from '../../utils/functions';

import { useFrutas } from '../../hooks/frutas';

import styles from './styles';

const FrutasDoDiaListItem = ({ fruta }) => {
  const { deletarFrutaDoDia } = useFrutas();

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.checkButtonContainer}
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
          deletarFrutaDoDia(fruta.id);
        }}
      >
        <AntDesign name="checkcircleo" size={20} />
      </TouchableOpacity>
      <Image source={FrutasImages[handleFrutaNome(fruta.nome)]} style={styles.frutaImg}/>
      <Text style={styles.frutaNameText}>
        {fruta.nome}
      </Text>
    </View>
  );
}

export default FrutasDoDiaListItem;