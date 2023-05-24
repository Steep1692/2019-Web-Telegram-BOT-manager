new Vue({
  el: '#Log-In',
  data: {
    title: "Добро пожаловать",
    token: "Токен",
    nobot: "Нет бота",
    link: "Кликните здесь",
    submit: "Авторизироваться"
  },
  methods:{
    eng(){
      lang= !lang;
      this.title = "Welcome";
      this.token = "Token";
      this.nobot = "Don't have a bot";
      this.link = "Click here";
      this.submit = "Log in";
    },
    rus(){
      lang= !lang;
      this.title = "Добро пожаловать";
      this.token = "Токен";
      this.nobot = "Нет бота";
      this.link = "Кликните здесь";
      this.submit = "Авторизироваться";
    }
  }
});
