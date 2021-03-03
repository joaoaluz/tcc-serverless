/* eslint-disable no-shadow */
import moment from 'moment-timezone';

import { v4 as uuidv4 } from 'uuid';

import { BaseModelv2 } from 'bgc-shared';

export class Equipamento extends BaseModelv2 {}

Equipamento.define(
  process.env.tabelaDeEquipamentosdynamodb,
  {
    id: {
      type: 'string',
      primaryKey: true,
    },
    nome: {
      type: 'string',
      required: true,
    },
    estado: {
      type: 'string',
      required: true,
    },
    local: {
      type: 'string',
      required: true,
    },
    consumo: {
      type: 'string',
      required: true,
    },
    potencia: {
      type: 'number',
      required: true,
    },
  },
  {
    hooks: {
      beforeSave: (equipamento) => {
        equipamento.id = uuidv4();
        equipamento.carimboDeTempo = moment().tz('America/Sao_Paulo').format();
      },
    },
  },
);
