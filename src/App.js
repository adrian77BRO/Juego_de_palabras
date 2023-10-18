import '../src/App.css'
import React, { useState, useEffect } from 'react';

const palabras = ['coche', 'traje', 'reloj', 'balon', 'pizza', 'verde', 'nariz'];
const maxVidas = 3;

function desordenar(palabra) {
  const palabraArray = palabra.split('');
  let indiceActual = palabraArray.length;

  while (indiceActual !== 0) {
    const indiceRandom = Math.floor(Math.random() * indiceActual);
    indiceActual--;
    [palabraArray[indiceActual], palabraArray[indiceRandom]] = [palabraArray[indiceRandom], palabraArray[indiceActual]];
  }

  return palabraArray.join('');
}

export default function App() {
  const [indPalabra, setIndPalabra] = useState(0);
  const [palabraActual, setPalabraActual] = useState(palabras[indPalabra]);
  const [desordenada, setDesordenada] = useState(
    desordenar(palabraActual)
  );
  const [indLetra, setIndLetra] = useState(0);
  const [vidas, setVidas] = useState(maxVidas);
  const [typedLet, setTypedLet] = useState(Array(palabraActual.length).fill(''));
  const [mensaje, setMensaje] = useState('');

  const manejarCambio = (e) => {
    const typedLetter = e.target.value;
    const newTypedLet = [...typedLet];
    newTypedLet[indLetra] = typedLetter;
    setTypedLet(newTypedLet);

    if (typedLetter === palabraActual[indLetra]) {
      setIndLetra(indLetra + 1);
      setMensaje('Letra correcta');
      if (indLetra + 1 === palabraActual.length) {
        setIndLetra(0);
        setMensaje('¡Palabra correcta!');
        if (indPalabra + 1 === palabras.length) {
          setMensaje('¡Ganaste, has ordenado todas las palabras!');
        } else {
          setIndPalabra(indPalabra + 1);
          const siguiente = palabras[indPalabra + 1];
          setPalabraActual(siguiente);
          setDesordenada(desordenar(siguiente));
          setTypedLet(Array(siguiente.length).fill(''));
        }
      }
    } else {
      if (vidas === 1) {
        setVidas(vidas - 1);
        setMensaje('Perdiste, ha terminado el juego');
      } else {
        setVidas(vidas - 1);
        newTypedLet[indLetra] = '';
        setTypedLet(newTypedLet);
        setMensaje('Letra incorrecta');
      }
    }
  };

  const eliminar = () => {
    if (indLetra > 0) {
      const newTypedLet = [...typedLet];
      newTypedLet[indLetra - 1] = '';
      setTypedLet(newTypedLet);
      setIndLetra(indLetra - 1);
    }
  };

  const reiniciar = () => {
    setIndPalabra(0);
    const palabra = palabras[0];
    setPalabraActual(palabra);
    setDesordenada(desordenar(palabra));
    setIndLetra(0);
    setVidas(maxVidas);
    setTypedLet(Array(palabra.length).fill(''));
  };

  useEffect(() => {
    document.getElementById(`letter-${indLetra}`).focus();
  }, [indLetra]);

  return (
    <div className='juego p-5'>
      <h1 className='text-center text-white'>¡Ordena las palabras!</h1>
      <br></br>
      <br></br>
      <br></br>
      <div className='d-flex justify-content-around'>
        <p className='text-white text-center bg-primary rounded-3 w-25 p-2'>Vidas: {vidas}</p>
        <p className='text-white text-center bg-primary rounded-3 w-25 p-2'>Palabra sin ordenar: {desordenada}</p>
      </div>
      <br></br>
      <div className='d-flex justify-content-center'>
        {typedLet.map((letter, index) => (
          <input className='d-inline text-center text-dark bg-white border-0 rounded-2 m-2'
            id={`letter-${index}`}
            key={index}
            type="text"
            maxLength="1"
            value={letter}
            onChange={manejarCambio}
            disabled={index !== indLetra}
          />
        ))}
      </div>
      <br></br>
      <div className='d-flex justify-content-center'>
        <button onClick={eliminar} className='btn-eliminar border-0 text-white rounded-3 p-2 m-3'>Eliminar</button>
        <button onClick={reiniciar} className='btn-reiniciar text-white border-0 rounded-3 p-2 m-3'>Reiniciar</button>
      </div>
      <br></br>
      <p className='text-center text-warning rounded-3 p-2'>{mensaje}</p>
    </div>
  );
}