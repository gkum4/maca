import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';

import { useFrutas } from '../../hooks/frutas';

import { handleFrutaNome } from '../../utils/functions';

import FrutasImages from '../../utils/FrutasImages';

import FrutasDados from '../../utils/FrutasDados';

import DatePicker from 'react-native-datepicker';
import { Dialog } from 'react-native-simple-dialogs';

import styles from './styles';

const AddFrutaDialog = ({ 
  addFrutaDialogVisibility, 
  setAddFrutaDialogVisibility 
}) => {
  const [addFrutaNome, setAddFrutaNome] = useState('');
  const [addFrutaData, setAddFrutaData] = useState('');
  const [addFrutaQuantidade, setAddFrutaQuantidade] = useState('');
  const data = new Date();

  const { adicionarFruta, frutas } = useFrutas();

  const handleOkPress = () => {
    if(addFrutaNome === '' || addFrutaData === '' || addFrutaQuantidade === '') {
      alert('Preencha todos os campos');
      return;
    }

    if (FrutasDados[handleFrutaNome(addFrutaNome)] == null) {
      alert('Fruta inválida');
      return;
    }

    adicionarFruta(addFrutaNome, addFrutaData, addFrutaQuantidade);
    setAddFrutaNome('');
    setAddFrutaData('');
    setAddFrutaQuantidade('');
    setAddFrutaDialogVisibility(false);
  }

  return (
    <Dialog
      visible={addFrutaDialogVisibility}
      onTouchOutside={() => {
        setAddFrutaDialogVisibility(false);
        setAddFrutaNome('');
        setAddFrutaData('');
        setAddFrutaQuantidade('');
      }}
      dialogStyle={{borderRadius: 15, overflow: 'hidden'}}
    >
      <View style={styles.dialogInputContainer}>
        <Text style={styles.dialogInputTitle}>Adicionar Fruta</Text>
        <View style={styles.dialogMiddleContainer}>
          <View style={styles.dialogFrutaImgContainer}>
            <Image source={FrutasImages[handleFrutaNome(addFrutaNome)]} style={styles.dialogFrutaImg} />
          </View>
          <View style={styles.dialogInputsContainer}>
            <TextInput
              style={styles.dialogFrutaNomeInput}
              onChangeText={(text) => setAddFrutaNome(text)}
              value={addFrutaNome}
              placeholder={'Nome da fruta'}
              textAlign={'center'}
            />
            <DatePicker
              date={addFrutaData}
              style={{width: 200}}
              mode="date" //The enum of date, datetime and time
              placeholder="Data que comprou"
              format="DD/MM"
              maxDate={`${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`}
              confirmBtnText="Confirmar"
              cancelBtnText="Cancelar"
              showIcon={false}
              onDateChange={(date) => setAddFrutaData(date)}
              customStyles={{
                dateInput: {
                  borderWidth: 0,
                  backgroundColor: '#E0E0E0',
                  width: 200,
                  borderRadius: 15,
                  height: 35,
                  marginBottom: 10,
                },
                placeholderText: {
                  color: '#AFAFAF',
                },
                btnTextConfirm: {
                  color: '#F30158',
                }
                
              }}
              onDateChange={(date) => setAddFrutaData(date)}
            />
            <TextInput
              style={styles.dialogFrutaQuantidadeInput}
              onChangeText={(text) => {
                if (isNaN(text) || Number(text) < 0 || text.includes(',') || text.includes('.')) {
                  return;
                }
                setAddFrutaQuantidade(text)
              }}
              value={addFrutaQuantidade}
              placeholder={'Quantidade'}
              textAlign={'center'}
              autoCapitalize={'none'}
              keyboardType={'number-pad'}
            />
          </View>
        </View>
        <View style={styles.dialogBottomContainer}>
          <TouchableOpacity style={styles.dialogButtonVoltar} onPress={() => {
            setAddFrutaDialogVisibility(false);
            setAddFrutaNome('');
            setAddFrutaData('');
            setAddFrutaQuantidade('');
          }}>
            <Text>Voltar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dialogButtonOk} onPress={handleOkPress}>
            <Text>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Dialog>
  );
}

export default AddFrutaDialog;