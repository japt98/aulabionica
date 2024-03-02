import {Data, Movimiento} from './types';

// SENSOR
const MAX_FUERZA = 10; // En Newtons (N)
// App
const APP_PORT = 60000;
const APP_ADDR = '192.168.0.105';
// Robot
const ROBOT_PORT = 60000;
const ROBOT_ADDR = '192.168.0.106';

const INITIAL_MOV: Movimiento = {
  motor: 5,
  posicion: 0,
  velocidad: 100,
};

const sleep = (seconds: number) =>
  new Promise(resolve => {
    setTimeout(() => resolve(null), 1000 * seconds);
  });

/**
  @param msg Mensaje proveniente del Robot
 * @example  const msg = '72#23#90#90#90#-254#420#342#-131#344#-137#9';
 */
const formatMessage = (msg: string): Data => {
  const values = msg?.split('#');
  const data: Data = {
    pos_motor0: parseInt(values[0]),
    pos_motor1: parseInt(values[1]),
    pos_motor2: parseInt(values[2]),
    pos_motor3: parseInt(values[3]),
    pos_motor4: parseInt(values[4]),
    pos_motor5: parseInt(values[5]),
    param_x_giro0: parseInt(values[6]),
    param_y_giro0: parseInt(values[7]),
    param_z_giro0: parseInt(values[8]),
    param_x_giro1: parseInt(values[9]),
    param_y_giro1: parseInt(values[10]),
    param_z_giro1: parseInt(values[11]),
    fuerza: parseInt(values[12]),
  };
  return data;
};

const validateData = (data: Data): boolean =>
  Boolean(
    typeof data?.pos_motor0 === 'number' &&
      typeof data?.pos_motor1 === 'number' &&
      typeof data?.pos_motor2 === 'number' &&
      typeof data?.pos_motor3 === 'number' &&
      typeof data?.pos_motor4 === 'number' &&
      typeof data?.pos_motor5 === 'number' &&
      typeof data?.param_x_giro0 === 'number' &&
      typeof data?.param_y_giro0 === 'number' &&
      typeof data?.param_z_giro0 === 'number' &&
      typeof data?.param_x_giro1 === 'number' &&
      typeof data?.param_y_giro1 === 'number' &&
      typeof data?.param_z_giro1 === 'number' &&
      typeof data?.fuerza === 'number',
  );

const concatenarMovimiento = (mov: Movimiento) =>
  mov.motor + '#' + mov.posicion + '#' + mov.velocidad + '#';

// Next: Operaciones: un arreglo de movimientos

export {
  APP_ADDR,
  APP_PORT,
  INITIAL_MOV,
  MAX_FUERZA,
  ROBOT_ADDR,
  ROBOT_PORT,
  concatenarMovimiento,
  formatMessage,
  sleep,
  validateData,
};
