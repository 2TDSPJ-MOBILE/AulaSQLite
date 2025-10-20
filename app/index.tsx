import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { deleteNote, getNotes } from "../src/db/notes";

export default function HomeScreen() {
  const[notes,setNotes]=useState<any[]>([]) //Estado será para armazenar todas as notas
  const router = useRouter() //Hook de navegação

  //Sempre será executado quando a tela estiver em foco
  useFocusEffect(
    useCallback(()=>{
      setNotes(getNotes())//Carrega as notas do banco
    },[])
  )

  //Função para deletar a nota
  function handleDelete(id:number){
    deleteNote(id)//Deleta do banco de dados SQLite
    setNotes(getNotes())//Atualiza a lista sem a nota que removida na linha acima
  }

  return (
    <View
      style={styles.container}
    >
      <Button title="Adicionar Nota" onPress={()=>router.push("/add")}/>
      
      <FlatList 
        data={notes}
        keyExtractor={item=>item.id.toString()}
        renderItem={({item})=>(
          <View
            style={{
              borderBottomWidth:1,
              padding:10,
              marginBottom:5
            }}
          > 
            <Text style={{fontWeight:'bold'}}>{item.title}</Text>
            <Text>{item.content}</Text>
            <Text>ID:{item.id}</Text>

            <View style={{flexDirection:'row',gap:5,marginTop:5}}>
              {/* Botão Editar */}
              <View style={{width:100}}>
                <Button
                  title="Editar"
                  onPress={()=>router.push(`/edit/${item.id}`)}
                />
              </View>
              {/* Botão Deletar */}
              <View style={{width:100}}>
                <Button 
                  title="Deletar" color="#bb0c0cff"
                  onPress={()=>handleDelete(item.id)}  
                />
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container:{
    flex:1
  }
})