import {
  Logger,
  apiResponse,
} from 'bgc-shared';

import {
  Medida,
} from 'Modelos';

export const main = async (event) => {
  try {
    const {
      equipamento,
      tensao,
      corrente,
      potencia,
    } = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;

    const medida = new Medida({
      equipamento,
      tensao,
      corrente,
      potencia,
    });

    await medida.save();

    return apiResponse(200, {
      body: {
        message: 'Successo em salvar as Medida!',
        medida,
      },
    });
  } catch (error) {
    Logger.error('Algo deu errado.', { error });
    return apiResponse(500, { body: error });
  }
};
