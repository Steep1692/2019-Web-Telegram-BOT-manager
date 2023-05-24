<div id="Log-In">
<div id="Log-In-Header"><span id="Log-In-span-title">{{title}}</span></div>
<img id="Log-In-Img" src="img/Log-in-img.png" alt="Splash">
<br>
<span id="Log-in-span-token">{{token}}: </span>
<input id="Log-In-Text" type="text"
value="646548438:AAGZthHSc9BA_PH2Myug3TTxiYuXizKxf4c" placeholder="API-токен бота">
<br>
<span id="Log-In-span-nobot" >{{nobot}}? </span><a id="Log-In-link" href="https://telegram.me/botfather">{{link}}</a>
<br>
<button id="Log-In-Btn" onclick="set_token()">{{submit}}</button>
<img id="Log-In-img-lang" v-if="lang" @click="eng" src="img/eng.png" alt="To english" title="Switch to english language">
<img id="Log-In-img-lang" v-if="!lang" @click="rus" src="img/rus.png" alt="To russian" title="Переключиться на русский язык">
</div>
<div id="Log-In-footer">
<a id="Log-in-span-author" href='http://vk.com/steep1692'>@ by Steep 2019</a>
</div>
<script src="js/vue.js"></script>
<script src="js/lang.js"></script>
