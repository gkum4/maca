import React, { useContext, useState, createContext, useEffect, useCallback } from 'react';
import { AsyncStorage } from 'react-native';

import { ordenaFrutas } from '../utils/functions';

const FrutasContext = createContext({});

var done = false;

export const FrutasProvider = ({children}) => {
  const [frutas, setFrutas] = useState([]);
  const [frutasPorDia, setFrutasPorDia] = useState('2');
  const [nome, setNome] = useState('');
  const [frutasDoDia, setFrutasDoDia] = useState([]);

  useEffect(() => {
    async function loadDados() {
      const frutasFromAsyncStorage = await AsyncStorage.getItem('minhasFrutas');
      const frutasPorDiaFromAsyncStorage = await AsyncStorage.getItem('minhasFrutasPorDia');
      const nomeFromAsyncStorage = await AsyncStorage.getItem('meuNome');
      const frutasDoDiaFromAsyncStorage = await AsyncStorage.getItem('minhasFrutasDoDia');

      if (frutasFromAsyncStorage) {
        setFrutas(JSON.parse(frutasFromAsyncStorage));
      }

      if (frutasPorDiaFromAsyncStorage) {
        setFrutasPorDia(JSON.parse(frutasPorDiaFromAsyncStorage));
      }

      if (nomeFromAsyncStorage) {
        setNome(JSON.parse(nomeFromAsyncStorage));
      }

      if (frutasDoDiaFromAsyncStorage) {
        setFrutasDoDia(JSON.parse(frutasDoDiaFromAsyncStorage));
      }

      done = true;
    }

    loadDados();
  }, []);

  useEffect(() => {
    async function storeFrutas() {
      await AsyncStorage.setItem(
        'minhasFrutas', JSON.stringify(frutas)
      );
    }
    if (done === false) {
      return;
    }
    storeFrutas();
  }, [frutas]);

  useEffect(() => {
    async function storeFrutasPorDia() {
      await AsyncStorage.setItem(
        'minhasFrutasPorDia', JSON.stringify(frutasPorDia)
      );
    }
    if (done === false) {
      return;
    }
    storeFrutasPorDia();
  }, [frutasPorDia]);

  useEffect(() => {
    async function storeNome() {
      await AsyncStorage.setItem(
        'meuNome', JSON.stringify(nome)
      );
    }
    if (done === false) {
      return;
    }
    storeNome();
  }, [nome]);

  useEffect(() => {
    async function storeFrutasDoDia() {
      await AsyncStorage.setItem(
        'minhasFrutasDoDia', JSON.stringify(frutasDoDia)
      );
    }
    if (done === false) {
      return;
    }
    storeFrutasDoDia();
  }, [frutasDoDia]);

  const adicionarFruta = useCallback((nome, data, quantidade) => {
    let id = 0;
    if(frutas.length !== 0) {
      const lastId = parseInt(frutas[frutas.length - 1].id);
      id = lastId + 1;
    }
    const newFruta = {
      nome: nome,
      comprou: data, // formato ex.: "20/03"
      quantidade: String(Number(quantidade)),
      id: String(id),
    };

    setFrutas([...frutas, newFruta]);
  }, [frutas]);

  const deletarFruta = useCallback((frutaId) => {
    const newArr = [...frutas];
    const index = newArr.findIndex((item) => item.id === frutaId);

    if (newArr[index].quantidade > 1) {
      newArr[index].quantidade -= 1;
      setFrutas(newArr);
      return;
    }

    newArr.splice(index, 1);
    setFrutas(newArr);
  }, [frutas]);

  const forceDeletarFruta = useCallback((frutaId) => {
    const newArr = [...frutas];
    const index = newArr.findIndex((item) => item.id === frutaId);

    newArr.splice(index, 1);
    setFrutas(newArr);
  }, [frutas]);

  const gerarFrutasDoDia = useCallback(() => {
    if (frutas.length === 0) {
      setFrutasDoDia([]);
    }
    const frutasOrdenadas = ordenaFrutas(Number(frutasPorDia), frutas);
    const quantidadeTotal = frutas.reduce((total, item) => {
      return total + item.quantidade;
    }, 0);
    const newArr = [];
    if (quantidadeTotal >= Number(frutasPorDia)) {
      for(let i = 0; i < Number(frutasPorDia); i++) {
        newArr.push(frutasOrdenadas[i]);
      }
    } else {
      for(let i = 0; i < quantidadeTotal; i++) {
        newArr.push(frutasOrdenadas[i]);
      }
    }
    setFrutasDoDia(newArr);
  }, [frutas, frutasPorDia]);

  const deletarFrutaDoDia = useCallback((frutaId) => {
    deletarFruta(frutaId);
    const newArr = [...frutasDoDia];
    const index = newArr.findIndex((item) => item.id === frutaId);

    newArr.splice(index, 1);
    setFrutasDoDia(newArr);
  }, [frutasDoDia, deletarFruta]);

  const deletarAmbos = useCallback((frutaId) => {
    const somaFrutas = frutas.reduce((total, item) => {
      if (item.id === frutaId) {
        return total + item.quantidade;
      }
      return total;
    }, 0);

    const somaFrutasDoDia = frutasDoDia.reduce((total, item) => {
      if (item.id === frutaId) {
        return total + item.quantidade;
      }
      return total;
    }, 0);

    console.log(`somaFrutas: ${somaFrutas}, somaFrutasDoDia: ${somaFrutasDoDia}`);

    if (somaFrutas === somaFrutasDoDia) {
      deletarFrutaDoDia(frutaId);
      return true;
    }
    return false;
  }, [frutas, frutasDoDia, deletarFrutaDoDia]);

  return (
    <FrutasContext.Provider value={{ 
      frutas, 
      frutasPorDia, 
      setFrutasPorDia,
      nome,
      setNome,
      adicionarFruta, 
      deletarFruta, 
      forceDeletarFruta,
      frutasDoDia,
      gerarFrutasDoDia,
      deletarFrutaDoDia,
      deletarAmbos,
    }}>
      {children}
    </FrutasContext.Provider>
  );
}

export function useFrutas() {
  const context = useContext(FrutasContext);

  return context;
}