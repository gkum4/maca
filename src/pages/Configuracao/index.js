import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Linking, ScrollView } from 'react-native';

import { EvilIcons } from '@expo/vector-icons';

import { useFrutas } from '../../hooks/frutas';

import styles from './styles';

const Configuracao = () => {
  const { 
    frutasPorDia, 
    setFrutasPorDia,
    nome,
    setNome,
  } = useFrutas();

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
      <View style={styles.container}>
        <Text style={styles.inputTitleText}>Nome:</Text>
        <TextInput 
          style={[styles.textInput,{width: '70%'}]}
          value={nome}
          onChangeText={(text) => setNome(text)}
        />
        <Text style={styles.inputTitleText}>Frutas por dia:</Text>
        <TextInput 
          style={styles.textInput}
          value={frutasPorDia}
          keyboardType="number-pad"
          onChangeText={(text) => {
            if (isNaN(text) || Number(text) < 0 || text.includes(' ') || text.includes(',') || text.includes('.')) {
              return;
            }
            setFrutasPorDia(text);
          }}
        />
      </View>

      <View style={styles.containerGit}>
        <TouchableOpacity onPress={() => Linking.openURL('https://github.com/alissongps')} style={styles.gitButton}>
          <EvilIcons name='sc-github' size={120} color='#8901F3'/>
          <Text style={{color:'#8901f3'}}>alissongps</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Linking.openURL('https://github.com/gkum4')} style={styles.gitButton}>
          <EvilIcons name='sc-github' size={120} color='#F30158'/>
          <Text style={{color:'#f30158'}}>gkum4</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    
  );
}

export default Configuracao;