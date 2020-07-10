import React from 'react';
import { 
  View, 
  Image, 
  Text, 
  TouchableOpacity, 
  LayoutAnimation,
  UIManager,
  Platform
} from 'react-native';

import { useFrutas } from '../../hooks/frutas';

import FrutasImages from '../../utils/FrutasImages';

import FrutasDados from '../../utils/FrutasDados';

import { handleFrutaNome } from '../../utils/functions';

import { EvilIcons } from '@expo/vector-icons';

import styles from './styles';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const FrutasListItem = ({ fruta }) => {
  const { deletarFruta, forceDeletarFruta, deletarAmbos } = useFrutas();

  function diasParaEstragarCustom(frutaObj) {
    const frutaObjNome = handleFrutaNome(frutaObj.nome);

    if(FrutasDados[frutaObjNome] == null) {
      return '';
    }

    var frutaObjDataComprouArr = frutaObj.comprou.split("/");
    const hoje = new Date();
    const dataQueComprou = new Date(frutaObjDataComprouArr[1] + '/' + frutaObjDataComprouArr[0] + '/' + hoje.getFullYear()); 
    const diff = Math.abs(hoje.getTime() - dataQueComprou.getTime()); 
    const dias = Math.ceil(diff / (1000 * 60 * 60 * 24)); 
    
    const tempoVencimento = FrutasDados[frutaObjNome].tempo;
    const faltaDiasEstragar = tempoVencimento - dias;
    
    if (faltaDiasEstragar > 1 || faltaDiasEstragar < 1) {
      return `Estraga em: ${faltaDiasEstragar} dias`;
    }
    if (faltaDiasEstragar === 1) {
      return `Estraga em: ${faltaDiasEstragar} dia`;
    }
  }

  return (
    <View style={styles.frutaItem}>
      <Image 
        source={FrutasImages[handleFrutaNome(fruta.nome)]} 
        style={styles.frutaImg}
        resizeMode="contain"
      />
      
      <View style={styles.frutaItemTextContainer}>
        <View style={{flexDirection:'column', flex:1}}>
          <Text style={styles.frutaItemTextBold}>{fruta.nome}</Text>
        </View>
        <View style={{flexDirection:'column-reverse', flex:1}}>
          <Text style={{fontSize:12}}>
            Comprou: {fruta.comprou + '   ' + diasParaEstragarCustom(fruta)} 
          </Text>
        </View>
      </View>

      <View style={{ justifyContent:'center', alignItems:'flex-end', flex:1, flexDirection:'column', marginLeft:5}}>
        <TouchableOpacity 
          onPress={() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            const condition = deletarAmbos(fruta.id);
            if (condition === false) {
              deletarFruta(fruta.id);
            }
          }}
          onLongPress={() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            forceDeletarFruta(fruta.id);
          }}
        >
          <EvilIcons name='trash' size={25} color='black' style={{marginBottom:10}}/>
        </TouchableOpacity>
        <Text style={{fontWeight: 'bold', fontSize: 18}}>{fruta.quantidade}x</Text>
      </View>
    </View>
  );
}

export default FrutasListItem;