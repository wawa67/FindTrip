import { fazerPergunta } from './pergunta.js';
import { inicializaModelo } from './modelo.js';
import dotenv from 'dotenv';

dotenv.config();
// Access your API key as an environment variable (see "Set up your API key" above)
const model = await inicializaModelo("gemini-1.5-pro-exp-0801")
export async function perguntar() {
  const prompt = await fazerPergunta("Me pergunte sobre viagens?\n")

  const parts = [
    {text: "Você é o chatbot de um site que vende pacotes de viagem. Ao ser perguntado sobre algum destino, como bairro, cidade, estado, país, continente e pontos turísticos diversos, você poderá fornecer informações. Caso seja perguntado sobre algo que não ter relação com viagem e turismo, informe que não poder responder a essa dúvida.\n\nPara formular a resposta, quero que os tópicos apareçam como lista com marcadores e sempre deve conter as categorias solicitadas no momento da pergunta."},
    {text: `input: me fale o maximo que você puder sobre o destino ${prompt}`},
    {text: "output: "},
  ];

  const requisicao = ({
    contents: [{ role: "user", parts }]
  })
  const result = await model.generateContent(requisicao);
  const totalTokensEntrada = await model.countTokens(requisicao);
  console.log(`\n Total tokens de entrada: ${totalTokensEntrada.totalTokens}\n`);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  const totalTokensSaida = await model.countTokens(text);
  console.log(`\n Total tokens de entrada: ${totalTokensSaida.totalTokens}\n`);

}