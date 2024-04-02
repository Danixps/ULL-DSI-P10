import "mocha";
import { expect } from "chai";
import {ManejodeFicheros} from '../src/lectura.js'
import {LecturaArchivoscvs} from '../src/index.js'
describe("Pruebas sobre Template", () => {
  it("operaciones con Lwectura", () => {
    const algoritmo: ManejodeFicheros = new LecturaArchivoscvs();
    algoritmo.ejecutar();
    expect(true).to.equal(true);
  });
});

