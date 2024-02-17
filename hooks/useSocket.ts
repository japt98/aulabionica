import {useContext, useEffect, useRef, useState} from 'react';
import dgram, {Buffer} from 'react-native-udp';
import {throttle} from 'lodash';
import {Socket} from '../context/types';
import {GlobalContext} from '../context/global';
import {
  APP_PORT,
  APP_ADDR,
  concatenarMovimiento,
  INITIAL_MOV,
  ROBOT_PORT,
  ROBOT_ADDR,
  formatMessage,
  validateData,
  MAX_FUERZA,
} from '../context/helpers';

const useSocket = () => {
  const {dispatch, state} = useContext(GlobalContext);
  const [init, setInit] = useState(false);
  const {movimiento} = state;

  const dispatchRef = useRef(dispatch);
  const throttledDispatch = useRef(throttle(dispatchRef.current, 1000)).current; // Ajusta el intervalo según sea necesario

  const socket = dgram.createSocket({
    type: 'udp4',
    debug: true,
    reusePort: true,
  }) as Socket;

  const handleError = (error: any) => {
    let message = (error as Error)?.message;
    if (message === 'ERR_SOCKET_BAD_PORT' || message?.includes('EADDRNOTAVAIL'))
      message = 'No Conectado a red WiFi';
    dispatch({type: 'SET_ERROR', payload: message});
    dispatch({type: 'SET_CONECTADO', payload: false});
  };

  const conectar = () => {
    try {
      socket.bind(APP_PORT, APP_ADDR);
      socket.on('error', handleError);

      socket.once('listening', () => {
        if (!movimiento && !init) {
          try {
            const msg = concatenarMovimiento(INITIAL_MOV);
            socket.send(msg, 0, msg.length, ROBOT_PORT, ROBOT_ADDR, err => {
              if (err) throw err;
              console.log('Message sent! --> ' + msg);
              dispatch({type: 'SET_CONECTADO', payload: true});
              setInit(true);
              dispatch({type: 'CLEAR_ERROR'});
            });
          } catch (error) {
            let message = (error as Error)?.message;
            if (message === 'no client found with id 742') {
              console.error(error);
              return;
            }
            if (
              message === 'ERR_SOCKET_BAD_PORT' ||
              message?.includes('EADDRNOTAVAIL')
            )
              message = 'No Conectado a red WiFi';
            dispatch({type: 'SET_ERROR', payload: message});
          }
        }
      });

      socket.on('message', function (msg: Buffer, rinfo: any) {
        const mensaje = msg?.toString();
        // console.log(mensaje, 'mensaje');
        const newData = formatMessage(mensaje);
        const isValid = validateData(newData);
        if (isValid) {
          throttledDispatch({type: 'SET_DATA', payload: newData});
          if (movimiento) {
            let enviarMovimiento = true;
            const {motor, posicion} = movimiento;
            const maximaPosicionGarra =
              motor === 5 && // Es la garra
              posicion < newData.pos_motor5 && // Se quiere cerrar más
              newData.fuerza >= MAX_FUERZA; // Y la fuerza llega o excede al máximo
            if (maximaPosicionGarra) {
              enviarMovimiento = false;
            } else {
              enviarMovimiento = posicion !== newData[`pos_motor${motor}`]; // En cualquier otro caso se debe enviar el movimiento si no ha llegado a la posición esperada
            }
            // En caso de no poder limpiarlo, enviarlo
            if (enviarMovimiento) {
              try {
                const msg = concatenarMovimiento(movimiento);
                socket.send(msg, 0, msg.length, ROBOT_PORT, ROBOT_ADDR, err => {
                  if (err) throw err;
                  console.log('Message sent! --> ' + msg);
                });
              } catch (error) {
                throttledDispatch({
                  type: 'SET_ERROR',
                  payload:
                    'Error Inesperado: ' + (error as Error)?.message ||
                    'Unknown',
                });
                console.log('Error Inesperado');
              }
            } else {
              // Limpiarlo
              throttledDispatch({type: 'CLEAR_MOVIMIENTO'});
            }
          }
        }
      });
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    conectar();
    return () => {
      socket.close();
    };
  }, [dispatch, movimiento]);

  return {conectar};
};

export default useSocket;
