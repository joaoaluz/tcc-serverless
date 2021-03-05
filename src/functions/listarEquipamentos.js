import {
  Logger,
  apiResponse,
} from 'bgc-shared';

import {
  Equipamento,
} from 'Modelos';

import queryString from 'query-string';

const getParametrosDeConsulta = (parameters) => {
  const parametrosIniciais = parameters || {};

  const parametrosDeConsulta = queryString.stringify(parametrosIniciais, {
    sort: false,
    skipNull: true,
    skipEmptyString: true,
  });

  return queryString.parse(parametrosDeConsulta, {
    parseBooleans: true,
    parseNumbers: true,
  });
};

export const main = async (event) => {
  try {
    const {
      limit,
      lastEvaluatedKey,
    } = getParametrosDeConsulta(event.queryStringParameters);

    Logger.info('Nova listagem de Equipamentos');

    const { Items: resultados, LastEvaluatedKey, Count } = await Equipamento.list({},
      {
        limit,
        lastEvaluatedKey,
      });

    return apiResponse(200, {
      body: {
        menssagem: 'Sucesso em listar as Equipamentos',
        Equipamentos: {
          resultados,
          Count,
          LastEvaluatedKey,
        },
      },
    });
  } catch (error) {
    Logger.error('Algo deu errado.', { error });
    return apiResponse(500, { body: error });
  }
};
