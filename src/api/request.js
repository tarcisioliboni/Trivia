import md5 from 'crypto-js/md5';
import cleanup from './helper';
import './types';

const API_BASE = 'https://opentdb.com/api.php?';
const TOKEN_BASE = 'https://opentdb.com/api_token.php?';
const CATEGORY_BASE = 'https://opentdb.com/api_category.php';

/**
 * Retorna uma lista de questões da API.
 *
 * @param {QuestionReqOptions} options Opções da requisição.
 * @returns {Promise<QuestionReqResponse>} Dados das perguntas
 */
async function getQuestions({ token, category, difficulty, amount, type }) {
  const DEFAULT_AMOUNT = 5;

  const params = new URLSearchParams();
  params.set('amount', amount || DEFAULT_AMOUNT);
  params.set('encode', 'url3986');
  if (token) params.set('token', token);
  if (category) params.set('category', category);
  if (difficulty) params.set('difficulty', difficulty);
  if (type) params.set('type', type);

  const request = await fetch(API_BASE + params.toString());
  const data = await request.json();
  return cleanup(data.results);
}

/**
 * Retorna um token de jogo para o usuário.
 *
 * @returns {Promise<TokenResponse>} Dados da requisição com o token do usuário
 */
async function getToken() {
  const params = new URLSearchParams();
  params.set('command', 'request');

  const request = await fetch(TOKEN_BASE + params.toString());
  const data = await request.json();
  return data;
}

/**
 * Retorna uma lista de categorias
 *
 * @returns {Promise<Category[]>} Lista de categorias
 */
async function getCategories() {
  const request = await fetch(CATEGORY_BASE);
  const data = await request.json();
  return data.trivia_categories;
}

/**
 * Retorna o link da imagem do Gravatar.
 */
function getGravatar(email) {
  const hash = md5(email);
  return hash.toString();
}

export { getCategories, getQuestions, getToken, getGravatar };
