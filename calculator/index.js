$(document).ready(function(){
  var textArr= ["AC","CE","%","/","7","8","9","*","4","5","6","-","1","2","3","+",".","0","Ans","="];
  var html = "";
  var lastResult=null;
  

  //generate html for each button
  var btnsHtml = function(val,index,arr){
    switch (val) {
      case "AC":
        id = "ac";
        break;
      case "CE":
        id = "ce";
        break;
      case "Ans":
        id = "ans";
        break;
      case "=":
        id = "equal";
        break;
      default:
        id="show-"+index;
        break;
    }
    return '<button id="'+id+'" class="btn btn-lg">'+val+'</button>';
  }
  var btnsArr = textArr.map(btnsHtml);
  var start = 0;
  var end = 4;
  
  //generate whole calculator html
  for(var i=0;i<5;i++)
  {
    html+= '<div class="btnsRow">';
    var sliceArr = [];
    sliceArr = btnsArr.slice(start,end);
    html+=sliceArr.join('');
    html+='</div>';
    start+=4;
    end+=4;
  }
  $("#btns").html(html);
  $(".btnsRow").each(function(){
    $(this).find("button:last").addClass("last");
  })

  //implement actions for each button
  $("#calContainer").on("submit",function(){
    return false;
  });
  $("#btns button").each(function(){
    $(this).on("click",function(){
      var id = $(this).attr("id");
      switch (id) {
        case "ac":
          $('input[name="calInput"]').val("");
          lastResult=null;
          break;
        case "ce":
          var str = $('input[name="calInput"]').val();
          var arr = str.split('');
          arr.pop();
          var a=arr.join("");
          $('input[name="calInput"]').val(a);
          break;
        case "ans":
          var str = $('input[name="calInput"]').val();
          $('input[name="calInput"]').val(str+lastResult.toString());
          break;
        case "equal":
          var str = $('input[name="calInput"]').val();
          $('input[name="calInput"]').val(eval(str).toString());
          lastResult=eval(str);
          break;
        default:
          var str = $('input[name="calInput"]').val();
          $('input[name="calInput"]').val(str+$(this).text());
          break;
      }
    });
  });

})