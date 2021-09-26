import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, ScrollView, TextInput } from "react-native";
import { Button } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import firebase from "../database/Firebase";

export const DetallesCliente = (props) => {
    const initialState = {
        id: "",
        nombre: "",
        apellidos: "",
        telefono: "",
    };

    const [user, setUser] = useState(initialState);

    const [loading, setLoading] = useState(true);

    const findUserById = async (id) => {
        const dbRef = firebase.db.collection("clientes").doc(id);
        const doc = await dbRef.get();
        const user = doc.data();
        setUser({
            ...user,
            id: doc.id,
        });
        setLoading(false);
    };

    useEffect(() => {
        findUserById(props.route.params.userId);
    }, []);

    const actualizarUseState = (name, value) => {
        setUser({ ...user, [name]: value });
    };

    const eliminarUser = async () => {
        setLoading(true);
        const dbRef = firebase.db
            .collection("clientes")
            .doc(props.route.params.userId);
        await dbRef.delete();
        props.navigation.navigate("listaClientes");
    };

    const actualizarUser = async () => {
        setLoading(true);
        const dbRef = firebase.db.collection("clientes").doc(user.id);
        await dbRef.set({
            nombre: user.nombre,
            apellidos: user.apellidos,
            telefono: user.telefono,
        });
        setUser(initialState);
        alert("Se han actualizado los datos");
        props.navigation.navigate("userList");
    };

    const confirnmDelete = () => {
        Alert.alert(
            "Eliminar usuario",
            "¿Desea eliminar al usuario " + user.nombre + "?",
            [
                { text: "Eliminar", onPress: () => eliminarUser() },
                { text: "No", onPress: () => console.log(false) },
            ]
        );
    };

    if (loading) {
        return (
            <View>
                <ActivityIndicator size="large" color="red" />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.input}>
                <TextInput
                    placeholder="Nombre"
                    value={user.nombre}
                    onChangeText={(value) =>
                        actualizarUseState("nombre", value)
                    }
                />
            </View>
            <View style={styles.input}>
                <TextInput
                    placeholder="Apellidos"
                    value={user.apellidos}
                    onChangeText={(value) =>
                        actualizarUseState("apellidos", value)
                    }
                />
            </View>
            <View style={styles.input}>
                <TextInput
                    placeholder="Telefono"
                    value={user.telefono}
                    keyboardType="numeric"
                    onChangeText={(value) =>
                        actualizarUseState("telefono", value)
                    }
                />
            </View>
            <View style={styles.button}>
                <Button
                    title="Eliminar"
                    color="#FF6961"
                    onPress={() => confirnmDelete()}
                />
            </View>
            <View style={styles.button}>
                <Button
                    title="Guardar cambios"
                    color="#5D534A"
                    onPress={() => actualizarUser()}
                />
            </View>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
    },
    input: {
        flex: 1,
        padding: 5,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#CCC",
    },
    button: {
        flex: 1,
        padding: 5,
        marginTop: 10,
    },
});

