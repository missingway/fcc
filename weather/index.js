$(document).ready(function(){

	var ip = '123.125.71.38';
	var url = 'https://v.juhe.cn/weather/ip?dtype=json&format=2&key=f341f8d1ff0ce7e7fbf9411d6bcbf8be&ip='+ip;
	var getWeatheByIP = function(url){
		$.ajax({
			type:"get",
			url:url,
			dataType:"jsonp",
			success:function(data){
				var today = data.result.today;
				var html = '';
				html+='<li><h3>今日天气</h3></li>';
				html+='<li class="today"><span>城市:</span>'+today.city+'</li>';
				html+='<li class="today"<span>日期:</span>'+today.date_y+'  '+today.week+'</li>';
				html+='<li class="today"><span>风力:</span>'+today.wind+'</li>';
				html+='<li class="today"><span>穿衣建议:</span>'+today.dressing_advice+'</li>';
				html+='<li class="clearfix">&nbsp;</li>';
				html+='<li class="today"><span>穿衣指数:</span>'+today.dressing_index+'</li>';
				html+='<li class="today"><span>外出指数:</span>'+today.travel_index+'</li>';
				html+='<li class="today"><span>锻炼指数:</span>'+today.exercise_index+'</li>';
				html+='<li class="clearfix">&nbsp;</li>';
				$('#resultsList').append(html);

				var future = data.result.future;
				var html = '';
				html += '<li><h3>未来天气</h3></li>';
				html += '<li>';
				for(var i=1;i<future.length;i++){
					html+='<ul class="future pull-left">';
					html+='<li><h5>第'+i.toString()+'天</h5></li>';
					html+='<li><span>日期：</span>'+future[i].date+'  '+future[i].week+'</li>';
					html+='<li><span>气温：</span>'+future[i].temperature+'</li>';
					html+='<li><span>天气：</span>'+future[i].weather+'</li>';
					html+='<li><span>风力：</span>'+future[i].wind+'</li>';		
					html+='</ul>';
				}
				html+='<div class="clearfix"></div></li>';
				$('#resultsList').append(html);
				$('.future:first').addClass('first');
				$('.future:last').addClass('last');
			}
		});
	}
	$('#ipForm').on('submit',function(){
		if($('#ipInput').val()!=''){
			ip=$('#ipInput').val();
		}
		$('#resultsList').html('');
		var url = 'https://v.juhe.cn/weather/ip?dtype=json&format=2&key=f341f8d1ff0ce7e7fbf9411d6bcbf8be&ip='+ip;
		getWeatheByIP(url);
		return false;
	});
	
	getWeatheByIP(url);
	
	

});

