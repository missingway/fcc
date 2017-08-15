$(document).ready(function() {

	var board = [];
	var html = "";
	for(var i=0;i<9;i++){
		board.push("0");
		html+='<div id="point-'+i+'" class="col-xs-4 chessPoint"></div>';
	};
	$("#board").append(html);
	$(".chessPoint").mouseover(function(){
		$(this).css({"background-color":"#FF0033"});
	}).mouseout(function(){
		$(this).css({"background-color":"black"});
	});

	$('#myModal').modal({
		backdrop: 'static', 
		keyboard: false
	});
	var person = '';
	$("#btnX,#btnO").on('click',function(){
		$(".chessPoint").text("");
		person = $(this).text();
		$('#myModal').modal('hide');

		if(person === "X"){
		pc = "O";
		}else{
			pc = "X";
		}
		var firstPlayer = pc;
		var currentPlayer = firstPlayer;

		//pc first step
		var r = Math.floor(Math.random()*9);
		while(board[r]==='0'){
			board[r] = currentPlayer;
			$("#point-"+r.toString()).text(currentPlayer);
		}
		currentPlayer=person;	
		
	});
	
	
	

	
	
	
	var win = function(board){
			var winner = "nowin";
			if(board[0]===board[1] && board[1]===board[2]){
				if(board[0]!=="0"){
					winner = board[0];	
				}	 
			}
			if(board[3]===board[4] && board[4]===board[5]){
				if(board["3"]!=="0"){
					winner = board[3];	
				}	
			}
			if(board[6]===board[7] && board[7]===board[8]){
				if(board[6]!=="0"){
					winner = board[6];	
				}	
			}
			if(board[0]===board[3] && board[3]===board[6]){
				if(board[0]!=="0"){
					winner = board[0];	
				}	
			}
			if(board[1]===board[4] && board[4]===board[7]){

				if(board[1]!=="0"){
					winner = board[1];	
				}	
			}
			if(board[2]===board[5] && board[5]===board[8]){
				if(board[2]!=="0"){
					winner = board[2];	
				}	
			}
			if(board[0]===board[4] && board[4]===board[8]){
				if(board[0]!=="0"){
					winner = board[0];	
				}	
			}
			if(board[2]===board[4] && board[4]===board[6]){
				if(board[2]!=="0"){
					winner = board[2];	
				}	
			}
			return winner;
		}

	var pc_rules = function(board){
		var emptyPlaces = [];
		for(var i=0;i<board.length;i++){
			if(board[i]==='0'){
				emptyPlaces.push(i);
			}
		}

		var winArr=[];
		var point;
		var place;
		for(var i=0; i<emptyPlaces.length;i++){
			if (emptyPlaces[i]===0) {
				if(board["1"]===board["2"] && board["1"]===pc){
					place = 0;
					break;
				}
				if(board["3"]===board["6"] && board["6"]===pc){
					place = 0;
					break;
				}
				if(board["4"]===board["8"] && board["8"]===pc){
					place = 0;
					break;
				}

				if(board["1"]===board["2"] && board["1"]===person){
					point = parseInt(emptyPlaces[i]);
					winArr.push(point);
				}
				if(board["3"]===board["6"] && board["3"]===person){
					point = parseInt(emptyPlaces[i]);
					winArr.push(point);
				}
				if(board["4"]===board["8"] && board["4"]===person){
					point = parseInt(emptyPlaces[i]);
					winArr.push(point);
				}
			}
			if (emptyPlaces[i]===1) {
				if(board["0"]===board["2"] && board["2"]===pc){
					place = 1;
					break;
				}
				if(board["4"]===board["7"] && board["7"]===pc){
					place = 1;
					break;
				}
				if(board["0"]===board["2"] && board["2"]===person){
					point = parseInt(emptyPlaces[i]);
					winArr.push(point);
				}
				if(board["4"]===board["7"] && board["4"]===person){
					point = parseInt(emptyPlaces[i]);
					winArr.push(point);
				}
			}
			if (emptyPlaces[i]===2) {
				if(board["0"]===board["1"] && board["1"]===pc){
					place = 2;
					break;
				}
				if(board["5"]===board["8"] && board["8"]===pc){
					place = 2;
					break;
				}
				if(board["4"]===board["6"] && board["6"]===pc){
					place = 2;
					break;
				}
				if(board["0"]===board["1"] && board["1"]===person){
					point = parseInt(emptyPlaces[i]);
					winArr.push(point);
				}
				if(board["5"]===board["8"] && board["5"]===person){
					point = parseInt(emptyPlaces[i]);
					winArr.push(point);
				}
				if(board["4"]===board["6"] && board["4"]===person){
					point = parseInt(emptyPlaces[i]);
					winArr.push(point);
				}
			}
			if (emptyPlaces[i]===3) {
				if(board["0"]===board["6"] && board["6"]===pc){
					place = 3;
					break;
				}
				if(board["0"]===board["6"] && board["6"]===person){
					point = parseInt(emptyPlaces[i]);
					winArr.push(point);
				}
				if(board["4"]===board["5"] && board["5"]===person){
					point = parseInt(emptyPlaces[i]);
					winArr.push(point);
				}
			}
			if (emptyPlaces[i]===4) {
				if(board["1"]===board["7"] && board["1"]===pc){
					place = 4;
					break;
				}
				if(board["1"]===board["7"] && board["7"]===person){
					point = parseInt(emptyPlaces[i]);
					winArr.push(point);
				}
				if(board["3"]===board["5"] && board["5"]===person){
					point = parseInt(emptyPlaces[i]);
					winArr.push(point);
				}
				if(board["2"]===board["6"] && board["6"]===person){
					point = parseInt(emptyPlaces[i]);
					winArr.push(point);
				}
				if(board["0"]===board["8"] && board["8"]===person){
					point = parseInt(emptyPlaces[i]);
					winArr.push(point);
				}
			}
			if (emptyPlaces[i]===5) {
				if(board["2"]===board["8"] && board["8"]===pc){
					place = 5;
					break;
				}
				if(board["3"]===board["4"] && board["4"]===pc){
					place = 5;
					break;
				}
				if(board["2"]===board["8"] && board["8"]===person){
					point = parseInt(emptyPlaces[i]);
					winArr.push(point);
				}
				if(board["3"]===board["4"] && board["4"]===person){
					point = parseInt(emptyPlaces[i]);
					winArr.push(point);
				}
			}
			if (emptyPlaces[i]===6) {
				if(board["0"]===board["3"] && board["3"]===pc){
					place = 6;
					break;
				}
				if(board["7"]===board["8"] && board["8"]===pc){
					place = 6;
					break;
				}
				if(board["2"]===board["4"] && board["4"]===pc){
					place = 6;
					break;
				}

				if(board["0"]===board["3"] && board["3"]===person){
					point = parseInt(emptyPlaces[i]);
					winArr.push(point);
				}
				if(board["7"]===board["8"] && board["8"]===person){
					point = parseInt(emptyPlaces[i]);
					winArr.push(point);
				}
				if(board["2"]===board["4"] && board["4"]===person){
					point = parseInt(emptyPlaces[i]);
					winArr.push(point);
				}
			}
			if (emptyPlaces[i]===7) {
				if(board["1"]===board["4"] && board["4"]===pc){
					place = 7;
					break;
				}
				if(board["6"]===board["8"] && board["8"]===pc){
					place = 7;
					break;
				}

				if(board["1"]===board["4"] && board["4"]===person){
					point = parseInt(emptyPlaces[i]);
					winArr.push(point);
				}
				if(board["6"]===board["8"] && board["8"]===person){
					point = parseInt(emptyPlaces[i]);
					winArr.push(point);
				}
			}
			if (emptyPlaces[i]===8) {
				if(board["2"]===board["5"] && board["5"]===pc){
					place = 8;
					break;
				}
				if(board["6"]===board["7"] && board["7"]===pc){
					place = 8;
					break;
				}
				if(board["0"]===board["4"] && board["4"]===pc){
					place = 8;
					break;
				}
				if(board["2"]===board["5"] && board["5"]===person){
					point = parseInt(emptyPlaces[i]);
					winArr.push(point);
				}
				if(board["6"]===board["7"] && board["7"]===person){
					point = parseInt(emptyPlaces[i]);
					winArr.push(point);
				}
				if(board["0"]===board["4"] && board["4"]===person){
					point = parseInt(emptyPlaces[i]);
					winArr.push(point);
				}
			}

			var x = winArr.length;
			if(x>0){
				place = winArr[Math.floor(Math.random()*x)];	
			}
			else{
				var y = emptyPlaces.length;
				place = emptyPlaces[Math.floor(Math.random()*y)];	
			}
		}
		if(board[place]==='0'){
			board[place] = currentPlayer;
			var myid = "#point-"+place;
			$(myid).text(currentPlayer);
		}

		return;
	}


	$(".chessPoint").on('click',function(){
			if($(this).text()!==""){
				return;
			}
			//person step
			currentPlayer=person;
			var id = $(this).attr("id");
			var position = parseInt(id[id.length-1]);
			if(board[position]==="0") {
				board[position] = currentPlayer;
				$(this).text(currentPlayer);
			}

			var winner = win(board);
			if(winner===person){
				$('#myModal h3').text("You win! Try again.");
				$('#myModal').modal('show');
				board=["0","0","0","0","0","0","0","0","0"];
				return;
			}
			if(board.indexOf("0")==-1){
				$('#myModal h3').text("A tie! Try again.");
				$('#myModal').modal('show');
				board=["0","0","0","0","0","0","0","0","0"];
				return;
			}

			//pc step
			currentPlayer=pc;
			pc_rules(board);
			winner = win(board);
			if(winner===pc){
				$('#myModal h3').text("Computer Win! Try again.");
				$('#myModal').modal('show');
				board=["0","0","0","0","0","0","0","0","0"];	
				return;
			}
			if(board.indexOf("0")==-1){
				$('#myModal h3').text("A tie! Try again.");
				$('#myModal').modal('show');
				board=["0","0","0","0","0","0","0","0","0"];
				return;
			}
	});
	
	

});