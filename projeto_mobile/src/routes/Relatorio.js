//Tela de relatório de pesquisa
//Imports
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import {
  prepararDadosGrafico,
  buscarDadosPesquisa,
} from '../utils/dadosRelatorio';
import { useSelector } from 'react-redux'

const Relatorio = ({route}) => {
  const [dadosPesquisa, setDadosPesquisa] = useState({
    excelente: 0,
    bom: 0,
    neutro: 0,
    ruim: 0,
    pessimo: 0,
  });
  const [nome, setNome] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const id = useSelector((state) => state.pesquisa.id)

  useEffect(() => {
    const carregarDados = async () => {
      try {
        setLoading(true);
        setError(null);

        const dados = await buscarDadosPesquisa(id);
        setDadosPesquisa(dados.respostas);
        setNome(dados.nome);
      } catch (err) {
        console.error('Erro ao carregar dados:', err);
        setError('Erro ao carregar dados da pesquisa');
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, []);

  const totalRespostas = Object.values(dadosPesquisa).reduce(
    (acc, val) => acc + val,
    0,
  );
  const dadosGrafico = prepararDadosGrafico(dadosPesquisa, totalRespostas);
  const screenWidth = Dimensions.get('window').width;

  if (loading) {
    return (
      <View style={estilos.loadingContainer}>
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text style={estilos.loadingText}>Carregando dados da pesquisa...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={estilos.errorContainer}>
        <Text style={estilos.errorIcon}>⚠️</Text>
        <Text style={estilos.errorTitle}>Erro ao carregar dados</Text>
        <Text style={estilos.errorMessage}>
          Não foi possível carregar os dados da pesquisa. Verifique sua conexão
          com a internet e tente novamente.
        </Text>
      </View>
    );
  }

  if (totalRespostas === 0) {
    return (
      <View style={estilos.emptyContainer}>
        <Text style={estilos.emptyIcon}>📊</Text>
        <Text style={estilos.emptyTitle}>Nada por aqui</Text>
        <Text style={estilos.emptyMessage}>
          Esta pesquisa ainda não recebeu nenhuma resposta. Utilize o botão de coleta para começar a coletar dados!
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={estilos.container}>
      <View style={estilos.viewMae}>
        <Text style={estilos.titulo}>Relatório - {nome}</Text>

        <View style={estilos.containerGrafico}>
          <PieChart
            data={dadosGrafico}
            width={screenWidth - 40}
            height={300}
            chartConfig={{
              backgroundColor: '#372775',
              backgroundGradientFrom: '#372775',
              backgroundGradientTo: '#372775',
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
            hasLegend={true}
            center={[50, 0]}
          />
        </View>

        <View style={estilos.resumo}>
          <Text style={estilos.resumoTitulo}>Resumo</Text>
          <Text style={estilos.resumoTexto}>
            Total de respostas: {totalRespostas}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#372775',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#372775',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 16,
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#372775',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  errorIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  errorTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  errorMessage: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 8,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: '#372775',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  emptyTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  emptyMessage: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  viewMae: {
    backgroundColor: '#372775',
    width: '100%',
    minHeight: '100%',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  containerGrafico: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  resumo: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
  },
  resumoTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#372775',
    marginBottom: 10,
    textAlign: 'center',
  },
  resumoTexto: {
    fontSize: 16,
    color: '#372775',
    textAlign: 'center',
  },
});

//Export
export default Relatorio;
