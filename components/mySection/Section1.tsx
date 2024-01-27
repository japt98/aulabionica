// import React, {FunctionComponent, useState} from 'react';
// import {Pressable, StyleSheet, Text, View} from 'react-native';
// import dgram, {Buffer} from 'react-native-udp';
// import Slider from 'react-native-a11y-slider';

// interface SectionProps {
//   title?: string;
// }
// // YO
// const PORT = 60000;
// const ADDR = '192.168.0.105';

// // Conectado:
// /**
//  * AL principio esta desconectado
//  * Recibo el primer mensaje y ya sé que estoy conectado
//  * Para saber que estoy desconectado es porque no recibo informacion y no
//  *
//  *
//  */

// // TENGO QUW HACER EL INICIO (PRIMER MENSAJE PARA EMPAREJAR)
// // Investigar como evitar que se conecte mas de un dispositivo
// // Hacer api, distanciar envios perennes cada 1s (asi evitaremos perdida de paquetes)

// //Robot
// const PORT_ = 60000;
// const ADDR_ = '192.168.0.106';

// const VELOCIDAD = 100;

// const Section1: FunctionComponent<SectionProps> = ({title}) => {
//   const [listening, setListening] = useState(false);
//   const [error, setError] = useState('');
//   const [motor4, setMotor4] = useState<number | null>(null);
//   const [enProceso, setEnProceso] = useState(false);
//   const [angulo, setAngulo] = useState(90); // TODO: Inicializar esto con el primer mensaje
//   const posicionEsperada = angulo === motor4;
//   const conexion = !error && listening;

//   const socket = dgram.createSocket({
//     type: 'udp4',
//     debug: true,
//     reusePort: true,
//   });
//   socket.bind(PORT, ADDR);
//   socket.on('error', (e: Error) => setError(e.message));

//   socket.once('listening', function () {
//     const address = socket.address();
//     console.log(address, 'add');
//     setListening(true);
//   });

//   socket.on('message', function (msg: Buffer, rinfo: any) {
//     const mensaje = msg?.toString();
//     console.log(mensaje, 'mensajes');
//     const anguloEntrante = obtenerAngulo(mensaje);
//     if (posicionEsperada) {
//       // Ya llego jeje
//       setEnProceso(false);
//     } // TODO: Validar el state final contra el state esperado
//     setMotor4(anguloEntrante);
//   });

//   const handlePress = () => {
//     setError('');
//     if (listening) {
//       try {
//         const msg = obtenerMensaje(angulo, VELOCIDAD);
//         setEnProceso(true); // Iniciamos la accion
//         socket.send(msg, 0, msg.length, PORT_, ADDR_, err => {
//           if (err) throw err;
//           console.log('Message sent! --> ' + msg);
//         });
//       } catch (error) {
//         setError('Error Inesperado: ' + error?.message || 'Unknown');
//         console.log('Error Inesperado');
//       }
//     } else {
//       setError(`No hay conexión`);
//       console.log(`No hay conexión`);
//     }
//   };

//   return (
//     <View style={{marginLeft: 15, marginRight: 15}}>
//       <View style={{}}>
//         <Text>{conexion ? `✅ Conectado` : `❌ Desconectado`}</Text>
//       </View>
//       <Text style={s.titulo}>Conexión UDP</Text>

//       {enProceso ? (
//         <Text style={s.enProceso}>EN PROCESO (BLOQUEADO)</Text>
//       ) : (
//         <>
//           <Slider
//             min={0}
//             max={180}
//             values={[angulo]}
//             onChange={(e: number[]) => setAngulo(e[0])}
//           />

//           <Pressable
//             style={{
//               ...s.button,
//               backgroundColor: !posicionEsperada ? '#147efb' : '#bbb',
//             }}
//             onPress={handlePress}
//             disabled={posicionEsperada}>
//             <Text style={s.buttonText}>
//               {!posicionEsperada
//                 ? `Llevar a ${angulo}°`
//                 : 'Cambie el angulo en el Slider'}
//             </Text>
//           </Pressable>
//         </>
//       )}

//       {error && (
//         <View style={s.error}>
//           <Text style={s.errorText}>ERROR: {error}</Text>
//         </View>
//       )}
//       <View style={s.mensaje}>
//         <Text style={s.mensajeTitulo}>Mensaje:</Text>
//         <Text style={s.mensajeText}>
//           {motor4 !== null ? `Motor 4: ${motor4}°` : 'Sin Conexión'}
//         </Text>
//       </View>
//     </View>
//   );
// };

// const s = StyleSheet.create({
//   container: {
//     // padding: '20px 0px',???
//     paddingTop: 20,
//     backgroundColor: '#f3f4f6',
//     flex: 1,
//   },
//   error: {
//     marginTop: 10,
//     borderRadius: 50,
//     marginHorizontal: 30,
//     backgroundColor: '#a62216',
//     paddingVertical: 10,
//   },
//   enProceso: {
//     color: '#a62216',
//     fontSize: 24,
//     textAlign: 'center',
//     fontWeight: '800',
//   },
//   errorText: {
//     color: '#fff',
//     fontSize: 14,
//     textAlign: 'center',
//     fontWeight: '600',
//   },
//   success: {
//     marginTop: 10,
//     borderRadius: 50,
//     marginHorizontal: 30,
//     backgroundColor: '#53d769',
//     paddingVertical: 10,
//   },
//   successText: {
//     color: '#fff',
//     fontSize: 14,
//     textAlign: 'center',
//     fontWeight: '600',
//   },
//   button: {
//     marginHorizontal: 20,
//     // backgroundColor: '#147efb',
//     borderRadius: 30,
//     padding: 20,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     textTransform: 'uppercase',
//     fontWeight: '900',
//     textAlign: 'center',
//   },
//   mensaje: {
//     backgroundColor: '#ddd',
//     marginVertical: 40,
//     marginHorizontal: 20,
//     borderRadius: 20,
//     padding: 20,
//   },
//   mensajeTitulo: {
//     textAlign: 'center',
//     fontWeight: '900',
//     color: '#444',
//     fontSize: 16,
//     marginBottom: 20,
//   },
//   mensajeText: {
//     textAlign: 'center',
//   },
//   titulo: {
//     marginTop: 30,
//     fontSize: 35,
//     fontWeight: '900',
//     textAlign: 'center',
//     marginBottom: 20,
//     textTransform: 'uppercase',
//   },
// });

// export default Section1;

// const obtenerAngulo = (msg: string) => parseInt(msg?.split('#')?.[4]);
// const obtenerMensaje = (deg: number, velocidad?: number) =>
//   '4#' + deg + '#' + velocidad + '#';
