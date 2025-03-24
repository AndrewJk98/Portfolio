console.log("HELP");
$(function(){
  $("#git_photo").on({ mouseenter: function(){
    $(this).attr('src','img/life.png');
  },
  mouseleave: function(){
    $(this).attr('src','img/life copy.png');
  }
  });



  $("#bash_photo").on({ mouseenter: function(){
    $(this).attr('src','img/lifeline.png');
  },
  mouseleave: function(){
    $(this).attr('src','img/lifeline copy.png');
  }
  });
  


  $("#github_photo").on({ mouseenter: function(){
    $(this).attr('src','img/love copy.png');
  },
  mouseleave: function(){
    $(this).attr('src','img/love copy 2.png');
  }
  });
});