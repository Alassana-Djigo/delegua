import * as sistemaOperacional from 'os';

import { FormatadorPortugolStudio } from "../../fontes/formatadores"
import { LexadorPortugolStudio } from '../../fontes/lexador/dialetos';
import { AvaliadorSintaticoPortugolStudio } from '../../fontes/avaliador-sintatico/dialetos';

describe("Formatadores > Portugol Studio", () => {
    const formatadorPortugolStudio = new FormatadorPortugolStudio(sistemaOperacional.EOL);
    const avaliadorSintaticoPortugolStudio = new AvaliadorSintaticoPortugolStudio();
    const lexadorPortugolStudio = new LexadorPortugolStudio();

    it("Olá mundo", () => {
        const retornoLexador = lexadorPortugolStudio.mapear([
            "programa {",
                "funcao inicio() {",
            "",      
            "    }",
            "}"
        ], -1)
        
        const retornoAvaliadorSintatico = avaliadorSintaticoPortugolStudio.analisar(retornoLexador, -1)
        /* console.log(retornoAvaliadorSintatico.declaracoes); */
        
        
        const resultado = formatadorPortugolStudio.formatar(retornoAvaliadorSintatico.declaracoes)
        
        console.log(resultado);
        
        const linhasResultado = resultado.split(sistemaOperacional.EOL)



    })

})