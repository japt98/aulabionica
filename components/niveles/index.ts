import {FunctionComponent} from 'react';
import Nivel1 from './Nivel1';
import Nivel2 from './Nivel2';
import Nivel3 from './Nivel3';
import Nivel4 from './Nivel4';
import Nivel5 from './Nivel5';

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
    'Asegurarse de que el estudiante entiende cómo integrar y utilizar la información de los sensores para influir en el comportamiento del brazo robótico.',
  validacion:
    'Evidenciar la precisión del sistema utilizando la información de los acelerómetros.',
  conceptosClave:
    'Interpretación de datos de acelerómetros, control de movimiento basado en retroalimentación sensorial, algoritmos de decisión basados en entradas sensoriales',
  descripcionPractica:
    'Se le solicitará al estudiante llevar los eslabones del robot a un ángulo relativo con el centro de masa (la idea es que mueva el robot y vea cómo varían los valores de los sensores). Luego de esto se validarán los valores finales de los sensores.  ',
  teoria: [
    {
      pregunta: '¿Para qué se utilizan los acelerómetros en la robótica?',
      opciones: [
        'Para medir la distancia recorrida por el robot.',
        'Para detectar la dirección del viento.',
        'Para determinar la orientación y el movimiento del robot.',
        'Para calcular la temperatura del entorno.',
      ],
      respuesta: 2,
    },
    {
      pregunta:
        '¿Cómo puede un sensor de fuerza influir en el comportamiento de un brazo robótico?',
      opciones: [
        'Permitiendo que el brazo reproduzca música.',
        'Ajustando la presión ejercida al agarrar objetos.',
        'Cambiando el color del brazo robótico.',
        'Mejorando la capacidad del brazo para emitir luz.',
      ],
      respuesta: 1,
    },
    {
      pregunta:
        '¿Qué concepto es crucial para interpretar los datos provenientes de un acelerómetro?',
      opciones: [
        'Programación funcional.',
        'Teoría musical.',
        'Procesamiento de señales.',
        'Diseño gráfico.',
      ],
      respuesta: 2,
    },
    {
      pregunta:
        'Al incorporar retroalimentación sensorial en un brazo robótico, ¿qué se busca mejorar principalmente?',
      opciones: [
        'La habilidad del brazo para jugar videojuegos.',
        'La precisión y adaptabilidad del brazo a diferentes tareas y entornos.',
        'La capacidad del brazo para operar en el vacío del espacio.',
        'El consumo eléctrico del brazo robótico.',
      ],
      respuesta: 1,
    },
  ],
};

const nivel3: Nivel = {
  index: 2,
  titulo: 'Cinemática Directa',
  descripcion: 'Aplicación de la cinemática directa',
  descripcionPractica:
    'Se le proporcionará al estudiante las matrices de transformación homogéneas y fórmulas de ángulos de rotación de Euler previamente calculadas y se le pedirá que, de acuerdo a cierto conjunto de valores articulares, calcule la coordenada del efector final del robot (x,y,z,𝜓,𝜑).',
  conceptosClave:
    'Cinemática directa, transformaciones geométricas, matrices de rotación y traslación, sistema de coordenadas del efector final.',
  objetivo:
    'Comprender y aplicar los principios de la cinemática directa para predecir la posición del efector final del brazo robótico dada una configuración específica de las articulaciones',
  validacion:
    'Confirmar que la posición del efector final coincida con los cálculos teóricos basados en los ángulos de las articulaciones proporcionados.',
  teoria: [
    {
      pregunta: '¿Qué describe la cinemática directa en un sistema robótico?',
      opciones: [
        'La influencia de las fuerzas externas en la posición del robot.',
        'La relación entre la configuración de las articulaciones y la posición y orientación del efector final.',
        'El cálculo de la velocidad necesaria para mover cada articulación.',
        'La interpretación de la señal de un sensor para determinar la posición del robot.',
      ],
      respuesta: 1,
    },
    {
      pregunta:
        '¿Para qué se utilizan las matrices de rotación en la cinemática directa?',
      opciones: [
        'Para calcular el consumo de energía de cada motor.',
        'Para describir la orientación de las articulaciones o del efector final.',
        'Para determinar la temperatura de operación del robot.',
        'Para diseñar la forma física de las articulaciones del robot.',
      ],
      respuesta: 1,
    },
    {
      pregunta:
        '¿Qué papel juegan las transformaciones geométricas en la cinemática directa?',
      opciones: [
        'Para diseñar circuitos eléctricos dentro del robot.',
        'Para calcular la posición del efector final a partir de las posiciones de las articulaciones.',
        'Para medir la resistencia de los materiales del robot.',
        'Para estimar el peso del robot.',
      ],
      respuesta: 1,
    },
    {
      pregunta:
        'Al definir la posición del efector final en la cinemática directa, ¿qué sistema de coordenadas se utiliza comúnmente?',
      opciones: [
        'Coordenadas polares.',
        'Coordenadas cartesianas.',
        'Coordenadas homogéneas.',
        'Coordenadas cilíndricas.',
      ],
      respuesta: 2,
    },
  ],
};

