let p1Rounds = 5
let p2Rounds = 5

let p1Moves = []
let p2Moves = []

const icons = {
rock:"✊",
paper:"✋",
scissors:"✌️"
}

function showScreen(id){

document.querySelectorAll(".screen").forEach(s=>{
s.style.display="none"
})

document.getElementById(id).style.display="block"

}

function changeRound(player,delta){

if(player==="p1"){
p1Rounds = Math.max(1,p1Rounds+delta)
document.getElementById("p1Rounds").innerText=p1Rounds
}

if(player==="p2"){
p2Rounds = Math.max(1,p2Rounds+delta)
document.getElementById("p2Rounds").innerText=p2Rounds
}

}

function startSelection(){

p1Moves=[]
p2Moves=[]

buildGrid("p1Grid",p1Rounds,p1Moves)

showScreen("screen2a")

}

function buildGrid(id,rounds,array){

let grid = document.getElementById(id)
grid.innerHTML=""

for(let i=0;i<rounds;i++){

let row=document.createElement("div")
row.className="moveRow"

row.innerHTML=`
<span>${i+1}</span>
<button class="moveBtn" onclick="selectMove(this,'${id}',${i},'rock')">${icons.rock}</button>
<button class="moveBtn" onclick="selectMove(this,'${id}',${i},'paper')">${icons.paper}</button>
<button class="moveBtn" onclick="selectMove(this,'${id}',${i},'scissors')">${icons.scissors}</button>
`

grid.appendChild(row)

}

}

function selectMove(btn,grid,i,move){

let row = btn.parentElement

row.querySelectorAll("button").forEach(b=>{
b.classList.remove("selected")
})

btn.classList.add("selected")

if(grid==="p1Grid") p1Moves[i]=move
if(grid==="p2Grid") p2Moves[i]=move

}

function confirmP1(){

buildGrid("p2Grid",p2Rounds,p2Moves)

showScreen("passPhone")

}

function startBattle(){

showScreen("screen3")

runBattle()

}

function winner(a,b){

if(a===b) return 0

if(
(a==="rock"&&b==="scissors")||
(a==="paper"&&b==="rock")||
(a==="scissors"&&b==="paper")
) return 1

return 2

}

async function runBattle(){

let table=document.getElementById("resultTable")
table.innerHTML=""

let score1=0
let score2=0

let max=Math.max(p1Moves.length,p2Moves.length)

for(let i=0;i<max;i++){

let m1=p1Moves[i]
let m2=p2Moves[i]

if(!m1||!m2) continue

let w=winner(m1,m2)

let row=document.createElement("tr")

let resultClass="draw"

if(w===1){
score1++
resultClass="win"
}

if(w===2){
score2++
resultClass="lose"
}

row.innerHTML=`
<td>${icons[m1]}</td>
<td class="${resultClass}">VS</td>
<td>${icons[m2]}</td>
`

table.appendChild(row)

await new Promise(r=>setTimeout(r,600))

}

document.getElementById("finalScore").innerHTML=
`Final Score<br>Player1 ${score1} : ${score2} Player2`

}

function restart(){

location.reload()

}
