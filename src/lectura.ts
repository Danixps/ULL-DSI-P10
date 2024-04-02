
/**
* Description la clase ManejodeFichero es la case base de TemplateMethod donde dentro estan los pasos de ejecutarr
*/
export abstract class ManejodeFicheros {
    /**
    * Description la funcion ejecutar es uno de los algoritmos que se le aplica a manejo de ficheros para un json o cvs donde retorna a procesar
    */
    public ejecutar(): string[] {
        return this.procesar();
    }
    protected abstract procesar(): string[];
}