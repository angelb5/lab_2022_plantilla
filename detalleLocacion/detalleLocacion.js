
$(document).ready(function () {
    // Metodo de obtención de parámetros
    const urlParams = new URLSearchParams(window.location.search);
    const idLocacion = urlParams.get('locacion');
    let i=1;

    $.ajax({
        method: "GET",
        url:" https://pokeapi.co/api/v2/location/"+idLocacion
    }).done((response)=>{
        $("#region").attr('href', "../detalleRegion/detalleRegion.html?region=" + response.region.url.split('/')[6]);
        $("#labelLocacion").text('Locación: ' + response.name);
        $("#labelRegion").text('Región: ' + response.region.name);
        response.areas.forEach(areas=>{
            appendtable(areas);
            $(".btnPokemon").on('click', function (){
                let id=$(this).data("idpokemon");
                $.ajax({
                    method: "GET",
                    url:" https://pokeapi.co/api/v2/location-area/"+id
                }).done((response)=>{
                    mostrarArea(response.name)
                    $('#pokemons').html("")
                    response.pokemon_encounters.forEach(pokemon=>{
                        mostrarPokemones(pokemon);
                    })
                })

            })
        })
    })


    function appendtable(areas){
        let id = areas.url.split("/")[6];
        let nombre = areas.name;
        $('#tablaAreas').append('<tr>'+
            '<td>'+i+'</td>'+
            '<td>'+nombre+'</td>'+
            '<td><button class="btn btn-primary btnPokemon" title="Pokemones" data-idpokemon="'+id+'">Ver Pokemones</button></td>'+
            '</tr>');
        i++;
    }


    function mostrarPokemones(pokemon){
        let id = pokemon.pokemon.url.split("/")[6];
        $('#pokemons').append('<div  class="col-2 rounded d-flex flex-column align-items-center m-2" style="border: 3px solid #2649ba;">\n' +
            '       <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/' + id +'.png">\n' +
            '       <h4>' + pokemon.pokemon.name +'</h4>\n' +
            '   </div>');

    }

    function mostrarArea(nombre){
        $('#areaSeleccionada').html("Pokemones a encontrarse en el Area: "+ nombre);
    }

 });