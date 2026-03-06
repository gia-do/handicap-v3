/* ICONS */

const icons = {
rock:"✊",
paper:"✋",
scissors:"✌️"
}

/* RPS ENGINE */

function getWinner(p1,p2){

const moves = {rock:0,paper:1,scissors:2}

const a = moves[p1]
const b = moves[p2]

if(a===b) return 0

if((a-b+3)%3===1) return 1

return 2
}

/* DEMO DATA */
/* replace with your real move inputs */

let p1moves = [
"rock","paper","rock","paper","scissors",
"paper","rock","paper","paper","paper",
"rock","paper","scissors","scissors"
]

let p2moves = [
"paper","rock","scissors","scissors","paper",
"rock","paper","scissors","paper","rock",
"rock","rock","paper","scissors","scissors","scissors"
]

let roundsP1 = p1moves.length
let roundsP2 = p2moves.length

let p1score=0
let p2score=0
let draws=0

function sleep(ms){
return new Promise(r=>setTimeout(r,ms))
}

/* BUILD TABLE */

function buildTable(){

const table=document.getElementById("resultTable")
table.innerHTML=""

let battleRounds=Math.max(roundsP1,roundsP2)

for(let i=0;i<battleRounds;i++){

let row=document.createElement("tr")

let c1=document.createElement("td")
c1.textContent=i+1

let c2=document.createElement("td")
let c3=document.createElement("td")

row.appendChild(c1)
row.appendChild(c2)
row.appendChild(c3)

table.appendChild(row)

}

}

/* REVEAL MOVES */

async function revealMoves(){

let rows=document.querySelectorAll("#resultTable tr")

for(let i=0;i<p1moves.length;i++){

rows[i].children[1].textContent=icons[p1moves[i]]
rows[i].children[1].classList.add("fade")

await sleep(150)

}

await sleep(200)

for(let i=0;i<p2moves.length;i++){

rows[i].children[2].textContent=icons[p2moves[i]]
rows[i].children[2].classList.add("fade")

await sleep(150)

}

}

/* BATTLE */

async function runBattle(){

let rows=document.querySelectorAll("#resultTable tr")

p1score=0
p2score=0
draws=0

let battleRounds=Math.max(roundsP1,roundsP2)

for(let i=0;i<battleRounds;i++){

let p1=p1moves[i]
let p2=p2moves[i]

let p1cell=rows[i].children[1]
let p2cell=rows[i].children[2]

if(!p1 && p2){

p2score++
p2cell.classList.add("win")
p1cell.classList.add("lose")

await sleep(300)
continue
}

if(!p2 && p1){

p1score++
p1cell.classList.add("win")
p2cell.classList.add("lose")

await sleep(300)
continue
}

if(!p1 && !p2) continue

let result=getWinner(p1,p2)

if(result===1){

p1score++
p1cell.classList.add("win")
p2cell.classList.add("lose")

}

else if(result===2){

p2score++
p2cell.classList.add("win")
p1cell.classList.add("lose")

}

else{

draws++
p1cell.classList.add("draw")
p2cell.classList.add("draw")

}

await sleep(300)

}

}

/* FINAL RESULT */

function showFinal(){

let winner="DRAW"

if(p1score>p2score) winner="PLAYER 1 WINS"
if(p2score>p1score) winner="PLAYER 2 WINS"

document.getElementById("finalResult").innerHTML=`

<p>Player 1: ${p1score}</p>
<p>Player 2: ${p2score}</p>
<p>Draw: ${draws}</p>

<h2>${winner}</h2>

`

}

/* MAIN SEQUENCE */

async function runGame(){

buildTable()

await sleep(1000)

await revealMoves()

await sleep(200)

await runBattle()

await sleep(200)

showFinal()

}

runGame()

/* BUTTONS */

document.getElementById("replay").onclick=()=>{
location.reload()
}

document.getElementById("reset").onclick=()=>{
location.reload()
}
