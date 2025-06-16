let map
let userPosition=null
let markers=[]

const locais=[
 {nome:"Ecoponto Zona 7",endereco:"Av. Colombo, 1234",lat:-23.4201,lng:-51.9331,categoria:"eletronicos",imagem:"https://i.imgur.com/Eco1.jpg"},
 {nome:"Ecoponto Jardim Alvorada",endereco:"Rua das Flores, 567",lat:-23.4252,lng:-51.9302,categoria:"moveis",imagem:"https://i.imgur.com/Eco2.jpg"},
 {nome:"Coleta Seletiva Central",endereco:"Av. Brasil, 789",lat:-23.4183,lng:-51.9287,categoria:"plastico",imagem:"https://i.imgur.com/Eco3.jpg"},
 {nome:"Descarte de Pilhas Maringá",endereco:"Rua Verde, 101",lat:-23.4160,lng:-51.9350,categoria:"pilhas",imagem:"https://i.imgur.com/Eco4.jpg"},
 {nome:"Ponto de Reciclagem Mandacaru",endereco:"Rua Mandacaru, 333",lat:-23.4198,lng:-51.9452,categoria:"vidro",imagem:"https://i.imgur.com/Eco5.jpg"}
]

function initMap(){
map=new google.maps.Map(document.getElementById("map"),{
zoom:13,
center:{lat:-23.4206,lng:-51.933}
})

if(navigator.geolocation){
navigator.geolocation.getCurrentPosition(
(pos)=>{
userPosition={lat:pos.coords.latitude,lng:pos.coords.longitude}
new google.maps.Marker({
position:userPosition,
map:map,
icon:{
path:google.maps.SymbolPath.CIRCLE,
scale:8,
fillColor:'#4285F4',
fillOpacity:1,
strokeColor:'#fff',
strokeWeight:2
},
title:"Você está aqui"
})
map.setCenter(userPosition)
},
()=>{console.warn("Geolocalização negada")}
)
}

adicionarMarcadores("todos")
}

function adicionarMarcadores(categoria){
markers.forEach(m=>m.setMap(null))
markers=[]

locais.filter(l=>categoria=="todos"||l.categoria==categoria)
.forEach(local=>{
const marker=new google.maps.Marker({
position:{lat:local.lat,lng:local.lng},
map:map,
title:local.nome
})

const url=userPosition?
`https://www.google.com/maps/dir/?api=1&origin=${userPosition.lat},${userPosition.lng}&destination=${local.lat},${local.lng}`:
`https://www.google.com/maps/dir/?api=1&destination=${local.lat},${local.lng}`

const infowindow=new google.maps.InfoWindow({
content:`
<div style="max-width:220px">
<img src="${local.imagem}" alt="Imagem" style="width:100%;border-radius:8px;margin-bottom:5px">
<strong>${local.nome}</strong><br>
${local.endereco}<br><br>
<a href="${url}" target="_blank">📍 Gerar rota</a>
</div>`
})

marker.addListener("click",()=>{infowindow.open(map,marker)})
markers.push(marker)
})
}

function filtrarCategoria(categoria){
document.querySelectorAll('.filtros button').forEach(btn=>btn.classList.remove('ativo'))
const btnAtivo=Array.from(document.querySelectorAll('.filtros button'))
.find(btn=>btn.textContent.toLowerCase().includes(categoria=="todos"?"todos":categoria))
if(btnAtivo)btnAtivo.classList.add('ativo')

adicionarMarcadores(categoria)
}
