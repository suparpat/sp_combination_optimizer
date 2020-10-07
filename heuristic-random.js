/*
	Idea
	1. Generate X random permutations
	2. Calculate cash required for each permutation
	3. Pick best permutation
*/

let target = 500
let randomTotal = 1000000
let prices = [425, 105, 185, 185, 185, 98, 145, 155, 125, 125, 135, 295, 295, 155, 125]

let randoms = []
let best_group = []
let best_over_by = Infinity;

let submitBtn = document.getElementById('submit')
let input = document.getElementById('input')
let targetInput = document.getElementById('target')

submitBtn.addEventListener('click', function(){
	let formattedTarget = parseInt(targetInput.value)
	let data = input.value
	let formatted = data.split(",").map((e) => parseInt(e))
	target = formattedTarget
	prices = formatted
	console.log(prices)
	start()
})

function start(){
	randoms = []
	best_group = []
	best_over_by = Infinity
	let inOrder = print(prices)
	console.log('in given order: ')
	console.log(inOrder)

	console.log('generateRandoms')
	generateRandoms()
	console.log('findBestGroup')
	findBestGroup()

	let optimized = print(best_group)
	console.log('optimized solution')
	console.log(optimized)

	console.log(`cash over: ${best_over_by}`)

	output.innerHTML = `<h1>In given order:</h1>
	<p>over: ${inOrder.over_by}</p>
	<pre>${inOrder.str}</pre>`

	output.innerHTML += `<h1>Optimized order:</h1>
	<p>over: ${optimized.over_by}</p>
	<pre>${optimized.str}</pre>`
}

function print(arr){
	let over_by = 0
	let sum = 0
	let str = ''

	for(let i = 0; i < arr.length; i++){
		if(sum == 0){
			str += arr[i]			
		}else{
			str += ' + ' + arr[i]
		}
		sum += arr[i]

		if(sum >= target){
			over_by += (sum - target)
			str += ` = ${sum} over ${sum - target}\n`
			sum = 0
		}
	}

	if(sum != 0){
		if(sum >= target){
			over_by += (sum - target)
		}else{
			over_by += sum
		}
	}

	return {str, over_by}
}


function generateRandoms(){
	for(let i = 0; i < randomTotal; i++){
		shuffle(prices)
		randoms.push([...prices])
	}
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


//calculate 'overby' of each permutation, replacing 'best' if overby is smaller
function findBestGroup(){
	let length = randoms.length
	randoms.forEach((p, i) => {
		let thisOverby = solver(p)
		if(!best_over_by || thisOverby < best_over_by){
			best_over_by = thisOverby
			best_group = p
		}
	})
}


function solver(arr){
	let over_by = 0
	let sum = 0

	for(let i = 0; i < arr.length; i++){
		sum += arr[i]
		if(sum >= target){
			over_by += (sum - target)
			sum = 0
		}
	}

	if(sum != 0){
		if(sum >= target){
			over_by += (sum - target)
		}else{
			over_by += sum
		}
	}

	return over_by
}

