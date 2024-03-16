import {FunctionComponent} from 'react';
import Nivel1 from './Nivel1';

export const MIN_CALIFICACION_APROBADA = 75;

export type Pregunta = {
  pregunta: string;
  opciones: [string, string, string, string];
  respuesta: 0 | 1 | 2 | 3;
};

export type Calificacion = {
  index: number;
  teoria: number;
  practica: number;
};

export type Nivel = {
  index: number;
  titulo: string;
  descripcion: string;
  objetivo: string;
  validacion: string;
  conceptosClave: string;
  teoria: Pregunta[];
  descripcionPractica: string;
};

// TODO: Hacer que el profesor pueda leer toda esta informacion
const nivel1: Nivel = {
  index: 0,
  titulo: 'Introducción a la Robótica',
  descripcion:
    'Aprende los fundamentos de la robótica a través de ejercicios prácticos y teóricos.',
  objetivo:
    'Comprender y operar el brazo robótico para tareas básicas de manipulación.',
  validacion:
    'El brazo robótico debe completar el movimiento asignado para llegar al punto destino.',
  conceptosClave: 'Actuadores, sensores, programación básica, seguridad.',
  descripcionPractica:
    'Dada una imagen de posición del robot, el estudiante deberá llevarlo a las posiciones correspondientes y finalmente el programa validará que las coordenadas articulares fueron colocadas de forma correcta, dentro de un rango con una tolerancia de ±3°',
  teoria: [
    {
      pregunta: '¿Qué es un actuador en robótica?',
      opciones: [
        'Un dispositivo que permite al robot recibir señales del entorno.',
        'Un componente que proporciona energía al robot.',
        'Un dispositivo que convierte las señales de control en movimiento físico.',
        'Un sensor que detecta cambios en el ambiente.',
      ],
      respuesta: 2,
    },
    {
      pregunta:
        '¿Cuál de los siguientes es un principio básico de la cinemática en robótica?',
      opciones: [
        'La manera en que las fuerzas externas afectan al movimiento del robot.',
        'El estudio de las redes neuronales y su aplicación en robots.',
        'La descripción del movimiento sin considerar las fuerzas que lo causan.',
        'La programación de tareas repetitivas en robots industriales.',
      ],
      respuesta: 2,
    },
    {
      pregunta: '¿Qué es un sistema de control en robótica?',
      opciones: [
        'Un conjunto de normas para el mantenimiento del robot.',
        'Un framework de desarrollo de software para aplicaciones robóticas.',
        'Un conjunto de componentes que gestionan las órdenes de movimiento del robot.',
        'Una biblioteca de funciones para procesar imágenes en tiempo real.',
      ],
      respuesta: 2,
    },
    {
      pregunta: '¿Qué caracteriza a un robot manipulador?',
      opciones: [
        'Su capacidad para moverse de un lugar a otro.',
        'Su habilidad para manipular objetos mediante un brazo robótico.',
        'Su uso exclusivo en tareas de ensamblaje industrial.',
        'Su habilidad para operar sin intervención humana.',
      ],
      respuesta: 1,
    },
    {
      pregunta: "¿Qué se entiende por 'robot autónomo'?",
      opciones: [
        'Un robot que requiere intervención humana para operar.',
        'Un robot controlado remotamente mediante una aplicación.',
        'Un robot capaz de realizar tareas sin supervisión directa humana.',
        'Un robot programado para tareas específicas de manufactura solamente.',
      ],
      respuesta: 2,
    },
    {
      pregunta: 'En términos de robótica, ¿qué es la percepción sensorial?',
      opciones: [
        'La capacidad de un robot para jugar ajedrez.',
        'La habilidad de un robot para percibir su entorno mediante sensores.',
        'Un tipo específico de sensor utilizado en robots industriales.',
        'La programación de robots para realizar tareas de computación.',
      ],
      respuesta: 1,
    },
  ],
};

const nivel2: Nivel = {
  index: 1,
  titulo: 'Integración de Sensores',
  descripcion: 'Uso de la información de los sensores en el brazo robótico',
  objetivo:
    ' Asegurarse de que el estudiante entiende cómo integrar y utilizar la información de los sensores para influir en el comportamiento del brazo robótico.',
  validacion:
    'Analizar la respuesta del sistema a la entrada de los sensores y la precisión de las tareas realizadas.',
  conceptosClave:
    'Procesamiento de señales, visión por computadora, retroalimentación sensorial.',
  // SOLO EJEMPLO
  descripcionPractica:
    'Dada una imagen de posición del robot, el estudiante deberá llevarlo a las posiciones correspondientes y finalmente el programa validará que las coordenadas articulares fueron colocadas de forma correcta, dentro de un rango con una tolerancia de ±3°',
  teoria: [
    {
      pregunta: '¿Qué es un actuador en robótica?',
      opciones: [
        'Un dispositivo que permite al robot recibir señales del entorno.',
        'Un componente que proporciona energía al robot.',
        'Un dispositivo que convierte las señales de control en movimiento físico.',
        'Un sensor que detecta cambios en el ambiente.',
      ],
      respuesta: 2,
    },
  ],
};

interface Practicas {
  [keys: number]: FunctionComponent;
}

export const practicas: Practicas = {
  0: Nivel1,
  1: Nivel1,
};

const niveles = [nivel1, nivel2];

export default niveles;
