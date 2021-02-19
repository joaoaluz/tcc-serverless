import {
  Logger,
  apiResponse,
} from 'bgc-shared';

import {
  Medidas,
} from 'Modelos';

export const main = async (event) => {
  try {
    const {
      tensao,
      corrente,
      potencia,
    } = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;

    const medidas = new Medidas({
      tensao,
      corrente,
      potencia,
    });

    await medidas.save();

    return apiResponse(200, {
      body: {
        message: 'Successfully fetched!',
        medidas,
      },
    });
  } catch (error) {
    Logger.error('Something went wrong.', { error });
    return apiResponse(500, { body: error });
  }
};