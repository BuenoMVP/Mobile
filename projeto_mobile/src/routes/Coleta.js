import {View, StyleSheet, Text} from 'react-native';
import BotaoColeta from '../components/BotaoColeta';
import {useEffect, useState} from 'react';
import {doc, getFirestore, increment, updateDoc} from 'firebase/firestore';
import {app} from '../firebase/config';
import {buscarDadosPesquisa} from '../utils/dadosRelatorio';
import { useSelector } from 'react-redux'

const Coleta = ({navigation}) => {
  const [nome, setNome] = useState('');
  const [error, setError] = useState(null);
  const id = useSelector((state) => state.pesquisa.id)
  const db = getFirestore(app);

  const coletarDados = resposta => {
    setError(null);
    const pesquisaRef = doc(db, 'pesquisa', id);
    updateDoc(pesquisaRef, {[`respostas.${resposta}`]: increment(1)})
      .then(() => {
        navigation.navigate('AgradecimentoParticipacao', {id});
      })
      .catch(err => {
        setError('Erro ao coletar dados');
        console.error(err);
      });
  };

  useEffect(() => {
    const buscarPesquisa = async () => {
      const dados = await buscarDadosPesquisa(id);
      setNome(dados.nome);
    };

    if (id) {
      buscarPesquisa();
    }
  }, [id]);

  return (
    <View style={estilos.viewMae}>
      <View>
        <Text style={estilos.texto}>O que você achou do {nome}?</Text>
      </View>
      <View style={estilos.view}>
        <BotaoColeta
          onPress={() => coletarDados('pessimo')}
          icone="emoticon-angry-outline"
          cor="#D71616"
          texto="Péssimo"
        />
        <BotaoColeta
          onPress={() => coletarDados('ruim')}
          icone="emoticon-sad-outline"
          cor="#FF360A"
          texto="Ruim"
        />
        <BotaoColeta
          onPress={() => coletarDados('neutro')}
          icone="emoticon-neutral-outline"
          cor="#FFC632"
          texto="Neutro"
        />
        <BotaoColeta
          onPress={() => coletarDados('bom')}
          icone="emoticon-happy-outline"
          cor="#37BD6D"
          texto="Bom"
        />
        <BotaoColeta
          onPress={() => coletarDados('excelente')}
          icone="emoticon-excited-outline"
          cor="#25BC22"
          texto="Excelente"
        />
      </View>
      {error && <Text style={estilos.error}>{error}</Text>}
    </View>
  );
};

const estilos = StyleSheet.create({
  viewMae: {
    backgroundColor: '#372775',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
  },
  texto: {
    fontFamily: 'AveriaLibre-Regular',
    color: 'white',
    fontSize: 40,
  },
  view: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
  },
  error: {
    fontFamily: 'AveriaLibre-Regular',
    color: 'red',
    fontSize: 20,
  },
});

export default Coleta;
