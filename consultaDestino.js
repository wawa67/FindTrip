import { fazerPergunta } from './pergunta.js';
import { inicializaModelo } from './modelo.js';
import dotenv from 'dotenv';

dotenv.config();
// Access your API key as an environment variable (see "Set up your API key" above)
const model = await inicializaModelo("gemini-1.0-pro")
export async function consulta() {
  const categorias = await fazerPergunta("Me fale sobre as categorias que quer saber realacionadas ao destino?\n")

  const prompt = await fazerPergunta("Me pergunte sobre viagens?\n")

  const parts = [
    {text: "Você é o chatbot de um site que vende pacotes de viagem. Ao ser perguntado sobre algum destino, como bairro, cidade, estado, país, continente e pontos turísticos diversos, você poderá fornecer informações. Caso seja perguntado sobre algo que não ter relação com viagem e turismo, informe que não poder responder a essa dúvida.\n\nPara formular a resposta, quero que os tópicos apareçam como lista com marcadores e sempre deve conter as categorias solicitadas no momento da pergunta."},
    {text: "input: me fale sobre o bairro flamengo do rio de janeiro"},
    {text: "output: **Flamengo, Rio de Janeiro**\n\nO Flamengo é um bairro nobre e icônico do Rio de Janeiro, conhecido por sua localização privilegiada à beira-mar e por seu estilo de vida sofisticado.\n\n**Destaques:**\n\n* **Praia do Flamengo:** Uma das praias mais famosas da cidade, oferecendo vistas deslumbrantes do Pão de Açúcar e da Baía de Guanabara.\n* **Parque do Flamengo:** Um enorme parque urbano com trilhas para caminhada, pistas de ciclismo, quadras de esportes e jardins exuberantes.\n* **Museu de Arte Moderna (MAM):** Um museu de arte contemporânea com uma coleção de obras de artistas brasileiros e internacionais.\n* **Marina da Glória:** Um porto bonito com iates e barcos luxuosos, oferecendo passeios de barco e restaurantes com vista para a água.\n\n**Gastronomia e vida noturna:**\n\nO Flamengo tem uma cena gastronômica vibrante, com restaurantes que oferecem uma variedade de opções culinárias, desde frutos do mar frescos até cozinha internacional. O bairro também é conhecido por sua vida noturna, com bares e clubes da moda.\n\n**Transporte:**\n\nO Flamengo é bem servido por transporte público, com várias estações de metrô e linhas de ônibus que conectam o bairro ao resto da cidade.\n\n**Acomodações:**\n\nHá uma variedade de opções de acomodação disponíveis no Flamengo, incluindo hotéis de luxo, apartamentos e pousadas.\n\n**Características:**\n\n* Bairro seguro e bem policiado\n* Ambientes arborizados e tranquilos\n* Excelentes opções de compras e entretenimento\n* Vista deslumbrante para a Baía de Guanabara"},
    {text: "input: me fale sobre o flamengo"},
    {text: "output: **Flamengo**\n\nNão possuo informações sobre o animal flamingo. Nossas especialidades são destinos de viagem e turismo."},
    {text: "input: me fale sobre o flamengo"},
    {text: "output: "},
    {text: `input: me fale sobre as categorias ${categorias}`},
    {text: "output: "},
    {text: `input: me fale sobre o destino ${prompt}`},
    {text: "output: "},
  ];


  const result = await model.generateContent({contents: [{ role: "user", parts }]});
  const response = await result.response;
  const text = response.text();
  console.log(text);
}