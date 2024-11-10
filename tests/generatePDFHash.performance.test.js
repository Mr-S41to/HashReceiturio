const fs = require('fs');  // Módulo do Node.js para manipulação de arquivos
const { generatePDFHash } = require('../generatePDFHash');  // Importa a função a ser testada

describe('generatePDFHash Performance Tests', () => {
    const largePDFPath = './tests/large_mock.pdf';  // Caminho do arquivo PDF grande de teste

    // Cria um arquivo PDF grande de mock para os testes
    beforeAll(() => {
        if (!fs.existsSync('./tests')) {
            fs.mkdirSync('./tests');
        }
        // Simula a criação de um PDF grande (com dados fictícios)
        const largeData = 'a'.repeat(1024 * 1024 * 10);  // 10MB de dados
        fs.writeFileSync(largePDFPath, largeData);
    });

    // Remove o arquivo PDF grande após os testes
    afterAll(() => {
        fs.unlinkSync(largePDFPath);
    });

    // Teste de performance: verifica se o tempo de execução para arquivos grandes é aceitável
    test('should complete within acceptable time for large PDF files', async () => {
        const startTime = Date.now();  // Marca o início do tempo de execução
        await generatePDFHash(largePDFPath);  // Gera o hash do arquivo grande
        const endTime = Date.now();  // Marca o fim do tempo de execução
        const duration = endTime - startTime;  // Calcula o tempo total de execução
        expect(duration).toBeLessThan(2000);  // Espera que o tempo de execução seja menor que 2 segundos
    });
});
