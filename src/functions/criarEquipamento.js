import {
  Logger,
  apiResponse,
} from 'bgc-shared';

import {
  Equipamento,
} from 'Modelos';

export const main = async (event) => {
  try {
    const {
      nome,
      estado,
      local,
      consumo,
      potencia,
    } = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;

    const equipamento = new Equipamento({
      nome,
      estado,
      local,
      consumo,
      potencia,
    });

    await equipamento.save();

    Logger.info('Novo equipamento salvo com sucesso', { equipamento });
    return apiResponse(200, {
      body: {
        menssagem: 'sucesso ao criar um novo equipamento',
        equipamento,
      },
    });
  } catch (error) {
    Logger.error('Error ao salvar novo equipamento', { error });

    return apiResponse(500, {
          body: error,
      });
  }
};
