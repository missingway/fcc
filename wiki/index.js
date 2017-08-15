$(document).ready(function(){
	
	$("#searchForm").submit(function(){
		var title = $("input[name=search]").val();
		var api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
		var cb = '&callback=JSON_CALLBACK';
		$.ajax({
			type:"get",
			url:api + title + cb,
			dataType:"jsonp",
			success:function(data){
				
				var pagesList = data.query.pages;
				var html='';
				var page = 'https://en.wikipedia.org/?curid=';
				for(key in pagesList){
					console.log(key);
					var extract = pagesList[key].extract;
					var title = pagesList[key].title;
					var page = page + pagesList[key].pageid;
					html += '<li class="jumbotron"><h3>'+title+'</h3><p>'+extract+'</p><a class="more" target="_blank" href="'+page+'">view more...</a></li>';
				}
				$("#resultsList").html(html);
				$("#resultsList li").on("mouseover",
					function(){
						$(this).css({"background":"#ffffcc"});
					}
					).on("mouseout",
					function(){
						$(this).css({"background":"#eee"});
					}
				);
			}
		});
		return false;	
	});


});

