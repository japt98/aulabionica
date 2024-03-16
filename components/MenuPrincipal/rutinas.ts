import {Rutina} from '../../context/types';

const guardado: Rutina = {
  nombre: 'Guardar',
  operaciones: [
    [
      {motor: 0, posicion: 90, velocidad: 100},
      {motor: 1, posicion: 90, velocidad: 100},
      {motor: 2, posicion: 90, velocidad: 100},
      {motor: 3, posicion: 90, velocidad: 100},
      {motor: 4, posicion: 90, velocidad: 100},
      {motor: 5, posicion: 180, velocidad: 100},
    ],
    [
      {motor: 2, posicion: 180, velocidad: 100},
      {motor: 1, posicion: 150, velocidad: 100},
      {motor: 0, posicion: 0, velocidad: 100},
      {motor: 3, posicion: 90, velocidad: 100},
      {motor: 5, posicion: 0, velocidad: 100},
      {motor: 4, posicion: 0, velocidad: 100},
    ],
  ],
};

const iniciado: Rutina = {
  nombre: 'Inicializar',
  operaciones: [
    [
      {motor: 0, posicion: 90, velocidad: 100},
      {motor: 1, posicion: 90, velocidad: 100},
      {motor: 2, posicion: 90, velocidad: 100},
      {motor: 3, posicion: 90, velocidad: 100},
      {motor: 4, posicion: 90, velocidad: 100},
      {motor: 5, posicion: 0, velocidad: 100},
    ],
  ],
};

export {guardado, iniciado};
