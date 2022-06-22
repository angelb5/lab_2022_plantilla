
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
                            '<td><a class="btn btn-primary" title="Detalles" href="../detalleLocacion/detalleLocacion.html?locacion='+id+'">Detalles</a></td>'+
                            '</tr>');
                        
    }

    function generarPaginacion(){
        pagul.html('');
        if(actual>1){
            pagul.append('<li class="page-item" ><button data-page="'+(actual - 1)+'" class="page-link">Previous</button></li>');
        }else{
            pagul.append('<li class="page-item disabled"><button class="page-link" tabindex="-1">Previous</button></li>');
        }
        for(i = 1;i <= paginas ;i++){

            if(i===actual){
                pagul.append('<li class="page-item active"><span data-page="'+(i)+'" class="page-link">'+i+'<span class="sr-only">(current)</span></span></li>');
            }else{
                pagul.append('<li class="page-item"><button data-page="'+(i)+'" class="page-link">'+i+'</button></li>');
            }
        }

        if(actual<paginas){
            pagul.append('<li class="page-item"><button class="page-link">Next</button></li>');
        }else{
            pagul.append('<li class="page-item disabled"><button data-page="'+(actual + 1)+'" class="page-link" tabindex="-1">Next</button></li>');
        }

        $('.page-link').on('click',function(event){
            event.stopPropagation();
            event.stopImmediatePropagation();
            actual = $(this).data('page');
            $("#tablaLocaciones").html("");
            generarPaginacion();
            let locationspag = locations.slice(10*(actual-1), 10*actual);
            for(let i=0; i<locationspag.length;i++){
                appendtable(10*(actual-1) + (i+1), locationspag[i]);
            }
        });
    }


});
