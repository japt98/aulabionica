import {ReactElement} from 'react';
import UdpSocket from 'react-native-udp/lib/types/UdpSocket';

export type Socket = UdpSocket & {
  on: (e: 'error' | 'message', cb: (...args: any) => any) => void;
  once: (e: 'listening', cb: (...args: any) => any) => void;
};

export interface Data {
  pos_motor0: number; // entero sin sesgo (0-180) positivo
  pos_motor1: number; // entero sin sesgo (0-180) positivo
  pos_motor2: number; // entero sin sesgo (0-180) positivo
  pos_motor3: number; // entero sin sesgo (0-180) positivo
  pos_motor4: number; // entero sin sesgo (0-180) positivo
  pos_motor5: number; // entero sin sesgo (0-180) positivo
  param_x_giro0: number; // float(2,1) [-90.0,90.0] con un sesgo de 1 decimal ---> -900 --> 900 (o -899 a 899)
  param_y_giro0: number; // float(2,1) [-90.0,90.0] con un sesgo de 1 decimal ---> -900 --> 900 (o -899 a 899)
  param_z_giro0: number; // float(2,1) [-90.0,90.0] con un sesgo de 1 decimal ---> -900 --> 900 (o -899 a 899)
  param_x_giro1: number; // float(2,1) [-90.0,90.0] con un sesgo de 1 decimal ---> -900 --> 900 (o -899 a 899)
  param_y_giro1: number; // float(2,1) [-90.0,90.0] con un sesgo de 1 decimal ---> -900 --> 900 (o -899 a 899)
  param_z_giro1: number; // float(2,1) [-90.0,90.0] con un sesgo de 1 decimal ---> -900 --> 900 (o -899 a 899)
  fuerza: number; // entero sin sesgo (0-100) positivo
}

export type Movimiento = {
  velocidad: number; // Entero sin sesgo (0-100) (%)
  motor: 0 | 1 | 2 | 3 | 4 | 5;
  posicion: number; // Entero sin sesgo (0,180) positivo **
};

export interface IGlobalState {
  conectado: boolean;
  error: string | null;
  data: Data | null;
  movimiento: Movimiento | null;
  rutina: Rutina | null;
  logged: boolean;
}

export type Action =
  | {type: 'SET_DATA'; payload: Data}
  | {type: 'SET_MOVIMIENTO'; payload: Movimiento}
  | {type: 'CLEAR_MOVIMIENTO'}
  | {type: 'CLEAR_ERROR'}
  | {type: 'SET_ERROR'; payload: string}
  | {type: 'SET_CONECTADO'; payload: boolean}
  | {type: 'SET_RUTINA'; payload: Rutina}
  | {type: 'CLEAR_RUTINA'}
  | {type: 'SET_LOGIN'; payload: boolean};

export interface GlobalContextType {
  state: IGlobalState;
  dispatch: React.Dispatch<Action>;
}

export interface IGlobalProvider {
  children: ReactElement;
}

export type Operacion = Movimiento[];
export type Rutina = {nombre: string; operaciones: Operacion[]};
