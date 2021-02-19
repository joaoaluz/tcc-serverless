/* eslint-disable no-shadow */
import moment from 'moment-timezone';

import { v4 as uuidv4 } from 'uuid';

import { BaseModelv2 } from 'bgc-shared';

export class Medidas extends BaseModelv2 {}

Medidas.define(
  process.env.tabelaDeMedidasdynamodb,
  {
    id: {
      type: 'string',
      primaryKey: true,
    },
    carimboDeTempo: {
      type: 'string',
      required: true,
    },
    corrente: {
      type: 'number',
      required: true,
    },
    tensao: {
      type: 'number',
      required: true,
    },
    potencia: {
      type: 'number',
      required: true,
    },
  },
  {
    hooks: {
      beforeSave: (Medidas) => {
        Medidas.id = uuidv4();
        Medidas.carimboDeTempo = moment().tz('America/Sao_Paulo').format();
      },
    },
  },
);
