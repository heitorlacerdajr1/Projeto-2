let map
let userPosition=null
let markers=[]

const locais=[
 {nome:"Paço Municipal",categoria:"eletronicos",lat:-23.4206,lng:-51.933,endereco:"Av. XV de Novembro, 701",imagem:"https://i.ibb.co/wHvmRSj/35138085402-1fb5d76b06-h.jpghttps://i.imgur.com/eco1.jpg"},
 {nome:"Supermercados Cidade Canção",categoria:"eletronicos",lat:-23.426,lng:-51.930,endereco:"Av. Brasil, 7225",imagem:"https://i.ibb.co/TMv36Djt/Screenshot-1.png"},
 {nome:"SESI",categoria:"eletronicos",lat:-23.427,lng:-51.918,endereco:"Rua Antonio Carniel, 499",imagem:"https://i.ibb.co/7tGDW8YQ/Sesi.jpg"},
 {nome:"Tiro de Guerra de Maringá",categoria:"eletronicos",lat:-23.398,lng:-51.934,endereco:"Av. Mandacaru, 730",imagem:"https://i.ibb.co/mFGyQj9r/Tiro-de-guerra.webp"},
 {nome:"4º BPM",categoria:"eletronicos",lat:-23.411,lng:-51.931,endereco:"Rua Mitsuzo Taguchi, 99",imagem:"https://i.ibb.co/ns4qPdLN/4-batalhao.jpg"},
 {nome:"Câmara Municipal",categoria:"eletronicos",lat:-23.428,lng:-51.936,endereco:"Av. Papa João XXIII, 239",imagem:"hhttps://i.ibb.co/QvSfz0p5/Camara-municipal.webp"},
 {nome:"Coopercanção",categoria:"eletronicos",lat:-23.437,lng:-51.930,endereco:"Rua P. Gertrude Heck Fritzen, 5769",imagem:"https://i.imgur.com/eco7.jpg"},
 {nome:"Faculdades Maringá",categoria:"eletronicos",lat:-23.435,lng:-51.937,endereco:"Av. Prudente de Morais, 815",imagem:"https://i.ibb.co/SX4PF1MS/Faculdade-maringa.jpg"},
 {nome:"UNIFAMMA",categoria:"eletronicos",lat:-23.450,lng:-51.930,endereco:"Av. Horacio Racanello Filho, 5000",imagem:"https://i.ibb.co/wNdHqRj3/unifama.jpg"},

 {nome:"Paróquia Menino Jesus de Praga",categoria:"vidros",lat:-23.430,lng:-51.940,endereco:"Rua Monsenhor Kimura, 31",imagem:"https://i.ibb.co/9Mymmkf/paroquia-menino.jpg"},
 {nome:"Paróquia Cristo Ressuscitado",categoria:"vidros",lat:-23.431,lng:-51.925,endereco:"Av. Rio Branco, 1000",imagem:"https://i.ibb.co/qLQYWb01/missa-de-dedicacao-igreja-cristo-ressuscitado-sera-dia-18-de-dezembro-12-12-2019.jpg"},
 {nome:"Coopervidros",categoria:"vidros",lat:-23.500,lng:-51.950,endereco:"Estrada São Luiz, 2119, Gleba Pinguim",imagem:"https://i.imgur.com/vidro3.jpg"},

 {nome:"CooperPalmeiras",categoria:"reciclaveis",lat:-23.410,lng:-51.950,endereco:"Rodovia PR 317, 200",imagem:"https://i.imgur.com/rec1.jpg"},
 {nome:"CooperCicla",categoria:"reciclaveis",lat:-23.420,lng:-51.945,endereco:"Avenida Guairá, 184",imagem:"https://i.imgur.com/rec2.jpg"},
 {nome:"CooperNorte",categoria:"reciclaveis",lat:-23.430,lng:-51.950,endereco:"Rodovia PR 317, 200",imagem:"https://i.imgur.com/rec3.jpg"},
 {nome:"CooperAmbiental",categoria:"reciclaveis",lat:-23.440,lng:-51.940,endereco:"Rua Izaura Gambá Vitorino, 345",imagem:"https://i.imgur.com/rec4.jpg"},
 {nome:"CooperMaringa",categoria:"reciclaveis",lat:-23.450,lng:-51.950,endereco:"Rodovia PR 317, 200",imagem:"https://i.imgur.com/rec5.jpg"},

 {nome:"Secretaria de Meio Ambiente",categoria:"pilhas",lat:-23.425,lng:-51.920,endereco:"Av. Cerro Azul, 544",imagem:"https://i.ibb.co/Xrb2wByD/secretaria.jpg"},
 {nome:"Atacadão Maringá",categoria:"pilhas",lat:-23.415,lng:-51.915,endereco:"Rua Fernão Dias, 300",imagem:"https://i.ibb.co/MxxbSsCq/atacadao.jpg"}
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
