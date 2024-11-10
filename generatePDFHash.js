const crypto = require('crypto');  // Módulo do Node.js para criptografia (usaremos o SHA-256)
const fs = require('fs');          // Módulo do Node.js para manipulação de arquivos
const path = require('path');      // Módulo para manipulação de caminhos de arquivos

/**
 * Função para gerar o hash SHA-256 de um arquivo PDF.
 * @param {string} filePath - Caminho do arquivo PDF.
 * @returns {Promise<string>} - Retorna uma Promise com o hash SHA-256 do arquivo em formato hexadecimal.
 */
function generatePDFHash(filePath) {
    return new Promise((resolve, reject) => {
        // Verificação de extensão do arquivo para garantir que seja um arquivo PDF
        if (path.extname(filePath).toLowerCase() !== '.pdf') {
            // Se não for PDF, rejeita a Promise com um erro
            return reject(new Error('O arquivo fornecido não é um PDF.'));
        }

        const hash = crypto.createHash('sha256');  // Cria um objeto de hash SHA-256
        const stream = fs.createReadStream(filePath);  // Cria um stream de leitura do arquivo

        // Quando um pedaço de dados é lido do arquivo, atualiza o hash
        stream.on('data', (chunk) => {
            hash.update(chunk);
        });

        // Quando o stream terminar de ler os dados, resolve a Promise com o hash final
        stream.on('end', () => {
            resolve(hash.digest('hex'));  // Retorna o hash em formato hexadecimal
        });

        // Caso ocorra algum erro ao ler o arquivo, a Promise será rejeitada
        stream.on('error', (err) => {
            reject(err);
        });
    });
}

module.exports = { generatePDFHash };  // Exporta a função para uso em outros módulos
