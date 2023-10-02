O teste consiste em criar uma aplicação que expõe uma API REST de um CRUD de produtos e autenticação, e uma aplicação web contendo uma interface para login e acesso a dados de uma API externa. 

Depois de logado, o usuário da aplicação web deve poder acessar os dados da [Punk API v2](https://punkapi.com/). 

## Tecnologias utilizadas:
▪️ React e CSS Module no Front End <br/>
▪️ Firebase para autenticação <br/>
▪️ Node no Back End <br/>
▪️ com a biblioteca express + Firestore para a criação da API

## Sobre o Projeto:

### Front-end 🎨
O Front-end foi desenvolvido em Mobile First usando React e CSS Module.<br/>
A Autenticação foi implementada com Firebase e existe a possibilidade de cadastrar e entrar com login e senha ou utilizando uma conta google.<br/>
Mensagens de erro foram implementadas nas telas de login e cadastro.<br/>
Ao logar o usuário tem acesso aos dados da Punk Api exibidos por padrão em uma ordenação de maior para menor IBU (amargor da cerveja), podendo também serem exibidos em uma ordenação de maior para menor ABV (teor alcoólico).

### Back-end 💻 - incompleto -
O Back-End foi desenvolvido em Node, utilizando a biblioteca Express e o Firestore para armazenamento dos dados. <br/>
Para fazer requisições para a API o usuário deve possuir um token de autenticação gerado pelo Front End no momento de login, deixando os dados protegido apenas a quem tiver uma conta na aplicação.
  
