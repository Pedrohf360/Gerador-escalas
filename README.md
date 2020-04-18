# PUC-PWA - Gerador de listas randômicas

A aplicação aceita uma lista de nomes (aqueles que participarão do sorteio) e de categorias, gerando listas randômicas com o mínimo de repetições possíveis por categoria.

Exemplo com 3 listas geradas para um piquenique (poderia ser apenas 1, porém imagine que o piquenique será realizado em nas próximas 3 semanas e vamos gerar a lista sem repetição para este caso):

## Entradas

### Nomes:
Pedro
Ciclano
Fulano

### Categorias (ex: lista de lanches para piquenique)
Doces
Bebidas
Salgados

## Saída:

Listas gerada:

### Lista 1:
Doces: Ciclano
Bebidas: Pedro
Salgados: Fulano


### Lista 2:
Doces: Pedro
Bebidas: Fulano
Salgados: Ciclano


### Lista 3:
Doces: Fulano
Bebidas: Ciclano
Salgados: Pedro
---
#Scripts úteis:

http-server -c-1 (evitar armazenamento de cache)

## CONTRIBUIR

Basta clonar o projeto e utilizar o npm run start para iniciar a aplicação. Há um arquivo package.json onde existem outros scripts úteis, por exemplo: 

start-no-cache: start app with no cache, using -c-1 flag (-1 indica o tempo que)