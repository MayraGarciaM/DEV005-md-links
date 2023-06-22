import * as fs from "fs"
import axios from "axios"
import {readMarkdownFile, findLinksInMarkdown} from "../src/index"
jest.mock('axios');
jest.mock('fs');

describe("test all functios", () => {
  const fileTestMd = "src/testmd.md";
  axios.get.mockResolvedValue({ data: 'Respuesta simulada de axios' });

  fs.readFileSync.mockReturnValue('[mayra](https://www.google.com), [enlace en línea](https://www.example.com/dddd)');
  it("test flow to show the responses", () => {
    const responseReadMarkdownFile = readMarkdownFile(fileTestMd)
    expect(responseReadMarkdownFile).toBe("[mayra](https://www.google.com), [enlace en línea](https://www.example.com/dddd)")
    const list = findLinksInMarkdown(responseReadMarkdownFile)
    expect(list.length).toBe(2)
    expect(list[0].text).toBe("mayra")
    expect(list[0].url).toBe("https://www.google.com")
  })
})

/*
describe('Prueba de importación de bibliotecas', () => {
  it('debe simular la importación de axios y fs, y realizar una prueba', () => {


    axios.get.mockResolvedValue({ data: 'Respuesta simulada de axios' });

    // Configura el comportamiento deseado para el mock de fs
    fs.readFileSync.mockReturnValue('Contenido simulado de fs');

    // Realiza tus pruebas que involucran el uso de axios y fs
    // ...

    // Asegúrate de verificar el comportamiento esperado
    // ...
  });
});*/