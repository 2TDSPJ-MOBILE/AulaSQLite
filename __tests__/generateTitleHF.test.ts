import axios from "axios";

import { generateTitleFromContentHF } from "../src/ia/generateTitleHF";

//Módulo para simular chamadas à API
//Logo não é realizado chamadas reais
jest.mock("axios")

//Criando uma versão tipado do mock 
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Função para testar generateTitleFromContentHF",()=>{
    it("deve retornar o título gerado pela IA", async()=>{
        //Simula uma resposta bem-sucedida pela plataforma HF
        mockedAxios.post.mockResolvedValueOnce({
            // A função `generateTitleFromContentHF` procura por
            // `summary_text` ou `generated_text`, então o mock deve
            // fornecer `summary_text` para simular corretamente a API.
            data:[{summary_text:"Título curto"}]
        })

        //chama a função que está sendo testada
        const result = await generateTitleFromContentHF("Texto Exemplo")

        //Verifica se o resultado corresponde ao texto esperado
        expect(result).toBe("Título curto")
    });

    it("dever retornar vazio se o texto for em branco", async()=>{
        //Chama a função que está sendo testado e passa o texto em branco
        const result = await generateTitleFromContentHF(" ")

        //Espera-se que o retorno seja uma string vazia
        expect(result).toBe("")
    })
})