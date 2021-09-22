import React, { useEffect, useState } from 'react'
import {ScrollView, Text} from 'react-native'

import { ListItem, Avatar, Icon, Button } from "react-native-elements";
import firebase from '../database/Firebase';

export const ListaClientes = (props) => {
    const [clientes, setClientes] = useState([])

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
        <ScrollView>
            <Button
                title="Añadir nuevo cliente"
                color="red"
                onPress={() => props.navigation.navigate("nuevoCliente")}
            />
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
    );
}
