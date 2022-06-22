
$(document).ready(function () {
    // Metodo de obtención de parámetros
    const urlParams = new URLSearchParams(window.location.search);
    const idRegion = urlParams.get('region');
    var locations = [];
    var actual = 1;
    var paginas;
    var pagul = $('#paginacion');

    $.ajax({
        method: "GET",
        url:"https://pokeapi.co/api/v2/region/"+idRegion
    }).done((response)=>{
        locations = response.locations;
        paginas = Math.ceil(locations.length/10);
        generarPaginacion();
        let locationspag = locations.slice(10*(actual-1), 10*actual);
        for(let i=0; i<locationspag.length;i++){
            appendtable(i+1, locationspag[i]);
        }
    })




    function appendtable(i, location){
        let id = location.url.split("/")[6];
        $('table').append('<tr>'+
                            '<td>'+i+'</td>'+
                            '<td>'+location.name+'</td>'+
                            '<td><a class="btn btn-primary" title="Detalles" href="./detalleRegion/detalleLocacion.html?region='+id+'">Detalles</a></td>'+
                            '</tr>');
                        
    }



});
