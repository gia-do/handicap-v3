const icons={
rock:"✊",
paper:"✋",
scissors:"✌️"
}

const moves=["rock","paper","scissors"]

let roundsP1=5
let roundsP2=5

let p1moves=[]
let p2moves=[]

let p1score=0
let p2score=0
let draws=0


function showScreen(id){
document.querySelectorAll(".screen").forEach(s=>s.style.display="none")
document.getElementById(id).style.display="block"
}


/* ROUND SELECT */

function updateDisplay(){
p1value.textContent=roundsP1
p2value.textContent=roundsP2
}

p1plus.onclick=()=>{if(roundsP1<20)roundsP1++;updateDisplay()}
p1minus.onclick=()=>{if(roundsP1>1)roundsP1--;updateDisplay()}
p2plus.onclick=()=>{if(roundsP2<20)roundsP2++;updateDisplay()}
p2minus.onclick=()=>{if(roundsP2>1)roundsP2--;updateDisplay()}


/* BUILD MOVE GRID */

function buildGrid(container,rounds,store){

container.innerHTML=""

for(let i=0;i<rounds;i++){

let row=document.createElement("div")
row.className="moveRow"

moves.forEach(m=>{

let span=document.createElement("span")
span.textContent=icons[m]

span.onclick=()=>{

row.querySelectorAll("span").forEach(s=>s.classList.remove("selected"))
span.classList.add("selected")

store[i]=m

}

row.appendChild(span)

})

container.appendChild(row)

}

}


/* START GAME */

start.onclick=()=>{

p1moves=[]
p2moves=[]

buildGrid(p1grid,roundsP1,p1moves)

showScreen("screen2")

}


/* PLAYER1 DONE */

confirmP1.onclick=()=>{

showScreen("screenPass")

}


/* PLAYER2 READY */

ready.onclick=()=>{

buildGrid(p2grid,roundsP2,p2moves)

showScreen("screen3")

}


/* PLAYER2 DONE */

confirmP2.onclick=()=>{

showScreen("screenResult")

runBattle()

}


/* RPS ENGINE */

function getWinner(a,b){

const map={rock:0,paper:1,scissors:2}

if(a===b)return 0

if((map[a]-map[b]+3)%3===1)return 1

return 2

}


/* RESULT TABLE */

function runBattle(){

let table=resultTable
table.innerHTML=""

let rounds=Math.max(roundsP1,roundsP2)

p1score=0
p2score=0
draws=0

for(let i=0;i<rounds;i++){

let p1=p1moves[i]
let p2=p2moves[i]

let row=document.createElement("tr")

let c1=document.createElement("td")
c1.textContent=i+1

let c2=document.createElement("td")
let c3=document.createElement("td")

if(p1)c2.textContent=icons[p1]
if(p2)c3.textContent=icons[p2]

/* handicap */

if(!p1 && p2){
p2score++
c2.classList.add("lose")
c3.classList.add("win")
}

else if(!p2 && p1){
p1score++
c2.classList.add("win")
c3.classList.add("lose")
}

else if(p1 && p2){

let r=getWinner(p1,p2)

if(r===1){
p1score++
c2.classList.add("win")
c3.classList.add("lose")
}

else if(r===2){
p2score++
c3.classList.add("win")
c2.classList.add("lose")
}

else{
draws++
c2.classList.add("draw")
c3.classList.add("draw")
}

}

row.appendChild(c1)
row.appendChild(c2)
row.appendChild(c3)

table.appendChild(row)

}

let winner="DRAW"

if(p1score>p2score)winner="PLAYER 1 WINS"
if(p2score>p1score)winner="PLAYER 2 WINS"

finalResult.innerHTML=`
<p>P1: ${p1score}</p>
<p>P2: ${p2score}</p>
<p>Draw: ${draws}</p>
<h2>${winner}</h2>
`

}


/* BUTTONS */

replay.onclick=()=>location.reload()
reset.onclick=()=>location.reload()
