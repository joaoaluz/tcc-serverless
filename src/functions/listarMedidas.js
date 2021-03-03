import {
  Logger,
  apiResponse,
} from 'bgc-shared';

import {
  Medidas,
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
      dataInicial,
      dataFinal,
      limit,
      lastEvaluatedKey,
    } = getParametrosDeConsulta(event.queryStringParameters);

    Logger.info('Nova listagem de medidas', {
      dataInicial,
      dataFinal,
    });

    const queryParams = {
      carimboDeTempo: {
        operator: 'between',
        min: dataInicial,
        max: dataFinal,
      },
    };

    const { Items: resultados, LastEvaluatedKey, Count } = await Medidas.list(
      queryParams,
      {
        limit,
        lastEvaluatedKey,
      },
    );

    return apiResponse(200, {
      body: {
        menssagem: 'Sucesso em listar as medidas',
        medidas: {
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
