# Markdown Links

## Índice

* [1. Preámbulo](#1-preámbulo)
* [2. Resumen del proyecto](#2-resumen-del-proyecto)
* [3.Guia de Uso e instalación de la libreria](#3-Guia-de-uso-e-instalación-de-la-libreria)
* [4. Despliegue en Npm](#4-Despliegue-en-Npm)
***

## 1. Preámbulo

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...) y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

Dentro de una comunidad de código abierto, nos han propuesto crear una
herramienta usando [Node.js](https://nodejs.org/), que lea y analice archivos
en formato `Markdown`, para verificar los links que contengan y reportar
algunas estadísticas.

## 2. Resumen del proyecto

Este proyecto tiene como finalidad la verificaciòn de los links que se encuentren en formato Markdown, facilitando tambien un reporte de la cantidad de links validos, unicos o rotos (broken). Utilizando Node.js con entorno de desarrollo JavaScript

## 3. Guia de uso e instalación de la libreria

Instalación

Para realizar la instalación de la libreria sigue los siguientes pasos:

1. En la terminal de tu editor de codigo busca el directorio de tu proyecto  
2. Ejecuta el siguiente comando: `npm i md-links-mayrag`

Modo de Uso:

Para ejecutar las funciones de la librería puedes usar los siguientes comandos desde tu editor de codigo:

1.Ejecutando el comando: `npm run validate` el cual retornara las siguiente información:  
`text`: Texto que aparece dentro del link  
`url`: URL encontrada  
`absolutePath`: Ruta del archivo donde se encuentra el link  
`statusCode`: Codigo de respuesta HTTP  
`ok`: Mensaje de   
`fail` en caso de fallo u `ok`  en caso de exito

2. Ejecutando el comando: `npm run stats` el cual retorna la siguiente información:  
`Total`: Número de links encontrados  
`Unique`: Número de links unicos (Que no se repiten).

3. Ejecutando el comando: `npm run all` el cual retorna la siguiente información:  
`Total`: Número de links encontrados  
`Unique`:Número de links unicos (Que no se repiten)  
`Broken`:Número de link rotos

4. Ejecutando el comando: `npm run none` el cual retorna la siguiente información:  
`text`:Texto que aparece dentro del link  
`url`: URL encontrada  
`absolutePath`: Ruta del archivo donde se encuentra el link

## 4. Despliegue en NPM

   Link de despliegue en https://www.npmjs.com/package/md-links-mayrag
