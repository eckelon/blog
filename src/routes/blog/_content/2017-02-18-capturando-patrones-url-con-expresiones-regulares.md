---
layout: post
comments: true
title: Capturando URLs mediante expresiones regulares fáciles
category: howto
tags: trabajo desarrollo regexp expresionesregulares
---

Esta semana, hemos migrado un proyecto bastante grande a _https_. Es un proyecto implantado en varios países, de modo que tenemos que gestionar bastantes traducciones. En esta entrada me gustaría contar la forma que se me ocurrió para modificar todas las URLs contenidas en los textos de las traducciones para cambiarles el _http_ por el _https_. Normalmente, con redirigir las peticiones _http_ a _https_ bastaría, pero como en muchas páginas y comunicaciones para los usuarios se pintan estas urls con el protocolo, necesitábamos cambiarlo ahí también.


![Buscador por expresión regular del editor de texto Atom]({{ site.url }}/assets/images/2017-02-18-regexp_guetzli.jpg){: .center-image}

Esta es la forma que yo ideé, pero no significa que sea la mejor. Mis conocimientos sobre expresiones regulares son todavía muy limitados y seguramente esto se pueda hacer en un sólo paso y de una forma mejor. Si estás leyendo esto y se te ocurre, no dudes en comentármelo.

Primero tenemos que capturar únicamente las URLs que nos interesan, de modo que tendremos que contrastar el texto de la traducción contra la siguiente expresión:

`(http://)(www\.)?(proyecto1\.|proyecto2\.).\S+`

El significado de cada grupo es:

- `(http://)`: que empiece por 'http://'
- `(www\.)?`: a continuación puede seguir o no por 'www.'. El `?` hace que el grupo a su izquierda sea opcional.
- `(proyecto1\.|proyecto2\.)`: el nombre de dominio, independientemente de su extensión debe ser 'proyecto1' o 'proyecto2'
- `.\S+`: Se dejará de capturar la coincidencia en cuanto haya un espacio

De modo que, de la siguiente lista, nos capturará únicamente lo que está en negrita:

- __http://www.proyecto1.com__
- __http://www.proyecto2.pt/prueba__ esto es una prueba
- http://www.proyecto3.hk
- __http://proyecto1.fr/hola__ que tal
- http://www.proyecto3.im
- __http://proyecto2.it/__

Ya tendríamos todas las URLs completas que coinciden con nuestro patrón, pero aquí me encontré un problema: no todos los sites tenían que tener https. Esa información la tengo para cada site en base de datos y cacheada en disco. Entonces lo siguiente que tuve que hacer fue buscar por URL en la base de datos para ver si cambiaba a https esa url o no. Para esto comparé las URLs resultantes de la expresión regular anterior, con esta:

`(http://)(www\.)?(proyecto1\.|proyecto2\.).*(?=\/)`

`.*(?=\/)`: hace que siga desde el grupo anterior hasta el final pero se pare justo antes de la '/'. Para usar esto nos tendremos que asegurar que todas nuestras coincidencias anteriores terminen así.

- __http://www.proyecto1.com__/
- __http://www.proyecto2.pt__/prueba esto es una prueba
- __http://proyecto1.fr__/hola que tal
- __http://proyecto2.it__/

Estos ya son los resultados que yo necesitaba para cambiar dinámicamente el texto de las traducciones y que se pinten con el protocolo correcto en el html.

Más que un _how to_, mi intención con esta entrada es hacer ver que las expresiones regulares no son tan complicadas. Hace un par de meses no tenía ni idea, pero haciendo probatinas en el buscador de mi editor, fui aprendiendo bastantes cosas.
