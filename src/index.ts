import {createReadStream} from 'fs';
import {ManejodeFicheros} from './lectura.js'
import { readFileSync } from 'node:fs';

/**
* Description la clase Leerarchivos json hereda de manejo de ficheros
*/
export class LecturaArchivosjson extends  ManejodeFicheros {
    protected procesar(): string[] {


    manejardatoscsv(readFileSync('prueba.csv').toString());
    


  return manejardatoscsv(readFileSync('prueba.csv').toString());
  }


}

/**
* Description la clase Leer archivos cvs hereda de manejo de ficheros
*/
export class LecturaArchivoscvs extends  ManejodeFicheros {
  protected procesar(): string[] {
  const archivojson = createReadStream('prueba.json')
  
  manejardatosjson(readFileSync('prueba.csv').toString());
    


  return manejardatosjson(readFileSync('prueba.csv').toString());
  
  archivojson.on('error', (err) => {
    process.stderr.write(err.message);
  });
  const  datos: string[] = ['']
  return datos;
}

}

/**
* Description la funcion manejar datos cvs recibe los datos de csv para ir clasificando los datos en un array
* @param datos que serian los datos de un archivo cvs en un string
*/
function manejardatoscsv(datos: string) :string[] {
  const arr_datos: string[] = datos.split(',');

  
  for (let index = 0; index < arr_datos.length; index++) {

    if (index === 0){
    const capacidad = arr_datos[index];
    console.log(capacidad);
    } 
    if(index === 1){
      const elementosmochila = arr_datos[index];
      console.log(elementosmochila);

    }  else{
    const element = arr_datos[index];
    console.log(element); 
    }
  }
  return arr_datos;
  
}

/**
* Description la funcion manejar datos cvs recibe los datos de json para ir clasificando los datos en un array
* @param datos que serian los datos de un archivo json en un string
*/
function manejardatosjson(datos: string) :string[] {
  const arr_datos: string[] = datos.split(',');

  
  for (let index = 0; index < arr_datos.length; index++) {
    const element = arr_datos[index];
    console.log(element);    
  }
  return arr_datos;
  
}

const fichero1: ManejodeFicheros = new LecturaArchivoscvs();
fichero1.ejecutar();

const fichero2: ManejodeFicheros = new LecturaArchivosjson();
fichero2.ejecutar();