const nivel4: Nivel = {
  index: 3,
  titulo: 'Cinemática Inversa',
  descripcion: 'Aplicación de la cinemática inversa',
  descripcionPractica:
    'Se le pedirá al estudiante que halle los valores articulares usando el método de cinemática inversa. Las ecuaciones necesarias se le suministrarán y se le dará, además el vector de posición/orientación inicial.',
  conceptosClave:
    'Algoritmos de cinemática inversa, soluciones múltiples y singulares, espacio de trabajo del robot, desacoplo cinemático.',
  objetivo:
    'Desarrollar la habilidad para calcular la configuración de articulaciones necesarias para que el efector final del brazo robótico alcance una posición y orientación deseadas.',
  validacion:
    'Verificar que el efector final del brazo se posicione correctamente en el lugar y orientación especificados, y que los movimientos coincidan con los cálculos teóricos de cinemática inversa.',
  teoria: [
    {
      pregunta: '¿Qué problema resuelve la cinemática inversa en robótica?',
      opciones: [
        'Determinar la cantidad de energía necesaria para mover el brazo robótico.',
        'Calcular las configuraciones de las articulaciones necesarias para alcanzar una posición y orientación del efector final.',
        'Estimar la vida útil de las articulaciones del robot.',
        'Programar la secuencia de operaciones en una línea de ensamblaje.',
      ],
      respuesta: 1,
    },
    {
      pregunta:
        '¿Cuál es un desafío común al resolver problemas de cinemática inversa?',
      opciones: [
        'Lograr que el robot siga comandos de voz.',
        'Encontrar una solución única debido a las múltiples configuraciones posibles.',
        'Evitar que el brazo robótico realice movimientos.',
        'Asegurarse de que el robot pueda operar bajo el agua.',
      ],
      respuesta: 1,
    },
    {
      pregunta:
        '¿Qué se debe tener en cuenta al implementar la cinemática inversa en un brazo robótico?',
      opciones: [
        'La colocación y el diseño estético del brazo.',
        'La melodía que el robot debe reproducir mientras se mueve.',
        'La existencia de posiciones singulares y su impacto en los movimientos del brazo.',
        'El tipo de pintura a utilizar para los componentes del brazo.',
      ],
      respuesta: 2,
    },
    {
      pregunta:
        'En la cinemática inversa, ¿por qué es importante considerar el espacio de trabajo del robot?',
      opciones: [
        'Para programar el robot para tareas de entretenimiento.',
        'Para calcular el costo de producción del robot.',
        'Para asegurar que la posición y orientación deseadas estén dentro del alcance físico del brazo.',
        'Para determinar el color de la iluminación LED del efector final.',
      ],
      respuesta: 2,
    },
  ],
};

const nivel5: Nivel = {
  index: 4,
  titulo: 'Control de Trayectorias (Rutina)',
  descripcion: 'Crea y ejecuta rutinas para seguir con tu aprendizaje.',
  objetivo:
    'Dominar el control de la trayectoria del brazo robótico, asegurando movimientos suaves y precisos a lo largo de un camino predeterminado.',
  validacion:
    'Comprobar que el brazo robótico sigue la trayectoria con la precisión requerida y evaluar la suavidad de la transición entre los puntos de control.',
  conceptosClave:
    'Planificación de trayectorias, interpolación lineal y circular, controladores de movimiento, dinámica de movimiento.',
  descripcionPractica:
    'Se le dará acceso al estudiante al panel de creación de rutinas para que pueda crear y ejecutar distintas rutinas propuestas por el docente.',
  teoria: [
    {
      pregunta: '¿Qué es el control de trayectoria en robótica?',
      opciones: [
        'El proceso de cambio de colores en el robot para camuflaje.',
        'La técnica para guiar el efector final de un robot a lo largo de un camino específico.',
        'La programación de tareas de ensamblaje con herramientas manuales.',
        'El monitoreo de la temperatura del robot durante la operación.',
      ],
      respuesta: 1,
    },
    {
      pregunta:
        '¿Cuál es el propósito de los controladores de movimiento en la robótica?',
      opciones: [
        'Decidir los colores de iluminación del robot según su estado de ánimo.',
        'Controlar la temperatura interna del robot.',
        'Regular la velocidad y aceleración del robot para seguir la trayectoria deseada.',
        'Seleccionar la música de fondo durante las demostraciones del robot.',
      ],
      respuesta: 2,
    },
    {
      pregunta:
        '¿Por qué es importante la suavidad en el control de trayectoria?',
      opciones: [
        'Para que el robot sea estéticamente agradable.',
        'Para minimizar el desgaste mecánico y evitar movimientos bruscos.',
        'Para reducir el ruido que el robot hace al moverse.',
        'Para mejorar la señal de Wi-Fi del robot.',
      ],
      respuesta: 1,
    },
    {
      pregunta:
        '¿A qué están sujetos los puntos establecidos en la trayectoria del robot?',
      opciones: [
        'La alimentación eléctrica del robot.',
        'El alcance de las articulaciones y el espacio de trabajo.',
        'La cantidad de pasos en la trayectoria.',
        'El tipo de actuadores del robot.',
      ],
      respuesta: 1,
    },
  ],
};

interface Practicas {
  [keys: number]: FunctionComponent<{
    nivel: Nivel;
    calificacion?: Calificacion;
  }>;
}

export const practicas: Practicas = {
  0: Nivel1,
  1: Nivel2,
  2: Nivel3,
  3: Nivel4,
  4: Nivel5,
};

const niveles = [nivel1, nivel2, nivel3, nivel4, nivel5];

export default niveles;
