
$(document).ready(function(){
	
	$("#searchForm").submit(function(){
		var game = $("input[name=search]").val();
		$.ajax({
			headers: {
		        'Client-ID':'uo6dggojyb8d6soh92zknwmi5ej1q2',
		        'Accept':'application/vnd.twitchtv.v5+json'
		    },
			type:"get",
			dataTpe:"json",
			url:"https://api.twitch.tv/kraken/clips/top?limit=5&game="+game,
			success:function(data){
				var clipList = data.clips;
				console.log(clipList);
				var html='';
				for(var i=0;i<clipList.length;i++){
					html += '<li class="jumbotron"><h3>'+clipList[i].title+'</h3><div>'+clipList[i].embed_html+'</div></li>';
				}
				$("#resultsList").html(html);
			}
		});
		return false;	
	});


});

