function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


$(document).ready(function(){
	var getQuote = function(){
		$.ajax({
		    headers: {
		      "X-Mashape-Key": "OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V",
		      Accept: "application/json",
		      "Content-Type": "application/x-www-form-urlencoded"
		    },
		    url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=',
		    success: function(r) {
		    	$("#quote q").html(r.quote);
		    	$("#quote q").fadeTo(3000,1);
		    	$("#author").html("- "+r.author);
		    	$("#author").fadeTo(3000,1);
		    }
		});
	}

	var pageInit = function(){
		var mycolor = getRandomColor();
		$("#page").css({"background-color":mycolor,"color":mycolor,}).fadeIn(2000);
		$("q").css("border-color",mycolor);
		$("button").css({"color":"#fff","background-color":mycolor});
		getQuote();
	}
    $("#newQuote").click(function(){
    	$("#quote q,#author").html(" ");
    	$("#page").fadeOut(400,function(){pageInit();});	
    });
	pageInit();
});
