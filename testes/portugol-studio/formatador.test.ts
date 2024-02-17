import * as sistemaOperacional from 'os';

import { FormatadorPortugolStudio } from '../../fontes/formatadores';
import { LexadorPortugolStudio } from '../../fontes/lexador/dialetos';
import { AvaliadorSintaticoPortugolStudio } from '../../fontes/avaliador-sintatico/dialetos';

describe('Formatadores > Portugol Studio', () => {
    const formatador = new FormatadorPortugolStudio(sistemaOperacional.EOL);
    const avaliadorSintatico = new AvaliadorSintaticoPortugolStudio();
    const lexador = new LexadorPortugolStudio();

    it('Olá mundo', () => {
        const retornoLexador = lexador.mapear([
            'programa',
            '{',
            '   ',
            '    funcao inicio()',
            '    {',
            '        escreva("Olá Mundo")',
            '    }',
            '}'
        ], -1);
        const retornoAvaliadorSintatico = avaliadorSintatico.analisar(retornoLexador, -1);
        const resultado = formatador.formatar(retornoAvaliadorSintatico.declaracoes);
        const linhasResultado = resultado.split(sistemaOperacional.EOL);

        expect(linhasResultado).toHaveLength(6);
    });
    it('Sucesso - Estruturas de dados', () => {
        const retornoLexador = lexador.mapear(
            [
                'programa',
                '{',
                '    inteiro variavel',
                '    ',
                '    funcao inicio()',
                '    {',
                '        inteiro outra_variavel',
                '        real altura = 1.79',
                '        cadeia frase = "Isso é uma variável do tipo cadeia"',
                '        caracter inicial = \'P\'',
                '        logico exemplo = falso',
                '        escreva(altura)',
                '    }',
                '}'
            ],
            -1
        );
        const retornoAvaliadorSintatico = avaliadorSintatico.analisar(retornoLexador, -1);
        const resultado = formatador.formatar(retornoAvaliadorSintatico.declaracoes);
        const linhasResultado = resultado.split(sistemaOperacional.EOL);

        expect(retornoAvaliadorSintatico).toBeTruthy();
        expect(retornoAvaliadorSintatico.declaracoes.length).toBeGreaterThan(0);
        expect(linhasResultado).toHaveLength(12);
    });
    it('Sucesso - Agrupamento', async () => {
        const retornoLexador = lexador.mapear([
            'programa',
            '{',
            '    funcao inicio()',
            '    {',
            '        inteiro base',
            '        inteiro altura',
            '        inteiro area',
            '        escreva("Insira a base: ")',
            '        leia(base)',
            '        escreva("Insira a altura: ")',
            '        leia(altura)',
            '        area = (base * altura) / 2',
            '        escreva("A area do triangulo é: ", area)',
            '    }',
            '}'
        ], -1);

        const retornoAvaliadorSintatico = avaliadorSintatico.analisar(retornoLexador, -1);
        const resultado = formatador.formatar(retornoAvaliadorSintatico.declaracoes);
        const linhasResultado = resultado.split(sistemaOperacional.EOL);

        expect(retornoAvaliadorSintatico).toBeTruthy();
        expect(retornoAvaliadorSintatico.declaracoes.length).toBeGreaterThan(0);
        expect(linhasResultado).toHaveLength(14);
    });

    it('Sucesso - Funções', () => {
        const retornoLexador = lexador.mapear([
            'programa',
            '{',
            '    funcao inicio()',
            '    {',
            '      mensagem("Bem Vindo")',
            '      escreva("O resultado do primeiro cálculo é: ", calcula (3.0, 4.0))',
            '      escreva("O resultado do segundo cálculo é: ", calcula (7.0, 2.0))',
            '      mensagem("Tchau")',
            '    }',
            '',
            '    funcao mensagem (cadeia texto)',
            '    {',
            '        inteiro i',
            '        ',
            '        para (i = 0; i < 50; i++)',
            '        {',
            '          escreva ("-")',
            '        }',
            '        ',
            '        escreva (texto)',
            '        ',
            '        para (i = 0; i < 50; i++)',
            '        {',
            '          escreva ("-")',
            '        }',
            '        ',
            '        escreva("")',
            '    }',
            '',
            '    funcao real calcula (real a, real b)',
            '    {',
            '        real resultado',
            '        resultado = a * a + b * b',
            '        retorne resultado',
            '    }',
            '}'
        ], -1);

        const retornoAvaliadorSintatico = avaliadorSintatico.analisar(retornoLexador, -1);
        const resultado = formatador.formatar(retornoAvaliadorSintatico.declaracoes);
        const linhasResultado = resultado.split(sistemaOperacional.EOL);
        console.log(resultado)
        expect(retornoAvaliadorSintatico).toBeTruthy();
        expect(retornoAvaliadorSintatico.erros).toHaveLength(0);
    });

    it('Estrutura condicional - se e senao.', () => {
        const retornoLexador = lexador.mapear(
            [
                'programa',
                '{',
                '    funcao inicio()',
                '    {',
                '        real numeroUm, numeroDois, soma',
                '        numeroUm = 12.0',
                '        numeroDois = 20.0',
                '        soma = numeroUm + numeroDois',
                '        se (soma > 20)',
                '        {',
                '            escreva("Numero maior que 20")',
                '        }',
                '        senao',
                '        {',
                '            escreva("Numero menor que 20")',
                '        }',
                '    }',
                '}',
            ],
            -1
        );

        const retornoAvaliadorSintatico = avaliadorSintatico.analisar(retornoLexador, -1);
        const resultado = formatador.formatar(retornoAvaliadorSintatico.declaracoes);
        const linhasResultado = resultado.split(sistemaOperacional.EOL);
        console.log(resultado)
        expect(retornoAvaliadorSintatico).toBeTruthy();
        expect(retornoAvaliadorSintatico.declaracoes.length).toBeGreaterThan(0);
    });

    it('Estruturas de repetição - Enquanto', () => {
        const resultado = lexador.mapear([
            'programa',
            '{',
            '    funcao inicio()',
            '    {',
            '        inteiro numero, atual = 1, fatorial = 1',
            '        ',
            '        escreva("Digite um numero: ")',
            '        leia(numero)',
            '        ',
            '        enquanto (atual <= numero)',
            '        {',
            '            fatorial = fatorial * atual',
            '            atual = atual + 1',
            '        }',
            '        ',
            '        escreva("O fatorial de ", numero, " é: ", fatorial, "\n")',
            '    }',
            '}'
        ], -1);

        const retornoAvaliadorSintatico = avaliadorSintatico.analisar(resultado, -1);

        expect(retornoAvaliadorSintatico).toBeTruthy();
        expect(retornoAvaliadorSintatico.declaracoes.length).toBeGreaterThan(0);
    });

});
