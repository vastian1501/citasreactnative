import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Card, ListItem, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import shortid from "shortid";
import firebase from '../database/Firebase'

import {
    Image,
    StyleSheet,
    Text,
    View,
    FlatList,
    TextInput,
    ScrollView,
    Alert,
} from "react-native";

export default function Formulario({
    citass,
    setCitass,
    guardarMostrarForm,
}) {

    
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        firebase.db.collection("clientes").onSnapshot((querySnapshot) => {
            const clientes = [];

            querySnapshot.docs.forEach((doc) => {
                const { nombre, apellidos, telefono } = doc.data();
                clientes.push({
                    id: doc.id,
                    nombre,
                    apellidos,
                    telefono,
                });
            });

            setClientes(clientes);
        });
    }, []);

    const [isSelected, setSelection] = useState(false);
    const fecha = Date.now();
    const [date, setDate] = useState(new Date(fecha));
    const [mode, setMode] = useState("time");
    const [show, setShow] = useState(false);

    
    
    //Guardar Cita
    //Esto esta pendiente, hay que obtener el id del cliente seleccionado y pasarlo al state citas {cliente}
    // nose como se hace por eso lo dejo aqui, 

    const [citas, setCitas] = useState({
            cliente: {
                id: "",
                nombre: "",
                apellidos: "",
                telefono: "",
            },
            manos: "",
            pies: "",
            fechaCita: "",
            hora: "",
            comentarios: "",
    })

    const actualizarUseState = (name, value) => {
        setCitas({ ...citas, [name]: value });
    };

    const guardarNombre = (item) => {
        firebase.db.collection("clientes")
            .where("id", "==", item)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }

    const guardarCita = () => {
        if (
            (cliente.trim() === "") |
            (manos.trim() === "") |
            (pies.trim() === "") |
            (fechaCita.trim() === "") |
            (hora.trim() === "")
        ) {
            mostrarAlerta();
            return;
        }
        //Crear nueva citas
        const cita = {
            id,
            cliente,
            manos,
            pies,
            fechaCita,
            hora,
            comentarios,
        };

        cita.id = shortid.generate();
        //Agregar al state citas
        const citasNuevo = [...citas, cita];
        setCitas(citasNuevo);
        //Ocultar formulario
        guardarMostrarForm(false);
        //Resetear formularionpm
    };

    //Mostrar alerta
    const mostrarAlerta = () => {
        Alert.alert(
            "Error",
            "No has completado todos los campos obligatorios",
            [
                {
                    text: "Ok",
                },
            ]
        );
    };
    //Funcion minutos
    function checkTime(i){
        if (i<10) {i= '0' + i;}return i;
    }
    //Opciones dateTimePicker
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === "ios");
        setDate(currentDate);
        // guardarFecha(currentDate.toLocaleDateString());
        actualizarUseState("fecha", currentDate.toLocaleDateString());
        // guardarHora(checkTime(currentDate.getHours()) + ":" + checkTime(currentDate.getMinutes()));
        actualizarUseState(
            "hora", 
            checkTime(currentDate.getHours()) +
                ":" +
                checkTime(currentDate.getMinutes())
        );
    };

    const fechaNormalCita = new Date(date);

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode("date");
    };

    const showTimepicker = () => {
        showMode("time");
    };

    return (
        <>
            <ScrollView style={styles.formulario}>
                <View>
                    <Text style={styles.label}>Nombre</Text>

                    <Picker
                        style={{
                            marginHorizontal: 5,
                            marginVertical: 10,
                            color: "#5D534A",
                        }}
                        itemStyle={{
                            backgroundColor: "grey",
                            color: "blue",
                            fontFamily: "Ebrima",
                            fontSize: 17,
                        }}
                        selectedValue={clientes}
                        onValueChange={(value) =>
                            actualizarUseState("nombre", value)
                        }
                    >
                        <Picker.Item
                            label="Elige nombre del cliente"
                            value=""
                        />
                        {clientes.map((cliente) => (
                            <Picker.Item
                                label={cliente.nombre + " " + cliente.apellidos}
                                value={cliente.id}
                            />
                        ))}
                    </Picker>
                </View>

                <View>
                    <Text style={styles.label}>Manos</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(value) =>
                            actualizarUseState("nombre", value)
                        }
                        placeholder="Ejemplo: gel, acrilicos o nada"
                        color="black"
                    />
                </View>
                <View>
                    <Text style={styles.label}>Pies</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(value) =>
                            actualizarUseState("nombre", value)
                        }
                        placeholder=" Ejemplo: semipermanentes, acrilicos o nada"
                        color="black"
                    />
                </View>
                <View>
                    <Text style={styles.label}>Fecha</Text>
                    <Button
                        onPress={() => showMode("date")}
                        title="Seleccionar fecha"
                        buttonStyle={{ backgroundColor: "#D6D2C4", margin: 10 }}
                    />
                </View>
                <Text style={styles.labelFH}>
                    {fechaNormalCita.getDate() +
                        "/" +
                        (fechaNormalCita.getMonth() + 1) +
                        "/" +
                        fechaNormalCita.getFullYear()}
                </Text>
                <View>
                    <Text style={styles.label}>Hora</Text>
                    <Button
                        onPress={() => showMode("time")}
                        title="Seleccionar hora"
                        buttonStyle={{ backgroundColor: "#D6D2C4", margin: 10 }}
                    />
                </View>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                        neutralButtonLabel="clear"
                    />
                )}
                {/* <Text style={styles.labelFH}>{hora}</Text> */}
                <View>
                    <Text style={styles.label}>Comentarios</Text>
                    <TextInput
                        multiline
                        style={styles.input}
                        onChangeText={(value) =>
                            actualizarUseState("nombre", value)
                        }
                        keyboardType={"default"}
                        placeholder="Escribe aqui algo adicional que quieres recordar"
                        color="black"
                    />
                </View>
                <Button
                    style={{ margin: 10 }}
                    icon={{
                        name: "edit",
                        size: 30,
                        color: "white",
                    }}
                    title="Añadir cita"
                    onPress={() => guardarCita()}
                    buttonStyle={{
                        backgroundColor: "#5D534A",
                        marginBottom: 20,
                        margin: 10,
                    }}
                />
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    label: {
        textAlign: "left",
        fontWeight: "bold",
        fontSize: 18,
        color: "#5D534A",
        marginTop: 5,
        marginLeft: 10,
    },
    labelFH: {
        textAlign: "center",
        fontWeight: "400",
        fontSize: 18,
        color: "#5D534A",
        marginTop: 5,
        marginLeft: 10,
    },
    input: {
        backgroundColor: "#FFF",
        margin: 10,
        height: 50,
        padding: 5,
        borderColor: "#E1E1E1",
        borderWidth: 1,
    },
    formulario: {
        zIndex: -1,
        flex: 1,
        backgroundColor: "#FFF5DA",
        margin: 10,
        paddingVertical: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,

        elevation: 8,
        borderRadius: 5,
    },
});
