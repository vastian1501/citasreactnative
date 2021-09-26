"use strict";
import React, { useState, useEffect } from "react";
import { ViewComponent } from "react-native";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Button, Avatar } from "react-native-elements";
import Citas from "../componentes/Citas.js";
import firebase from "../database/Firebase.js";
import Formulario from "../screens/Formulario.js";



export default function Principal(props) {

    const [citas, setCitas] = useState([]);

    useEffect(() => {
        firebase.db.collection("citas").onSnapshot((querySnapshot) => {
            const citas = [];

            querySnapshot.docs.forEach((doc) => {
                const {
                    nombre,
                    apellidos,
                    telefono,
                    manos,
                    pies,
                    fechaDb,
                    fecha,
                    hora,
                    comentarios,
                } = doc.data();

                citas.push({
                    id: doc.id,
                    nombre,
                    apellidos,
                    telefono,
                    manos,
                    pies,
                    fechaDb,
                    fecha,
                    hora,
                    comentarios,
                });
            });

            setCitas(citas);
        });
    }, []);

    //Contador de citas para hoy 
    const [contador, setContador] = useState(0);
    //console.log('contador1 = ' +contador)
    
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
        hoy.getMonth() + 1 + '/'+ hoy.getDate() + "/" + hoy.getFullYear();
    
    var incremento = 0;
    useEffect(() => {
            citas.map((cita) => {
                //console.log('Fehca cita' + cita.fecha)
                if (Date.parse(cita.fechaDb) === Date.parse(fechaNueva)) {
                    incremento++;
                }
                //console.log("Fecha cita parse " + new Date(cita.fecha));
                //console.log("Esto incrementa" + incremento);
                setContador(incremento);
                return incremento;
            });
        })


    //console.log('Cuenta' + contador)

    //Mostrar ocultar Formulario
    const [mostrarForm, guardarMostrarForm] = useState(false);
    const mostrarOcultarForm = () => {
        guardarMostrarForm(!mostrarForm);
    };
    
    return (
        <View style={styles.fondo}>
            
                <>
                    <Text style={styles.subtituloCP}>
                        {citas.length > 0
                            ? [
                                  "Total de citas: ",
                                  citas.length,
                                  " || Citas para hoy: ",
                                  contador,
                              ]
                            : "No hay citas, añade una nueva"}
                    </Text>
                    
                    <Citas citas={citas} />
                </>
        </View>
    );
}

const styles = StyleSheet.create({
    fondo: {
        zIndex: -1,
        //backgroundColor: "#F7DAD9",
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
        fontWeight: "300",
        color: "#FFFF",
        backgroundColor: "#E55777",
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

