/**
 * @typedef {Object} TokenResponse Resposta para requisição de um token.
 * @property {number} response_code Código da resposta.
 * @property {string} response_message Mensagem da resposta.
 * @property {string} token Token do usuário.
 */

/**
 * @typedef {Object} QuestionReqOptions Opções para requisição de perguntas.
 * @property {string} token Token gerado da função `getToken`.
 * @property {string} category ID da categoria para filtro.
 * @property {'easy' | 'medium' | 'hard'} difficulty Filtro de dificuldade.
 * @property {number} amount Quantidade de perguntas a serem retornadas.
 * @property {'multiple' | 'boolean'} type Filtro de tipo de pergunta.
 */

/**
 * @typedef {Object} Question
 * @property {string} category Categoria da pergunta
 * @property {"boolean" | "multiple"} type Tipo da pergunta
 * @property {string} question Título da pergunta
 * @property {string} correct_answer Conteúdo da resposta correta
 * @property {string[]} incorrect_answers Lista de respostas incorretas
*/

/**
 * @typedef {Object} QuestionReqResponse
 * @property {number} response_code Código da resposta
 * @property {Question[]} results Lista de perguntas
 */

/**
 * @typedef Category
 * @property {number} id ID da categoria
 * @property {string} name Nome da categoria
 */
