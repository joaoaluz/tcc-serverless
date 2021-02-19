import { moment } from 'moment-timezone';

import { v4 as uuidv4 } from 'uuid';

import { BaseModel } from 'bgc-shared';

/**
 * Model for labor Medidases
 * @params {id, createdAt, infos, principalId, principalGroup}
 * @optionalParams {status, webhookUrl, updateAt, infos, results, reusedFrom}
 */

export class Medidas extends BaseModel {}

Medidas.idColumnName = 'id';
Medidas.tableName = process.env.tabelaDeMedidasdynamodb;

Medidas.validatesPresenceOf('id', 'carimboDeTempo', 'corrente', 'tensao', 'pontencia');

Medidas.validatesTypeOf({
  id: 'string',
  carimboDeTempo: 'string',
  corrente: 'number',
  tensao: 'double',
  potencia: 'double',
});

Medidas.addJsonAttributes(
  'id',
  'carimboDeTempo',
  'corrente',
  'tensao',
  'potencia',
);

Medidas.afterInitialize(function setAfterInitializeValues() {
  if (!this.id) this.id = uuidv4();
  if (!this.carimboDeTempo) this.carimboDeTempo = moment().tz('America/Sao_Paulo').format();
});

Medidas.registerIndexes({
  base: {
    hash: 'id',
  },
  CreatedAtIndex: {
    hash: 'status',
    range: 'carimboDeTempo',
  },
});
