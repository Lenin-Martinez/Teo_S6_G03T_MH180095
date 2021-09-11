import React,{useState,useEffect, Fragment } from 'react';
import { Text,View, FlatList,TextInput,Button,TouchableHighlight, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import shortid from 'shortid';

export default function App() {
  const [nombre, guardarInputTexto] = useState('');
  const [edad, guardarEdad] = useState('');
  const [carrera, guardarCarrera] = useState('');
  const [lista,guardarlista] = useState([]);

  useEffect(() => {
    obtenerDatosStorage();
  }, []);

  const guardarDato = async () => {
    try {
      const nombrealumno = { nombre, edad, carrera  };


        nombrealumno.id = shortid.generate();
        //{nombre:'karens',id:'asdjkads'}
      console.log(nombrealumno);
      const listanombres = [...lista, nombrealumno]
      guardarlista(listanombres);

      const datos = JSON.stringify(listanombres);
      await AsyncStorage.setItem('listaalumnos', datos);

    } catch (error) {
      console.log(error);
    }
    window.location.replace('');
  }

  const obtenerDatosStorage = async () => {
    try {
        const nombreStorage = await AsyncStorage.getItem('listaalumnos');
        if(nombreStorage) {
          const datos = JSON.parse(nombreStorage);
            guardarlista(datos);   
            console.log(`esta es la: ${lista}`);
        }
        
    } catch (error) {
      console.log(error);
    }
  }

  const eliminarDato = async(id) => {
    try {
     const nombresFiltrados = lista.filter( nombre => nombre.id !== id );
    guardarlista( nombresFiltrados );
     const datos = JSON.stringify(nombresFiltrados);
      await AsyncStorage.setItem('listaalumnos', datos);
     // await AsyncStorage.removeItem('listaalumnos');
    obtenerDatosStorage();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
     <Text style={styles.titulo}>Registro de Alumnos</Text>

    <View style={styles.contenedor}>
           <TextInput 
            placeholder="Nombre del alumno"
            style={styles.input}
            onChangeText={ texto => guardarInputTexto(texto) }
          />

          <Text>{"\n"}</Text> 

          <TextInput 
            placeholder="Edad del alumno"
            style={styles.input}
            onChangeText={ texto => guardarEdad(texto) }
          />
          
          <Text>{"\n"}</Text> 

          <TextInput keyboardType="numeric"
            placeholder="Carrera del alumno"
            style={styles.input}
            onChangeText={ texto => guardarCarrera(texto) }
          />
          
          <Text>{"\n"}</Text> 

          <Button 
            title="Guardar"
            color='#483d8b'
            onPress={ () => guardarDato() }
          />

        
      
   <Text style= {styles.tituloLista}>
    {lista.length > 0 ? 'Lista de alumnos' : 'No hay alumnos, agrega uno'} 
    </Text>
{lista?(<FlatList style= {styles.item}
             data={lista}
             renderItem={({item})=>(<Text style= {styles.textoEliminar}>{'Nombre: ' + item.nombre + "        \nEdad: " 
                                                                              + item.edad + ' años        \nCarrera: ' 
                                                                              + item.carrera}  
            
            <Button
            color= 'red'
            title="X"            
            onPress={ () => eliminarDato(item.id) }
            />

            <Text>{'\n____________________________________________'}</Text>
             </Text> )}
             keyExtractor={item => item.id}
        />) :null}
          
  
      </View>
    </>
  );
};

const styles = StyleSheet.create({
 
  contenedor: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    borderColor: '#666',
    borderBottomWidth: 1,
    width: 300,
    height: 40
  },
  textoEliminar: {
    marginTop: 10,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'right',
    textTransform: 'uppercase',
    width: 450
  },
  item: {
    backgroundColor: '#6a5acd',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    marginBottom: 200
  },
   titulo: {
    color: '#666',
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop:70
  }, 
  tituloLista: {
   color: '#666',
   marginTop: 10,
   marginBottom: 20,
   fontSize: 20,
   fontWeight: 'bold',
   textAlign: 'center',
 }
});