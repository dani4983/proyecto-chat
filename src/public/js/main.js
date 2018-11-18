$(function () {
   const socket = io();
//obteniendo elementos del DOM desde la interfaz
    const $messageForm = $('#message-form');
    const $messageBox = $('#message');
    const $chat = $('#chat');

//obteniendo elementos del DOM desde el nicknameForm
    const $nickForm = $('#nickForm');
    const $nickError = $('#nickError');
    const $nickname = $('#nickname');

    const $users = $('#usernames');

    $nickForm.submit(e => {
      e.preventDefault();
      socket.emit('new user', $nickname.val(), data => {
         if(data) {
            $('#nickWrap'). hide();
            $('#contentWrap'). show();
         } else {
            $nickError. html(`
               <div class="alert alert-danger">
               Este usuario ya existe</div>
            `)
         }
         $nickname.val('');
      })
   })

   //eventos

   $messageForm.submit( e => {
      e.preventDefault();
      socket.emit('send message', $messageBox.val(), data => {
         $chat.append(`<p class="error">${data}</p>`)
      }),
      $messageBox.val('');
   });

   socket.on('new message', function (data) {
      $chat.append('<b>'+ data.nick + '</b>: ' + data.msg + '<br/>');
   });
   socket.on('usernames', data => {
      var html = '';
      for (let i = 0; i < data.length; i++) {
         html += `<p><i class="fas fa-user"></i> ${data[i]}</p>`
      }
      $users.html(html);
   });
   socket.on('whisper',data => {
      $chat.append(`<p class="whisper"><i class="fas fa-user-secret"></i><b> ${data.nick}:</b> ${data.msg}</p>`)
   })
});
