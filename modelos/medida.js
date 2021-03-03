/* eslint-disable no-shadow */
import moment from 'moment-timezone';

import { v4 as uuidv4 } from 'uuid';

import { BaseModelv2 } from 'bgc-shared';

export class Medida extends BaseModelv2 {}

Medida.define(
  process.env.tabelaDeMedidasdynamodb,
  {
    id: {
      type: 'string',
      primaryKey: true,
    },
    equipamento: {
      type: 'string',
      required: true,
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
      beforeSave: (Medida) => {
        Medida.id = uuidv4();
        Medida.carimboDeTempo = moment().tz('America/Sao_Paulo').format();
      },
    },
  },
);
