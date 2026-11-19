let teams=[], history=[];

function addTeam(){
let name=tName.value.trim(), squad=Number(tSquad.value);
if(teams.length>=8) return alert("Maximum 8 teams!");
if(!name||squad<11||squad>25) return alert("Enter valid details!");
teams.push({name,p:0,w:0,d:0,l:0,pts:0});
tName.value=""; tSquad.value="";
updateUI();
}

function recordMatch(){
let h=home.value,a=away.value;
let hg1=Number(hg.value),ag1=Number(ag.value);
if(teams.length<2) return alert("Add 2 teams first!");
if(h==a) return alert("Select different teams!");
if(hg1<0||ag1<0) return alert("Invalid goals!");
let x=teams.find(t=>t.name==h);
let y=teams.find(t=>t.name==a);
x.p++; y.p++;
if(hg1>ag1){x.w++;x.pts+=3;y.l++;}
else if(ag1>hg1){y.w++;y.pts+=3;x.l++;}
else{x.d++;y.d++;x.pts++;y.pts++;}
history.push({h,a,hg1,ag1});
updateUI();
alert("Match saved!");
}

function undoMatch(){
if(!history.length) return alert("No match to undo!");
let m=history.pop();
let x=teams.find(t=>t.name==m.h);
let y=teams.find(t=>t.name==m.a);
if(x&&y){
x.p--;y.p--;
if(m.hg1>m.ag1){x.w--;x.pts-=3;y.l--;}
else if(m.ag1>m.hg1){y.w--;y.pts-=3;x.l--;}
else{x.d--;y.d--;x.pts--;y.pts--;}
}
updateUI();
}

function removeTeam(i){
if(confirm("Delete this team?")){
let name=teams[i].name;
teams.splice(i,1);
history=history.filter(m=>m.h!=name&&m.a!=name);
updateUI();
}
}

function resetAll(){
if(confirm("Clear all data?")){
teams=[];history=[];
updateUI();
}
}

function updateUI(){
cnt.innerText=teams.length;
tbl.innerHTML="<tr><th>No</th><th>Team</th><th>P</th><th>W</th><th>D</th><th>L</th><th>Pts</th><th>Action</th></tr>";
teams.forEach((t,i)=>{
tbl.innerHTML+=`<tr><td>${i+1}</td><td>${t.name}</td><td>${t.p}</td><td>${t.w}</td><td>${t.d}</td><td>${t.l}</td><td>${t.pts}</td><td><button class="del" onclick="removeTeam(${i})">Remove</button></td></tr>`;
});
home.innerHTML=""; away.innerHTML="";
teams.forEach(t=>{
home.add(new Option(t.name,t.name));
away.add(new Option(t.name,t.name));
});
}
updateUI();
