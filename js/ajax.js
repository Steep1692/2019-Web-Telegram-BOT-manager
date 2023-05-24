// IDEA: https://api.telegram.org/bot646548438:AAGZthHSc9BA_PH2Myug3TTxiYuXizKxf4c/getChat?chat_id=656438792

//Variables
var token,user_id,lang=true;
var chat=new Object();
var list= new Array();
//Start
function start(){
  $.ajax({
    url: "Log-in.php",
    success: function(data){
      $('body').html(data);
    }
  });
}
$('body').onload = start();
//Functions
//UNIX time to d:m:y d:m:i
function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Янв','Фев','Мар','Апр','Мая','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}
//Set token
function set_token(rus){
token=document.getElementById("Log-In-Text").value;
document.getElementById('Log-In-Btn').disabled=true;
$.ajax({
  contentType: "application/json; charset=utf-8",
  url:'https://api.telegram.org/bot'+token+'/getme',
  dataType: 'json',
  complete: function () {
    document.getElementById('Log-In-Btn').disabled=false;
  },
  error: function() {
    {
      document.getElementById('Log-In-Text').style.borderBottomColor= 'red';
      document.getElementById('Log-In-Img').src='img/Log-in-img-error.png';
      setTimeout(function(){
        document.getElementById('Log-In-Text').style.borderBottomColor= 'blue';
        document.getElementById('Log-In-Img').src='img/Log-in-img.png';
      },3000);
    }
  },
  success: function(data){
      var getme= new Object();
      getme = data;
      if(data['ok']){
        document.getElementById('Log-In-Img').src='img/Log-in-img-success.png';
        $.ajax({
          url:'App.php',
          success: function(data){
          lang=$('#lang').text();
          $('#Log-In').remove();
          $('body').html(data);
          $('#List-header-span').html(getme.result['first_name']);
          $('#bd').onload=get_list();
          }
          });
          }
          }
          });
}
//Get chat-list
function get_list(){
$.ajax({
  contentType: "application/json; charset=utf-8",
  url:"https://api.telegram.org/bot"+token+"/getupdates",
  dataType: 'json',
  success: function (data){
      $('#List-Box').html('');
      for(var i=data.result.length-1; i > -1; i--){
      if(list.indexOf(data.result[i].message["from"]["id"])==-1){
        list.push(data.result[i].message["from"]["id"]);
        $('#List-Box').append('<li><button id="List-Box-User" onClick=get_chat('+
        data.result[i].message["from"]["id"]+')><div id="List-Box-Avatar"></div><span id="List-Box-Name">'+
        data.result[i].message['from']['first_name']+'<br></span><span id="List-Box-Msg">'+
        data.result[i].message['text'].substring(0,10)+'</span><span id="List-Box-Date">'+
        timeConverter(data.result[i].message['date'])+
        '</span></button></li>');
        $.ajax({
          contentType: "application/json; charset=utf-8",
          url:"https://api.telegram.org/bot"+token+"/getChat",
          data: ({chat_id:data.result[i].message["from"]["id"]}),
          dataType: 'json',
          success: function (data){
            var getChat= new Object();
            getChat = data;
            $.ajax({
              contentType: "application/json; charset=utf-8",
              url:"https://api.telegram.org/bot"+token+"/getFile",
              data: ({file_id:data.result.photo['small_file_id']}),
              dataType: 'json',
              success: function (data){
                $.ajax({
                  url:"https://cors-anywhere.herokuapp.com/https://api.telegram.org/file/bot"+token+"/"+data.result['file_path'],
                  data:({file_id:data.result['file_id'], file_size:data.result['file_size']}),
                  success: function (data){
                    $('#List-Box-Avatar').append('<p>Here is avatar</p>');
                        }
                        });
                    }
                    });
                }
                });
        }
        }
        }
        });
}
//Get chat
function get_chat(id){
  $.ajax({
    contentType: "application/json; charset=utf-8",
    url:"https://api.telegram.org/bot"+token+"/getupdates",
    dataType: 'json',
    success: function (data){
      user_id=id;
      if(!(JSON.stringify(data)===JSON.stringify(chat))){
        $('#Chat-Box').html('');
        $('#Chat-Box').append('<div id="Msg-Box"></div>');
        for(var i=0; i < data.result.length; i++){
          if(data.result[i].message["from"]["id"]==id){
            $('#Chat-header').html('<span id="Chat-header-span">'
            +data.result[i].message["from"]["first_name"]+'</span>');
            $('#Msg-Box').append(
            '<div id="Msg-Box-Msg" class="'+data.result[i].message['message_id']+'"><span id="Msg-Box-Text">'+
            data.result[i].message['text']+'</span><span id="Msg-Box-Date">'+
            timeConverter(data.result[i].message['date'])+
            '</span></div>');
            }
            }
        $('#Chat-Box').append('<div id="Input-Box"><textarea id="Input-Box-Text" placeholder="Напишите сообщение...">'
        +'</textarea><span id="Input-Box-Btn" onclick="send_msg('+id+')">Отправить</span></div>');
        $('#Msg-Box').scrollTop(9999);
        }else return;
        chat=data;
        }
        });
}
//Send message
function send_msg(id){
var text=document.getElementById("Input-Box-Text").value;
$.ajax({
  type:'POST',
  url:"https://api.telegram.org/bot"+token+"/sendmessage",
  data:({chat_id:id,text:text}),
  dataType: 'json',
  success: function(data){
    if(data['ok']){
      var date = new Date();
      $('#Msg-Box').append('<li id="Msg-Box-li"><br><font id="Msg-Box-Text">Вы : '+
      text+'</font><font id="Msg-Box-Date">'+
      date+'</font></li><br>');
      document.getElementById("Input-Box-Text").value="";
      $('#Msg-Box').scrollTop(9999);
      }
      }
      });
}
function set_fade(){
  var fade= document.getElementById("Fade-Box");
  if(fade.style.display=='block'){
    fade.style.display= 'none';
  }else{
    fade.style.display= 'block';
  }
}
//Get information about user or bot
function get_info(selector){
  $('#Info-Box').html('');
  if(selector=="bot"){
    set_fade();
    $.ajax({
      contentType: "application/json; charset=utf-8",
      url:'https://api.telegram.org/bot'+token+'/getme',
      dataType: 'json',
      success: function(data){
        $('#Info-Box').html('First name: '+data.result['first_name']
        +'<br>ID: '+data.result['id']+'<br>Username: '+data.result['username']);
      }
    });
  }else if(selector=="user"){
    set_fade();
    $.ajax({
      contentType: "application/json; charset=utf-8",
      url:'https://api.telegram.org/bot'+token+'/getupdates',
      dataType: 'json',
      success: function(data){
        for(var i=data.result.length-1;i > -1; i--){
          if(data.result[i].message['from']['id']==user_id){
            $('#Info-Box').html('First name: '+data.result[i].message['from']['first_name']
            +'<br>ID: '+data.result[i].message['from']['id']
            +'<br>Username: '+data.result[i].message['from']['username']);
            i=-1;
          }
          }
        }
    });
  }
}
