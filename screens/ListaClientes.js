import React, { useEffect, useState } from "react";
import { ScrollView, Text, StyleSheet } from "react-native";

import { ListItem, Avatar, Icon, Button } from "react-native-elements";
import firebase from "../database/Firebase";

export const ListaClientes = (props) => {
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

            const sortByName = () => {
                const sortClientes = [...clientes].sort((a, b) => {
                    if (a.nombre.toLowerCase() < b.nombre.toLowerCase()) {
                        return -1;
                    }
                    if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) {
                        return 1;
                    }
                    return 0;
                });
                setClientes(sortClientes);
            };
            sortByName();
        });
    }, []);
    return (
        <>
        <ScrollView>
            
            <Text style={styles.subtituloCP}>
                {clientes.length > 0
                    ? "Todas las clientas"
                    : "Todavia no tienes clientas, pulsa en crear para añadir una nueva"}
            </Text>
            {clientes.map((cliente) => {
                return (
                    <ListItem
                        key={cliente.id}
                        onPress={() =>
                            props.navigation.navigate("detallesCliente", {
                                userId: cliente.id,
                            })
                        }
                        bottomDivider
                    >
                        <Avatar
                            rounded
                            source={{
                                uri: "https://i.pinimg.com/474x/55/3f/d8/553fd8bb36937cbb266a3fe2f5d70fae.jpg",
                            }}
                        />
                        <ListItem.Content>
                            <ListItem.Title>
                                {cliente.nombre + " " + cliente.apellidos}
                            </ListItem.Title>
                            <ListItem.Subtitle>
                                {cliente.telefono}
                            </ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                );
            })}
        </ScrollView>
        <Button
                title="Crear nueva clienta"
                icon={<Icon name="person" color="white" />}
                buttonStyle={{
                    backgroundColor: "#E55777",
                    margin: 5,
                }}
                onPress={() => props.navigation.navigate("nuevoCliente")}
            />
        </>
    );
};

const styles = StyleSheet.create({
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
        fontSize: 20,
        padding: 10,
        fontWeight: "300",
        color: "#5D534A",
        backgroundColor: "#FFFFFF",
    },
});

