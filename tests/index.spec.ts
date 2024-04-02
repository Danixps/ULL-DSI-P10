import "mocha";
import { expect } from "chai";
import {funcion1} from "../src/index.js";

describe("Pruebas sobre Template", () => {
  it("operaciones con Lwectura", () => {
    expect(true).to.equal(true);
  });
});

describe("Pruebas sobre Template", () => {
  it("operaciones con Lwectura", () => {
    expect(funcion1()).to.equal(1);
  });
});