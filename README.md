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

### Recursos Utilizados

####  Cache Storage

- add() - Esse método faz duas operações de uma só vez. A primeira é carregar o recurso da Web, usando, internamente, um comando fetch(). Em seguida, ele inclui o recurso no cache usando como chave o objeto Request desse recurso e como valor o próprio recurso recuperado na Web.
- addAll() - Esse método adiciona vários recursos ao cache em uma única operação. Se qualquer recurso falhar, então nenhum deles, mesmo os recuperados com sucesso, será armazenado.
- put() - Esse método atualiza o recurso armazenado no cache. Isso é útil quando precisamos atualizar o recurso, porque ele foi alterado na Web, ou quando precisamos gerar alguma resposta por meio de programação.
- delete() - Esse método apaga o recurso do cache.
match() - Esse método recupera o recurso no cache, para que possamos ter acesso ao seu valor.
- keys() - Esse método retorna um vetor com a lista de chaves armazenada no cache (na forma de um promise).

*** Na função abaixo, o método match() é utilizado para verificar se index.html está no catch. Se existir, retorna, se não faz um fetch e busca da web.
```function carrega(recurso) {
  let reposta = caches.open('meuCache').then(       function(cache) {
    return cache.match('/index.html').then( function(recurso) {
      if(recurso) return recurso;
      return fetch('/index.html');
    });
  });
  return resposta;
}```