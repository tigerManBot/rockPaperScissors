//main function that plays a game of rock paper scissors
function game() 
{
	console.log("It's time to play the world's oldest game, Rock Paper Scissors\n");

	let playerPoints = 0;
	let computerPoints = 0;
	let roundResult;
	let playerMove, computerMove;
	let roundTotal = +prompt("Enter the number of rounds you would like to play: ");

	for (let round = 1; round <= roundTotal; round++) 
	{
		printRoundAndCurrentScore(round, playerPoints, computerPoints);

		playerMove = getPlayerMove();
		if (playerMove === undefined) 
			return;

		computerMove = getComputerMove();
		if (computerMove === "")
			return;
			
		console.log(`Player: ${playerMove}, Computer: ${computerMove}\n`);

		roundResult = getRoundResult(playerMove, computerMove);
		printRoundResult(roundResult, playerMove, computerMove);

		if (roundResult === 0) 
			computerPoints++;
		else if (roundResult === 1) 
			playerPoints++;
	}
	
	//totals the points from all rounds
	let gameResult = getGameResult(playerPoints, computerPoints);
	printGameResult(gameResult, playerPoints, computerPoints);
}

//function to print round and scores
function printRoundAndCurrentScore(round, playerPoints, computerPoints) 
{
	console.log(`\nRound: ${round}\tPlayer Score: ${playerPoints}\tComputer Score: ${computerPoints}`);
}

/*
getPlayerMove returns the player's move.
	-the function prompts the player to enter their move and validates their input,
	re-prompting as necessary
*/
function getPlayerMove() 
{
	let playerMove = prompt("Enter your move: ")

	if (playerMove == null) 
	{
		console.log("\nExiting.");
		return;
	}

	playerMove = playerMove.toLowerCase();

	if (playerMove != "rock" && playerMove != "scissors" && playerMove != "paper") 
	{
		console.log("\nYour move must be rock/paper/scissors, try again.\n");
		return getPlayerMove();
	}

	return playerMove;
}

/*
getComputerMove returns the computer's move.
	-Possible moves are rock/paper/scissors stored into an array of strings
	-the move is selected by generating a random number that corresponds to the array index
*/
function getComputerMove() 
{
	const possibleMoves = ["rock", "paper", "scissors"];
	let computerMove;
	let randNum = Math.floor(Math.random() * possibleMoves.length);

	switch(randNum) 
	{
		case 0:
			computerMove = possibleMoves[0];
			break;
		case 1:
			computerMove = possibleMoves[1];
			break;
		case 2:
			computerMove = possibleMoves[2];
			break;
		default:
			computerMove = "";
			console.log("Error, random number out of valid range [0-2]. Random number = ", randNum);
	}

	return computerMove;

}

/*
getRoundResults returns an integer that represents the round's result
	-1 = tie game
	0 = computer victory
	1 = player victory
*/
function getRoundResult(playerMove, computerMove) 
{
	let roundResult;
	if (playerMove === computerMove) //this round is a tie
		return -1;
	
	//rock beats scissors, loses to any other possibility
	if (playerMove[0] === 'r') 
		roundResult = (computerMove[0] === 's') ? 1 : 0;

	if (playerMove[0] === 'p') 
		roundResult = (computerMove[0] === 's') ? 0 : 1;

	if (playerMove[0] === 's') 
		roundResult = (computerMove[0] === 'r') ? 0 : 1;

	return roundResult;
}

//function to print the round result
function printRoundResult(roundResult, playerMove, computerMove) 
{
	let resultMsg;
	switch(roundResult) 
	{
		case -1:
			resultMsg = `Tie! ${playerMove} ties ${computerMove}`;
			break;
		case 0:
			resultMsg = `You lose. ${computerMove} beats ${playerMove}`;
			break;
		case 1:
			resultMsg = `You win! ${playerMove} beats ${computerMove}`;
			break;
		default:
			console.log("Error in printRoundResult. Invalid result. round result = ", roundResult);
			resultMsg = "";
	}
	console.log(resultMsg);
}

/* function returns an integer based on the point totals if each player
		-1 if the players have the same amount of points
		0 if the computer won
		1 if the player won
*/

function getGameResult(playerPoints, computerPoints) 
{
	let gameResult;

	if (playerPoints > computerPoints)
		gameResult = 1;
	else if (playerPoints < computerPoints)  
		gameResult = 0;
	else
		gameResult = -1;
	
	return gameResult;
}

function printGameResult(gameResult, playerPoints, computerPoints) 
{
	let endMsg;

	console.log(`\n\nGame Over.\tPlayer Score: ${playerPoints} Computer Score: ${computerPoints}\n`);

	if (gameResult === -1)
		endMsg = "Tie game!";
	else if (gameResult === 0)
		endMsg = "Computer victory... ... ... Our machine overlords have taken over... .... ...";
	else
		endMsg = "Player Victory! There is hope for humanity afterall!";
	
	console.log(endMsg);
}
		
game();







