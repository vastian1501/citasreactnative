"use strict";
import React, { useState, useEffect } from "react";
import { ViewComponent } from "react-native";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Button, Avatar } from "react-native-elements";

import Cita from "../componentes/Citas.js";
import Formulario from "../screens/Formulario.js";



export default function Principal(props) {
    //Definir state de citas
    // const hola = 10
    // xy = hola ;
    const [citas, setCitas] = useState([
        {
            id: 1,
            cliente: {
                id: "1",
                nombre: "Juana",
                apellidos: "Cubana",
                telefono: "12121212",
            },
            manos: "Nada",
            pies: "Gel",
            fechaCita: "12/10/2021",
            hora: "15:00",
            comentarios: "655165118",
        },
        {
            id: 2,
            cliente: {
                id: "1",
                nombre: "Juana",
                apellidos: "Cubana",
                telefono: "12121212",
            },
            manos: "Nada",
            pies: "Gel",
            fechaCita: "03/11/2021",
            hora: "15:20",
            comentarios: "Me debe 5 euros",
        },
        {
            id: 3,
            cliente: {
                id: "1",
                nombre: "Juana",
                apellidos: "Cubana",
                telefono: "12121212",
            },
            manos: "Nada",
            pies: "Gel",
            fechaCita: "12/9/2021",
            hora: "15:30",
            comentarios: "Me debe 5 euros",
        },
        {
            id: 4,
            cliente: {
                id: "1",
                nombre: "Juana",
                apellidos: "Cubana",
                telefono: "12121212",
            },
            manos: "Nada",
            pies: "Gel",
            fechaCita: "12/9/2021",
            hora: "15:40",
            comentarios: "",
        },
    ]);

    //Contador de citas para hoy 
    const [contador, setContador] = useState(0);
    console.log('contador1 = ' +contador)
    
    //Eliminar states de Citas
    const eliminarCitas = (id) => {
        setCitas((citasActuales) => {
            return citasActuales.filter((cita) => cita.id !== id);
        });
    };
    const fecha = Date.now();
    const hoy = new Date(fecha);
    const options = {
        year: "numeric",
        month: "long",
        day: "2-digit",
    };
    const hoyFecha = hoy.toLocaleDateString("es-ES", options);
    const dias = [
        "Domingo",
        "Lunes",
        "Martes",
        "Miercoles",
        "Jueves",
        "Viernes",
        "Sabado",
    ];
    const fechaNueva =
        hoy.getMonth() + 1 + "/" + hoy.getDate() + "/" + hoy.getFullYear();
        
    console.log(fechaNueva);


    
    
    
    // var incremento = 0;
    // citas.map((cita) => {
    //     Date.parse(cita.fechaCita);
    //     if (Date.parse(cita.fechaCita) === Date.parse(fechaNueva)) {
    //         incremento++;
    //     }
    //     console.log("Fecha cita " + cita.fechaCita);
    //     console.log("Esto incrementa" + incremento);
    //     return incremento;
    // });
    
    var incremento = 0;
    useEffect(() => {
            citas.map((cita) => {
                Date.parse(cita.fechaCita);
                if (Date.parse(cita.fechaCita) === Date.parse(fechaNueva)) {
                    incremento++;
                }
                console.log("Fecha cita " + cita.fechaCita);
                console.log("Esto incrementa" + incremento);
                setContador(incremento);
                return incremento;
            });
        })


    console.log('Cuenta' + contador)

    //Mostrar ocultar Formulario
    const [mostrarForm, guardarMostrarForm] = useState(false);
    const mostrarOcultarForm = () => {
        guardarMostrarForm(!mostrarForm);
    };
    
    return (
        <View style={styles.fondo}>
            <Avatar
                size="medium"
                rounded
                overlayContainerStyle={{ backgroundColor: "#5D534A" }}
                onPress={() => mostrarOcultarForm()}
                activeOpacity={1}
                icon={{ name: "post-add", type: "material" }}
                containerStyle={{
                    zIndex: 3,
                    flex: 0,
                    position: "absolute",
                    left: 350,
                    right: 0,
                    bottom: 10,
                }}
            />

            {mostrarForm ? (
                <>
                    <Text style={styles.subtitulo}>Crear nueva cita</Text>
                    <View style={styles.botonesHeader}>
                        <Button
                            icon={{
                                name: "list-alt",
                                size: 30,
                                color: "white",
                            }}
                            title={mostrarForm ? "Ver todas las citas" : "ADD"}
                            onPress={() => mostrarOcultarForm()}
                            buttonStyle={{
                                padding: 10,
                                marginHorizontal: 100,
                                backgroundColor: "#5D534A",
                            }}
                            titleStyle={{ color: "white" }}
                            type="clear"
                        />
                        <Button
                            icon={{
                                name: "person-add",
                                size: 30,
                                color: "white",
                            }}
                            title="Añadir cliente"
                            onPress={() => mostrarOcultarForm()}
                            buttonStyle={{
                                padding: 10,
                                marginHorizontal: 100,
                                backgroundColor: "#5D534A",
                            }}
                            titleStyle={{ color: "white" }}
                            type="clear"
                        />
                    </View>

                    <Formulario
                        citas={citas}
                        setCitas={setCitas}
                        guardarMostrarForm={guardarMostrarForm}
                    />
                </>
            ) : (
                <>
                    <Text style={styles.subtituloCP}>
                        {citas.length > 0
                            ? [
                                  "Citas pendientes: ",
                                  citas.length,
                                  " Citas para hoy: ",
                                  contador,
                              ]
                            : "No hay citas, añade una nueva"}
                    </Text>
                    {/* {citas.map((cita) => {
                        return(
                            <Cita citas={cita} />
                        )
                    })} */}
                    
                    <FlatList
                        style={styles.flatList}
                        data={citas.sort(function (a, b) {
                            var c = new Date(a.fechaCita);
                            var d = new Date(b.fechaCita);
                            return c - d;
                        })}
                        renderItem={({ item }) => (
                            <Cita item={item} eliminarCitas={eliminarCitas} />
                        )}
                        keyExtractor={(item) => item.id.toString()}
                    />
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    fondo: {
        zIndex: -1,
        backgroundColor: "#F7DAD9",
        flex: 1,
    },
    titulo: {
        textAlign: "center",
        marginTop: 40,
        fontSize: 40,
        fontWeight: "bold",
        color: "#5D534A",
    },
    subtitulo: {
        textAlign: "center",
        marginTop: 15,
        margin: 10,
        fontSize: 15,
        fontWeight: "bold",
        color: "#5D534A",
    },
    subtituloCP: {
        textAlign: "center",
        marginTop: 10,
        fontSize: 20,
        padding: 10,
        fontWeight: "bold",
        color: "#FFFF",
        backgroundColor: "#5D534A",
    },
    flatList: {
        flex: 1,
    },
    roundButton1: {
        width: 100,
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        borderRadius: 100,
        backgroundColor: "orange",
    },
    botonesHeader: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
});

