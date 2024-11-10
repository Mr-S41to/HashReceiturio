const fs = require('fs');  // Módulo do Node.js para manipulação de arquivos
const path = require('path');  // Módulo para manipulação de caminhos de arquivos
const { generatePDFHash } = require('../generatePDFHash');  // Importa a função a ser testada

describe('generatePDFHash Functionality Tests', () => {
    const mockPDFPath = './tests/mock.pdf';  // Caminho do arquivo de teste

    // Antes de rodar os testes, cria um arquivo PDF de mock
    beforeAll(() => {
        // Cria um diretório de testes caso ele não exista
        if (!fs.existsSync('./tests')) {
            fs.mkdirSync('./tests');
        }
        // Cria um arquivo PDF mock para os testes
        fs.writeFileSync(mockPDFPath, 'mock pdf data');
    });

    // Após rodar os testes, remove o arquivo PDF de mock
    afterAll(() => {
        fs.unlinkSync(mockPDFPath);
    });

    // Teste 1: Verifica se o hash gerado é correto para um arquivo PDF válido
    test('should generate correct SHA-256 hash for a valid PDF file', async () => {
        const expectedHash = '20f05a4f72117c5dcdfbabfe37e4f33410b11d865c066d9ef81a922e2607c6ec';  // Hash esperado
        const hash = await generatePDFHash(mockPDFPath);  // Gera o hash do PDF mock
        expect(hash).toBe(expectedHash);  // Compara com o hash esperado
    });

    // Teste 2: Verifica se gera erro ao tentar gerar o hash de um arquivo que não existe
    test('should throw an error if file does not exist', async () => {
        await expect(generatePDFHash('./tests/nonexistent.pdf')).rejects.toThrow();  // Espera um erro
    });

    // Teste 3: Verifica se gera erro ao tentar gerar o hash de um arquivo que não seja PDF
    test('should throw an error if path is not a PDF file', async () => {
        const notAPDFPath = './tests/notapdf.txt';  // Caminho para um arquivo não-PDF
        fs.writeFileSync(notAPDFPath, 'not a pdf');  // Cria o arquivo de texto
        // Espera que a função gere um erro indicando que o arquivo não é um PDF
        await expect(generatePDFHash(notAPDFPath)).rejects.toThrow('O arquivo fornecido não é um PDF.');
        fs.unlinkSync(notAPDFPath);  // Remove o arquivo de teste após o teste
    });
});
