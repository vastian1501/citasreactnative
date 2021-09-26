import React, { useState } from "react";
import { Text, ScrollView, StyleSheet, TextInput, View } from "react-native";
import { Button, Input } from "react-native-elements";

import firebase from "../database/Firebase";

export const Clientes = (props) => {
    const [cliente, setCliente] = useState({
        nombre: "",
        apellidos: "",
        telefono: "",
    });

    const actualizarUseState = (name, value) => {
        setCliente({ ...cliente, [name]: value });
    };

    const guardarNuevoCliente = async () => {
        if (
            cliente.nombre === "" ||
            cliente.apellidos === "" ||
            cliente.telefono === ""
        ) {
            alert("Rellene todos los campos");
        } else {
            try {
                await firebase.db.collection("clientes").add({
                    nombre: cliente.nombre,
                    apellidos: cliente.apellidos,
                    telefono: cliente.telefono,
                });
                alert("Nuevo cliente añadido");
                props.navigation.navigate("listaClientes");
            } catch (error) {
                console.log(error);
                alert("Ocurrio un error al guardar los datos");
            }
        }
    };
    return (
        <>
            <ScrollView style={styles.formulario}>
                <View>
                    <Text style={styles.label}>Nombre</Text>
                    <Input
                        placeholder="Sara"
                        leftIcon={{
                            type: "font-awesome",
                            name: "user",
                            color: "#5D534A",
                        }}
                        onChangeText={(value) =>
                            actualizarUseState("nombre", value)
                        }
                    />
                    <Text style={styles.label}>Apellidos</Text>
                    <Input
                        placeholder="Tancredi Burrows"
                        leftIcon={{
                            type: "font-awesome",
                            name: "user",
                            color: "#5D534A",
                        }}
                        onChangeText={(value) =>
                            actualizarUseState("apellidos", value)
                        }
                    />
                    <Text style={styles.label}>Número</Text>
                    <Input
                        placeholder="655655655"
                        keyboardType="numeric"
                        leftIcon={{
                            type: "font-awesome",
                            name: "mobile",
                            color: "#5D534A",
                        }}
                        onChangeText={(value) =>
                            actualizarUseState("telefono", value)
                        }
                    />
                </View>

                <Button
                    style={{ margin: 10 }}
                    icon={{
                        type: "font-awesome",
                        name: "user-plus",
                        //size: 30,
                        color: "white",
                    }}
                    title="Guardar clienta"
                    onPress={() => guardarNuevoCliente()}
                    buttonStyle={{
                        backgroundColor: "#5D534A",
                        marginBottom: 20,
                        margin: 10,
                    }}
                />
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    label: {
        textAlign: "left",
        fontWeight: "bold",
        fontSize: 15,
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
        backgroundColor: "#FFCAD4",
        paddingTop: 30,
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
    },
});
