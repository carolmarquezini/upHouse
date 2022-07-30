# ![UP-HOUSE-STUDENT 05](https://user-images.githubusercontent.com/100984525/181139690-f83d76b9-fc85-4d70-b60c-e73f010e30ea.png)
**UP HOUSE STUDENT** trata-se de uma API voltada à construção civil, cujo principal objetivo será unir universidades e pessoas de baixa renda para 
solucionar pequenos problemas de obras residências.

A principio, a ideia será que pessoas de baixa renda façam um cadastro na **API UP HOUSE STUDENT**, descreva o seu problema e por fim universidades 
tenham acesso aos cadastros dessas pessoas, com o intuito de que docentes selecione casos reais para que alunos do curso de engenharia civil possam 
ter essa vivência durante a graduação, de modo que seja possível que os discentes façam, de fato, um estudo de caso real, com possíveis visitas técnicas.

Como sugestão, esse projeto pode ser oferecido nas universadades no modelo de estudos de casos com a contribuição de alunos da graduação, 
pós-graduação e principalmente com a orientação de um docente. 

---
## Documentação

- [Problema](#problema)
- [Solução](#solução)
- [Tema](#tema)
- [Arquitetura](#arquitetura)
- [Rotas](#rotas)
 - [Rota de usuários](#rota-de-usuários)
 - [Rota de solicitação](#rota-de-solicitação)
- [Modelos](#modelos)
  - [Modelo de usuário](#modelo-de-usuário)
	- [Retorno do modelo usuário](#retorno-do-modelo-usuário)
  - [Modelo de solicitação](#modelo-de-solicitação)
	- [Retorno do modelo solicitação](#retorno-do-modelo-solicitação)
- [Tecnologias](#tecnologias)
  - [Dependências do Projeto](#dependências-do-projeto)
  - [Dependências do Desenvolvimento](#dependências-do-desenvolvimento)
- [Instalação](#instalação)
- [Implementações Futuras](#implementações-futuras)
- [Autora](#autora)
- [Referências](#referências)

---
## Problema
Existem casos na graduação onde alunos não conseguem oportunidades de realizar estágios e finalizam a graduação apenas com o conhecimento teórico, o que acaba 
gerando certa inseurança para entrar no mercado de trabalho.

Em parelelo, aprendemos na graduação a importância de um profissional para orientar quanto as técnicas construtivas. Contudo, há uma resistência da 
população em contratar esse profissional, principalmente a população de baixa renda. 
Muito provávelmente esse público tem outras prioridades em distribuir sua renda e quando surge a necessidade de algum reparo na residência acaba 
fazendo por conta própria. 

---
## Solução
Acredita-se que unir as [dificuldades](#problema) pode ser enriquecedor para as partes envolvidas,
visto que quando uma pessoa encontrar um problema na sua residência, a mesma poderá ser apresentada na **API UP HOUSE STUDENT** 
para que universidades tenham acesso e seus alunos solucionem o assunto posto, juntamente com profissionais recém 
formados (com registro no [CREA](https://www.creasp.org.br/)) e que estejam cursando alguma pós-graduação na área para auxiliar
o discente da graduação com apoio do docente responsável pela disciplina e/ou projeto.

---
## Tema
**UP HOUSE STUDENT** é uma API para área da construção civil voltada ao público de baixa renda.

---
## Arquitetura

Esse projeto foi desenvolvido utilizando a aquitetura MVC, onde pode ser visto na pasta **[src](https://github.com/carolmarquezini/upHouse/tree/main/src)**.

![IntroducaoMVC02](https://user-images.githubusercontent.com/100984525/181695128-a4c3528b-ef2a-4693-be84-db12416f9d4d.jpg)

---
## Heroku

Para acessar essa aplicação utilizar o host: **[http://uphouse.herokuapp.com.br](http://uphouse.herokuapp.com.br)**

---
## Rotas

**Rota de usuários:**

| Método HTTP | Endpoint             | Descrição                                                   | 
| ----------- | ---------------------| ------------------------------------------------------------|
| GET         | `/users/all`         | Retorna todos os cadastrados                                |
| GET         | `/users/userId/:id`  | Retorna usuário por Id                                      |
| POST        | `/users/create `     | Cria um usuário                                             | 
| POST        | `/users/login  `     | Autentica o usuário                                         | 
| PATCH       | `/users/update/:id`  | Altera informações do usuário com base no ID                |
| DELETE      | `/users/delete/:id`  | Remove o usuário com base no ID da criação                  |

### solicitação de um problema:

| Método HTTP | Endpoint              | Descrição                                                   | 
| ----------- | ----------------------| ------------------------------------------------------------|
| GET         | `/upHouse/all`        | Retorna todas as solicitações cadastradas                   |
| GET         | `/upHouse/category`   | Retorna categoria com base no ID da criação                 |
| POST        | `/upHouse/create`     | Cria uma solicitação                                        | 
| PATCH       | `/upHouse/update/:id` | Altera informações da solicitação com base no ID da criação |
| DELETE      | `/upHouse/delete/:id` | Remove uma solicitação com base no ID da criação            |



---
## Modelos
**Modelo de usuário**
```jsx
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    telephone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: new Date()
    },


})

module.exports = mongoose.model("user", userSchema)
```

**Retorno do modelo usuário:**
```
  {
        "_id": "62e083ce60ad4e094f095786",
        "name": "Carol Marquezini",
        "email": "marquezini.carol@email",
        "telephone": 123456789,
        "password": "$2b$10$5lgvlewzhx7ZpWrvtanfLeoHLy1w13PejMYOxPe.lzCcmSeWc9JH.",
        "createAt": "2022-07-27T00:14:15.229Z",
        "__v": 0
    }

```


**Modelo de solicitação**

```jsx
const mongoose = require("mongoose")

const upHouseSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    userId: {
        type: String
    },
    category: { 
        budget: {
            type: Boolean,
            required: false
        },   
        topography: {
            type: Boolean,
            required: false
        },         
        fundation: {
            type: Boolean,
            required: false
        },
        electrical: {
            type: Boolean,
            required: false
        },
        hydraulic: {
            type: Boolean,
            required: false
        },
    },
    description: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: new Date()
    },
})

module.exports = mongoose.model("upHouse", upHouseSchema)
```

**Retorno do modelo da solicitação:**
```
{
    "message": "Solicitação criada com sucesso",
    "savedUpHouse": {
        "userId": "62e0887b194e205684f23db8",
        "category": {
            "budget": true,
            "topography": false,
            "fundation": false,
            "electrical": false,
            "hydraulic": false
        },
        "description": "Solicito um auxilio para realizar o orçamento de uma reforma que desejo fazer na minha casa.",
        "createAt": "2022-07-27T22:57:06.497Z",
        "_id": "62e1c3a609bb099e1af6563d",
        "__v": 0
    }
}

```

---
## Tecnologias

### Dependências do Projeto

- [Bcryptjs](https://www.npmjs.com/package/bcryptjs) - Bcryptjs auxilia criptografar senhas com hash;
- [Cors](https://www.npmjs.com/package/cors) - Cors permite o compatilhamento de dados entre diferentes origens;
- [Dotenv-safe](https://www.npmjs.com/package/dotenv-safes) - Serve para carregar as variáveis de ambiente de um arquivo ```.env```;
- [Express](https://www.npmjs.com/package/express) - O framework para Node.js que fornece recursos mínimos para construção de servidores web;
- [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - Jsonwebtoken cria caracteres codificados e atraves dele o servidor que conhece o código consegue ler o conteudo do token por meio da autenticação;
- [Mongoose](https://www.npmjs.com/package/mongoose) - Mongoose é uma biblioteca que gerencia e relaciona dados.

### Dependências do Desenvolvimento
- [Jest](https://www.npmjs.com/package/jest) - Jest é uma estrutura de test js, através dele é possível realizar os testes;
- [Nodemon](https://www.npmjs.com/package/nodemon) - Nodemon ajuda no desenvolvimento de sistemas com o Node. js reiniciando automaticamente o servidor;
- [Supertest](https://www.npmjs.com/package/jest) - SuperTest automatiza a realização dos testes.


---
## Instalação
1. **git clone** - Clonar o projeto: abra o terminal onde deseja criar uma pasta para armazenar este projeto e execute o seguinte comando

    ```bash
    $ mkdir nomePasta
	
	$ cd nomePasta
  
	$ git init
  
	$ git clone https://github.com/carolmarquezini/upHouse.git
    ``` 
    
3. **npm install** - Escreva a seguinte linha para instalar as dependências utilizadas nesse projeto: 

   ```bash
    $ npm install
    ```
4. **npm run dev** nicie o servidor, utilizando a frase: 

   ```bash
    $ npm run dev
    ```  
---
## Implementações Futuras

- Conexão direta entre solicitante e universidade;
- Controle de fluxo da solicitação (não atendida, em andamento e concluida);
- Teste unitário;
- Autenticação de todas as rotas.


--- 
## Autora

<a href="https://www.linkedin.com/in/carolainemarquezini" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a>

![FOTO](https://user-images.githubusercontent.com/100984525/181692435-1f6fd859-60cd-4541-b2ad-93b1b842da3a.jpeg)


---
## Referências

- https://github.com/flutter/flutter
- https://github.com/andreacf86/Projeto-Final-Trata-casinha
