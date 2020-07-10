import FrutasDados from './FrutasDados';

export function handleFrutaNome(frutaNome) {
  frutaNome = frutaNome.toLowerCase();
  var arr = frutaNome.split('');
  var i;
  for(i = 0; i < arr.length; i++) {
    if(arr[i] === 'ç') {
      arr[i] = 'c';
    }
    if(arr[i] === 'ã') {
      arr[i] = 'a';
    }
    if(arr[i] === 'õ') {
      arr[i] = 'o';
    }
    if(arr[i] === 'á') {
      arr[i] = 'a';
    }
    if(arr[i] === 'é') {
      arr[i] = 'e';
    }
    if(arr[i] === 'í') {
      arr[i] = 'i';
    }
    if(arr[i] === 'ó') {
      arr[i] = 'o';
    }
    if(arr[i] === 'ú') {
      arr[i] = 'u';
    }
    if(arr[i] === 'ê') {
      arr[i] = 'e';
    }
    if(arr[i] === 'ô') {
      arr[i] = 'o';
    }
    if(arr[i] === 'â') {
      arr[i] = 'a';
    }
    if(arr[i] === ' ' && i === arr.length-1) {
      arr[i] = '';
    }
  }
  for(i = 0; i < arr.length; i++) {
    if(arr[i] === ' ') {
      arr.splice(i, 1);
    }
  }
  return arr.join('');
}

export function diasParaEstragar(frutaObj) {
  const frutaObjNome = handleFrutaNome(frutaObj.nome);

  if(FrutasDados[frutaObjNome] == null) {
    return;
  }

  var frutaObjDataComprouArr = frutaObj.comprou.split("/");
  const hoje = new Date();
  const dataQueComprou = new Date(frutaObjDataComprouArr[1] + '/' + frutaObjDataComprouArr[0] + '/' + hoje.getFullYear()); 
  const diff = Math.abs(hoje.getTime() - dataQueComprou.getTime()); 
  const dias = Math.ceil(diff / (1000 * 60 * 60 * 24)); 
  
  const tempoVencimento = FrutasDados[frutaObjNome].tempo;
  const faltaDiasEstragar = tempoVencimento - dias;
  
  return faltaDiasEstragar;
}


export function ordenaFrutas(frutasPorDia, listaFrutas) {

  if(listaFrutas.length === 0) {
    return [];
  }

  var i;
  var j;
  var listaFrutasAux = [];
  var listaFrutasCompleta = [];
  var novoArr = [];
  var menorValor;
  var menorValorEnd;

  for(i = 0; i < listaFrutas.length; i++) {
    if(parseInt(listaFrutas[i].quantidade) > 1) {
      for(j = 0; j < parseInt(listaFrutas[i].quantidade)-1; j++) {
        listaFrutasAux.push(listaFrutas[i]);
      }
    }
  }

  listaFrutasCompleta = listaFrutasAux.concat(listaFrutas);

  while(listaFrutasCompleta.length !== 0) {
    menorValor = listaFrutasCompleta[0];
    menorValorEnd = 0;
    for(i = 0; i < listaFrutasCompleta.length; i++) {
      if(diasParaEstragar(menorValor) > diasParaEstragar(listaFrutasCompleta[i])) {
        menorValor = listaFrutasCompleta[i];
        menorValorEnd = i;
      }
    }
    novoArr.push(menorValor);
    listaFrutasCompleta.splice(menorValorEnd, 1);
  }
  return ordenaFrutasAleatorio(frutasPorDia, novoArr);
}


function ordenaFrutasAleatorio(frutasPorDia, listaFrutas) {
  var frutasPodemEstragar = 0;

  for(var fruta of listaFrutas) {
    // A fruta mais próxima de estragar não estraga se colocada na última posição da dieta
    if((diasParaEstragar(fruta) - (listaFrutas.length) / frutasPorDia) < 0) {
      frutasPodemEstragar++;
    }
  }

  const listaFrutasImutavel = [...listaFrutas.splice(0,frutasPodemEstragar)];

  listaFrutas = shuffle(listaFrutas);
  
  return listaFrutasImutavel.concat(listaFrutas);
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}