
$(document).ready(function () {
    $.ajax({
        method: "GET",
        url:"https://pokeapi.co/api/v2/region"
    }).done((response)=>{
        let results = response.results;
        results.forEach(region =>{
            appendtable(region);
        })
    })

    function appendtable(region){
        let id = region.url.split("/")[6];
        $('table').append('<tr>'+
                            '<td>'+id+'</td>'+
                            '<td>'+region.name+'</td>'+
                            '<td><a class="btn btn-primary" title="Detalles" href="./detalleRegion/detalleRegion.html?region='+id+'">Detalles</a></td>'+
                            '</tr>');
                        
       }
});