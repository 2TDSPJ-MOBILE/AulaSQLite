import { generateTitleFromContentHF } from "@/src/ia/generateTitleHF";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import { useState } from "react";
import { Alert, Button, TextInput, View } from "react-native";
import { addNote } from "../src/db/notes";
import { translateToEnglish } from "@/src/services/translationService";

export default function AddNoteScreen(){
    const[title,setTitle]=useState("") //Estado do título
    const[content,setContent]=useState("")//Estado do conteúdo
    const[loading,setLoading]=useState(false)//Estado de loading da IA
    const[translated,setTranslated] = useState("")
    const[loadingTranslate,setLoadingTranslate]=useState(false)

    const router = useRouter()//hook para navegação

    //Função chamada ao pressionar "Salvar"
    function handleSave(){
        if(!title.trim()){//Validação simples com campo titulo
            Alert.alert("Atenção","Digite um título para a nota.")
            return
        }
        addNote(title,content)//Adiciona no banco
        router.back()//Volta para a tela HomeScreen
    }

    //Função para gerar o título com IA
    async function handleGenerateTitle() {
        if(!content.trim()){
            Alert.alert("Atenção","Digite algo no conteúdo antes de gerar o título.")
            return
        }
        setLoading(true)
        const generated = await generateTitleFromContentHF(content)
        if(generated){
            setTitle(generated)
            setLoading(false)
        }

    }

    async function handleTranslate() {
        //Validação simples 
        if(!content.trim()){
            Alert.alert("Atenção","Digite algum conteúdo para ser traduzido.")
            return
        }

        try{
            setLoadingTranslate(true)
            console.log("Traduzindo texto", content)

            const result = await translateToEnglish(content)
            console.log("Texto Traduzido: " , result)

            setTranslated(result)

            setLoadingTranslate(false)
        }catch(error){
            console.log("Erro na tradução",error)
            Alert.alert("Erro","Ocorreu um erro ao traduzir o texto")
        }

    }

    return(
        <View style={{flex:1,padding:20}}>
            <MotiView
                from={{opacity:0,translateX:-30}}
                animate={{opacity:1,translateX:0}}
                transition={{delay:300}}
            >
                <TextInput 
                    placeholder="Título"
                    value={title}
                    onChangeText={(value)=>setTitle(value)}
                    style={{borderWidth:1,padding:10,
                    marginBottom:10,borderRadius:6
                }}/>
            </MotiView>
            
            <MotiView
                from={{opacity:0,translateX:30}}
                animate={{opacity:1,translateX:0}}
                transition={{delay:300}}
            >
            <TextInput 
                placeholder="Conteúdo"
                value={content}
                onChangeText={(value)=>setContent(value)}
                multiline
                style={{borderWidth:1,padding:10,
                    height:120, borderRadius:6,
                    marginBottom:10
                }}
            />
            </MotiView>

            <MotiView
                from={{opacity:0,translateX:30}}
                animate={{opacity:1,translateX:0}}
                transition={{delay:300}}
            >
            <TextInput 
                placeholder="Translation in English"
                value={translated || ""} //Garantir que nunca seja undefined
                onChangeText={(value)=>setContent(value)}
                editable={false}
                multiline
                style={{borderWidth:1,padding:10,
                    height:120, borderRadius:6,
                    marginBottom:10
                }}
            />
            </MotiView>
            
            <MotiView
                style={{marginBottom:10}}
                from={{opacity:0.8,scale:1}}
                animate={{opacity:1,scale:1.05}}
                transition={{
                    loop:true,
                    type:'timing',
                    duration:1000
                }}
            >
                
             <Button
                title="Gerar Título com IA"
                onPress={handleGenerateTitle}
                disabled={loading}
                color="red"
             />
            </MotiView>
            <MotiView
                style={{marginBottom:10}}
                from={{opacity:0.8,scale:1}}
                animate={{opacity:1,scale:1.05}}
                transition={{
                    loop:true,
                    type:'timing',
                    duration:1000
                }}
            >
                
             <Button
                title="Traduzir para o inglês"
                onPress={handleTranslate}
                disabled={loadingTranslate}
                color="red"
             />
            </MotiView>

            <MotiView
                from={{opacity:0.8,scale:1}}
                animate={{opacity:1,scale:1.05}}
                transition={{
                    loop:true,
                    type:'timing',
                    duration:1000
                }}
            >

             <Button title="SALVAR" onPress={handleSave} color="red"/>
            </MotiView>
            
        </View>
    )
}