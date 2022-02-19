
leerDatos = () =>{
    let ruta= "http://localhost:8080/servicio-cliente-crud/cliente.php";
    fetch(ruta).then(response =>response.json())
    .then(datos =>{
        //console.log(datos);
        llenarTabla(datos);
    }) 
}

leerDatos();

llenarTabla = (datos) =>{
    $("#tbody-clientes").html("");
    $(datos).each((index,item)=>{
        let fila = "<tr>";
        fila += "<td>"+ item.dni + "</td>";
        fila += "<td>"+ item.nombre + "</td>";
        fila += "<td>"+ item.direccion + "</td>";
        fila += "<td>"+ item.edad + "</td>";
        fila += "<td><i class='bi bi-trash botonEliminar'></i></td>";
        fila += "<td><i class='bi bi-pencil-square botonActualizar' data-bs-toggle='modal' data-bs-target='#modalActualizar'></i></td>";
        fila += "</tr>";
        $("#tbody-clientes").append(fila);
    });

    $(".botonEliminar").click(function(){
        //$(this) captura la fila del icono actual
        let actualRow = $(this).parent().parent();
        let posicion = actualRow.index();
            // console.log(posicion);
            // console.log(datos[posicion].nombre);

        let nombreVal = datos[posicion].nombre;
        let confirmacion = confirm("seguro desea eliminar a "+datos[posicion].nombre+"?")
            if(confirmacion){
                eliminarCliente(nombreVal);
            }
    });

    $(".botonActualizar").click(function(){
        let actualRow = $(this).parent().parent();
        let posicion = actualRow.index();
        

        $("#textDniActualizar").val(datos[posicion].dni)
        $("#textNombreActualizar").val(datos[posicion].nombre)
         $("#textDirActualizar").val(datos[posicion].direccion)
        $("#textEdadActualizar").val(datos[posicion].edad)

    })

}
//metodo eliminar

eliminarCliente = (nombreVal) =>{
    var valoresEnviados = new FormData();
    valoresEnviados.append("nombre",nombreVal);

    let ruta = "http://localhost:8080/servicio-cliente-crud/eliminar-cliente.php";

    fetch(ruta,{
        method: 'POST',
        body: valoresEnviados
    }).then(response =>response.text())
    .then( ()=>{     
        leerDatos();
    })
    
}

//metodo Insertar

$("#btnGuardar").click(()=>{
        let dni= $("#textDni").val();
        let nombre= $("#textNombre").val();
        let dir= $("#textDir").val();
        let edad= $("#textEdad").val();
       
        //limpiando los valores
        $("#textDni").val("");
        $("#textNombre").val("");
        $("#textDir").val("");
        $("#textEdad").val("");

        var valoresEnviados = new FormData();
        valoresEnviados.append("dni",dni);
        valoresEnviados.append("nombre",nombre);
        valoresEnviados.append("direccion",dir);
        valoresEnviados.append("edad",edad);

        let ruta = "http://localhost:8080/servicio-cliente-crud/insertar-cliente.php";
    
        fetch(ruta,{
            method: 'POST',
            body: valoresEnviados
        }).then(response =>response.text())
        .then(datos =>{
            console.log(datos);

        leerDatos();
        })

})


//metodo Actualizar
$("#btnActualizar").click(()=>{

    let dni = $("#textDniActualizar").val();
    let nombre = $("#textNombreActualizar").val();
    let dir = $("#textDirActualizar").val();
    let edad = $("#textEdadActualizar").val();


    var valoresEnviados = new FormData();
    valoresEnviados.append("dni",dni);
    valoresEnviados.append("nombre",nombre);
    valoresEnviados.append("direccion",dir);
    valoresEnviados.append("edad",edad);

    let ruta = "http://localhost:8080/servicio-cliente-crud/actualizar-cliente.php";

    fetch(ruta,{
        method: 'POST',
        body: valoresEnviados
    }).then(response =>response.text())
    .then(() =>{
        leerDatos();
    })



})

