import {doc, getDoc, getFirestore} from 'firebase/firestore';
import {app} from '../firebase/config';

export const cores = {
  excelente: '#4CAF50',
  bom: '#8BC34A',
  neutro: '#FFC107',
  ruim: '#FF9800',
  pessimo: '#F44336',
};

const labels = {
  excelente: 'Excelente',
  bom: 'Bom',
  neutro: 'Neutro',
  ruim: 'Ruim',
  pessimo: 'Péssimo',
};

export const buscarDadosPesquisa = async id => {
  const db = getFirestore(app);
  const pesquisaRef = doc(db, 'pesquisa', id);
  const pesquisaDoc = await getDoc(pesquisaRef);
  if (pesquisaDoc.exists()) {
    return pesquisaDoc.data();
  }

  throw new Error('Pesquisa não encontrada');
};

export const prepararDadosGrafico = (dadosPesquisa, totalRespostas) => {
  const dadosGrafico = [];

  Object.keys(dadosPesquisa).forEach(key => {
    if (dadosPesquisa[key] > 0) {
      const porcentagem = ((dadosPesquisa[key] / totalRespostas) * 100).toFixed(
        1,
      );
      const labelFormatado = `- ${labels[key]} (${porcentagem}%)`;

      dadosGrafico.push({
        name: labelFormatado,
        population: dadosPesquisa[key],
        color: cores[key],
        legendFontColor: '#FFFFFF',
        legendFontSize: 14,
      });
    }
  });

  return dadosGrafico;
};
