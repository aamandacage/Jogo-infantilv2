const Q=[
["Quem construiu as pirâmides do Egito?",["Egípcios","Brasileiros","Portugueses"],0],
["O que os seres humanos usavam para caçar antigamente?",["Celulares","Lanças","Carros"],1],
["Quem descobriu o Brasil, segundo a história tradicional ensinada nas escolas?",["Pedro Álvares Cabral","Dom Pedro II","Tiradentes"],0],
["Como se chama o estudo do passado?",["Matemática","História","Geografia"],1],
["Qual era o nome do governante do Egito Antigo?",["Faraó","Presidente","Prefeito"],0],
["O que os seres humanos aprenderam a fazer para produzir alimentos?",["Plantar","Voar","Dirigir"],0],
["Qual destes povos vivia na Roma Antiga?",["Romanos","Astecas","Vikings"],0],
["O que é um castelo?",["Uma construção que podia servir de proteção","Um tipo de comida","Um meio de transporte"],0],
["Como as pessoas se comunicavam antes dos celulares?",["Por cartas e conversas presenciais","Por aplicativos","Por mensagens instantâneas"],0],
["Qual objeto é usado para descobrir como era o passado?",["Uma fonte histórica, como uma fotografia antiga","Um videogame moderno","Um controle remoto"],0]
];
const L=["A","B","C"];
const $=id=>document.getElementById(id);
let i=0,pts=0,travado=false;
function mostrar(s){["inicio","jogo","fim"].forEach(x=>$(x).classList.toggle("hide",x!==s))}
function correr(passo){
 const w=document.documentElement.clientWidth-90;
 $("runner").style.left=(passo/Q.length*w)+"px";
}
function moeda(el){
 const r=el.getBoundingClientRect(),c=document.createElement("div");
 c.className="coinpop";c.textContent="🪙";c.style.left=(r.left+r.width/2-16)+"px";c.style.top=r.top+"px";
 document.body.appendChild(c);setTimeout(()=>c.remove(),900);
}
function iniciar(){i=0;pts=0;mostrar("jogo");correr(0);carregar()}
function carregar(){
 travado=false;const [q,ops]=Q[i];
 $("num").textContent="FASE "+(i+1)+"-"+Q.length;
 $("pts").textContent="🪙 x"+pts;
 $("pergunta").textContent=q;
 $("fb").textContent="";
 $("prox").classList.add("hide");
 const box=$("opcoes");box.innerHTML="";
 ops.forEach((t,k)=>{
  const b=document.createElement("button");b.className="opt";b.textContent=L[k]+") "+t;
  b.onclick=()=>responder(k,b);box.appendChild(b);
 });
}
function responder(k,b){
 if(travado)return;travado=true;
 const certa=Q[i][2],bs=[...$("opcoes").children];
 bs.forEach(x=>x.disabled=true);
 if(k===certa){
  pts++;b.classList.add("right");$("fb").textContent="ACERTOU! +1 MOEDA!";$("fb").style.color="#006400";
  moeda(b);const r=$("runner");r.classList.remove("jump");void r.offsetWidth;r.classList.add("jump");
  correr(i+1);
 }else{
  b.classList.add("wrong");bs[certa].classList.add("right");$("fb").textContent="QUASE! A CERTA ESTÁ EM VERDE.";$("fb").style.color="#a01800";
  correr(i+1);
 }
 $("pts").textContent="🪙 x"+pts;
 $("prox").textContent=i===Q.length-1?"VER RESULTADO":"PRÓXIMA";
 $("prox").classList.remove("hide");$("prox").focus();
}
function proxima(){i++;if(i<Q.length)carregar();else final()}
function final(){
 mostrar("fim");
 const e=pts>=9?3:pts>=6?2:pts>=3?1:0;
 $("estrelas").textContent="⭐".repeat(e)+"☆".repeat(3-e);
 $("placar").textContent=pts+" DE "+Q.length+" MOEDAS";
 $("troféu").textContent=e===3?"🏆":e===2?"🏁":"🔍";
 $("titulo-fim").textContent=e===3?"CAMPEÃO!":e===2?"FASE COMPLETA!":"TENTE DE NOVO!";
 $("msg-fim").textContent=e===3?"Você sabe tudo sobre o passado!":e===2?"Você descobriu muita coisa. Que tal juntar todas as moedas?":"Jogue outra vez para descobrir mais segredos da história.";
}
$("comecar").onclick=iniciar;$("again").onclick=iniciar;$("prox").onclick=proxima;
window.addEventListener("resize",()=>{if(!$("inicio").classList.contains("hide"))return;correr(Math.min(i+(travado?1:0),Q.length))});
