import {
  Equipamento,
} from 'Modelos';

import {
  Logger,
  apiResponse,
} from 'bgc-shared';

export const main = async (event) => {
  try {
    const {
      equipamentoId,
    } = event.pathParameters;

    const equipamento = await Equipamento.find(equipamentoId);

    Logger.info('Sucesso ao pegar equipamento', {
      equipamento,
    });

    return apiResponse(200, {
      body: {
        menssagem: 'Sucesso ao pegar equipamento',
        equipamentoId,
      },
    });
  } catch (error) {
    return apiResponse(500, {
      body: {
        error: error.message,
      },
    });
  }
};
