export const TIEMPO_DE_LA_SESION = 1 * 60 * 60 * 1000; // 15min en ms

export const coordenadas = {
  // TODO: Guardar esto en una variable de entorno
  A: ['54', '80', '91', '57', '42'],
  B: ['57', '98', '47', '74', '75'],
  C: ['74', '98', '35', '92', '19'],
  D: ['77', '22', '87', '98', '67'],
  E: ['77', '68', '82', '59', '42'],
  F: ['19', '75', '19', '39', '41'],
  G: ['93', '49', '30', '29', '84'],
  H: ['31', '97', '90', '29', '33'],
  I: ['46', '56', '79', '24', '45'],
  J: ['97', '98', '89', '49', '85'],
};

export type Col = keyof typeof coordenadas;
export type Row = 0 | 1 | 2 | 3 | 4;
export type Coordenada = {
  col: Col;
  row: Row;
};

export function getRandomCoordinateValue() {
  const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'] as Col[];
  const randomColumnIndex = Math.floor(Math.random() * columns.length);

  return {
    col: columns[randomColumnIndex],
    row: Math.floor(Math.random() * 5) as Row,
  };
}
