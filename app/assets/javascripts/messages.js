$(function(){
  function buildMessage(message){
    img = (message.image) ? `<img class= "lower-message__image" src=${message.image} >` : "";
    var html = `<div class="message" data-message-id="${message.id}">
                <div class="upper-message">
                <div class="upper-message__user-name">
                  ${message.user_name}
                </div>
                <div class="upper-message__date">
                  ${message.date}
                </div>
                </div>
                <div class="lower-message">
                <p class="lower-message__content">
                  ${message.content}
                </p>
                ${img}
                </div>
                </div>`
    return html;
  }
  $("#new_message").on("submit", function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
   
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
  .done(function(data){
      var html = buildMessage(data);
      $('.messages').append(html)
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $("form")[0].reset();
    })
  .fail(function(){
    alert('error');
    })
  })

  var reloadMessages = function () {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message:last').data("message-id"); 

      $.ajax({ 
        url: "api/messages", 
        type: 'get', 
        dataType: 'json', 
        data: {last_id: last_message_id} 
      })
      .done(function (messages) {
        var insertHTML = '';
        messages.forEach(function (message) {
          insertHTML = buildMessage(message); 
          $('.messages').append(insertHTML);
        })
        if (messages.length > 0){
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        }
      })
      .fail(function () {
        alert('自動更新に失敗しました');
      });
    }
  };
  setInterval(reloadMessages, 5000);
});