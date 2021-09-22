import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Card, ListItem, Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import shortid from "shortid";
import firebase from "../database/Firebase";

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

export default function Formulario(
    props
) {
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
    //Se ha podido guardar la cita en la base de datos, el problema es que no se consigue
    //guardar la fechaCita (undefined) del state citas.

    const [citas, setCitas] = useState({
        idcliente: "",
        nombre: "",
        apellidos: "",
        telefono: "",
        manos: "",
        pies: "",
        fechaCita: "",
        hora: "",
        comentarios: "",
    });

    const [manos, guardarManos] = useState("");
    const [pies, guardarPies] = useState("");
    const [fechaCita, guardarFecha] = useState("");
    const [hora, guardarHora] = useState("");
    const [comentarios, guardarComentarios] = useState("");

    // const [fechaCita, setFechaCita] = useState({
    //     fecha: "",
    // });

    const actualizarUseState = (name, value) => {
        setCitas({ ...citas, [name]: value });
    };
    // const actualizarUseStateFecha = (name, value) => {
    //     setFechaCita({ ...fechaCita, [name]: value });
    // };

    //Funcion setState para gaurdar objecto dentro de un objeto
    // const actualizarUseStateCliente = (name, value) => {
    //     setCitas({
    //         ...citas,
    //         cliente: {
    //             ...citas.cliente,
    //             [name]: value,
    //         },
    //     });
    // };

    const guardarNombre = async (valueId) => {
        console.log("funciona" + valueId);

        const dbRef = firebase.db.collection("clientes").doc(valueId);
        await dbRef
            .get()
            .then((doc) => {
                const { nombre, apellidos, telefono } = doc.data();
                const clientes = {
                    idclientes: doc.id,
                    nombre: nombre,
                    apellidos: apellidos,
                    telefono: telefono,
                };

                // console.log(nombre, apellidos, telefono);
                // setCitas+
                setCitas(clientes);
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
        console.log(citas);
    };

    const guardarNuevaCita = async () => {
        // setLoading(true);
        if (
            citas.nombre === "" ||
            manos === "" ||
            pies === "" ||
            fechaCita === "" ||
            hora === "" ||
            comentarios === ""
        ) {
            mostrarAlerta();
        } else {
            try {
                await firebase.db.collection("citas").add({
                    nombre: citas.nombre,
                    apellidos: citas.apellidos,
                    telefono: citas.telefono,
                    manos: manos,
                    pies: pies,
                    fecha: fechaCita,
                    hora: hora,
                    comentarios: comentarios
                });
                Alert.alert("Nueva cita", "Cita creada con exito");
                props.navigation.navigate("citas");
            } catch (error) {
                console.log(error);
                alert("Ocurrio un error al guardar los datos");
            }
        }
    };

    // const guardarCita = () => {
    //     if (
    //         (cliente.trim() === "") |
    //         (manos.trim() === "") |
    //         (pies.trim() === "") |
    //         (fechaCita.trim() === "") |
    //         (hora.trim() === "")
    //     ) {
    //         mostrarAlerta();
    //         return;
    //     }
    //     //Crear nueva citas
    //     const cita = {
    //         id,
    //         cliente,
    //         manos,
    //         pies,
    //         fechaCita,
    //         hora,
    //         comentarios,
    //     };

    //     cita.id = shortid.generate();
    //     //Agregar al state citas
    //     const citasNuevo = [...citas, cita];
    //     setCitas(citasNuevo);
    //     //Ocultar formulario
    //     guardarMostrarForm(false);
    //     //Resetear formularionpm
    // };

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
    function checkTime(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }
    //Opciones dateTimePicker
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === "ios");
        setDate(currentDate);
        // guardarFecha(currentDate.toLocaleDateString());
        // const fecha = {fechaCita: '12/12/12'}
        // setCitas(fecha);
        // guardarHora(checkTime(currentDate.getHours()) + ":" + checkTime(currentDate.getMinutes()));
        guardarHora(
            checkTime(currentDate.getHours()) +
                ":" +
                checkTime(currentDate.getMinutes())
        );
        // const fechaGuardar = currentDate.toLocaleDateString().toString();
        // actualizarUseStateFecha("fecha", fechaGuardar);
        const hoy = new Date(currentDate);
        const dias = [
            "Domingo",
            "Lunes",
            "Martes",
            "Miercoles",
            "Jueves",
            "Viernes",
            "Sabado",
        ];

        guardarFecha(
            // dias[hoy.getDay()] +
            //     " " +
                hoy.getMonth() + 1 + '/'+ hoy.getDate() + "/" + hoy.getFullYear()
        );
        console.log("Hola me estoy ejecutando" + fechaCita);
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
                        onValueChange={(value) => guardarNombre(value)}
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
                            guardarManos(value)
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
                            guardarPies(value)
                        }
                        placeholder=" Ejemplo: semipermanentes, acrilicos o nada"
                        color="black"
                    />
                </View>
                <View>
                    <Text style={styles.label}>Fecha</Text>
                    <Text style={styles.labelFH}>
                        {/* {fechaNormalCita.getDate() +
                        "/" +
                        (fechaNormalCita.getMonth() + 1) +
                        "/" +
                        fechaNormalCita.getFullYear()} */}
                        {fechaCita}
                    </Text>
                    <Button
                        onPress={() => showMode("date")}
                        title="Seleccionar fecha"
                        buttonStyle={{ backgroundColor: "#D6D2C4", margin: 10 }}
                    />
                </View>

                <View>
                    <Text style={styles.label}>Hora</Text>
                    <Text style={styles.labelFH}>{hora}</Text>
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

                <View>
                    <Text style={styles.label}>Comentarios</Text>
                    <TextInput
                        multiline
                        style={styles.input}
                        onChangeText={(value) =>
                            guardarComentarios(value)
                        }
                        keyboardType={"default"}
                        placeholder="Escribe aqui algo adicional que quieres recordar"
                        color="black"
                    />
                    {/* <Input
                        placeholder="Comment"
                        leftIcon={{ type: "font-awesome", name: "comment" }}
                    /> */}
                </View>
                <Button
                    style={{ margin: 10 }}
                    icon={{
                        name: "edit",
                        size: 30,
                        color: "white",
                    }}
                    title="Añadir cita"
                    onPress={() => guardarNuevaCita()}
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
