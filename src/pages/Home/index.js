import React, { useState, useCallback } from 'react';

import { View, Text, Image, TouchableOpacity, FlatList, AsyncStorage } from 'react-native';

import { EvilIcons, AntDesign } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

import { useFrutas } from '../../hooks/frutas';

import AddFrutaDialog from '../../components/AddFrutaDialog';

import styles from './styles';

import FrutasListItem from '../../components/FrutasListItem';

const Home = () => {
  const [addFrutaDialogVisibility, setAddFrutaDialogVisibility] = useState(false);

  const { frutas } = useFrutas();

  const navigation = useNavigation();

  navigation.setOptions({
    headerTitle: () => (
      <Image 
        source={require('../../assets/icons/macaHeaderTitle.png')} 
        style={{width:30,height:30}} 
        resizeMode="contain"
      />
    ),
    headerRight: () => (
      <TouchableOpacity 
        style={{ marginRight: 15 }} 
        onPress={() => navigation.navigate('Configuracao')}
        // onPress={() => AsyncStorage.clear()}
        // onPress={() => console.log(frutas)}
      >
        <EvilIcons name="gear" size={30} />
      </TouchableOpacity>
    )
  })

  const handleOpenAddFrutaDialog = useCallback(() => {
    setAddFrutaDialogVisibility(true);
  }, []);

  return (
    <View style={styles.container}>

      <FlatList 
        data={frutas}
        style={styles.frutasList}
        showsVerticalScrollIndicator={false}
        keyExtractor={fruta => String(fruta.id)}
        renderItem={({ item: fruta }) => (
          <FrutasListItem fruta={fruta} key={fruta.id}/>
        )}
        ListEmptyComponent={() => (
          <View style={styles.semFrutasContainer}>
            <Text style={styles.grayText}>Você não tem nenhuma fruta</Text>
          </View>
        )}
        ListHeaderComponent={() => (
          <Text style={styles.boldText}>Minhas frutas</Text>
        )}
      />

      <AddFrutaDialog 
        addFrutaDialogVisibility={addFrutaDialogVisibility}
        setAddFrutaDialogVisibility={setAddFrutaDialogVisibility}
      />

      <View style={styles.addButton}>
        <TouchableOpacity onPress={handleOpenAddFrutaDialog}>
          <AntDesign name="plus" size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Home;