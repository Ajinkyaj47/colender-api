const forge = require('node-forge');
const crypto = require('crypto');
const fs = require('fs');

class CkycEncryptionUtil {
    constructor(publicKeyString) {
        try {
           /* if (!publicKeyString || publicKeyString.trim().length === 0) {
                throw new Error('Public key string is empty or null');
            }

            let trimmedKeyString = publicKeyString.trim();
            if (!trimmedKeyString.startsWith('-----BEGIN CERTIFICATE-----') ||
                !trimmedKeyString.endsWith('-----END CERTIFICATE-----')) {
                throw new Error('Invalid certificate format');
            }

            trimmedKeyString = trimmedKeyString
                .replace('-----BEGIN CERTIFICATE-----', '')
                .replace('-----END CERTIFICATE-----', '')
                .replace(/\s/g, ''); // Remove whitespaces

            const decodedKey = Buffer.from(trimmedKeyString, 'base64');

            const cert = forge.pki.certificateFromAsn1(forge.asn1.fromDer(decodedKey));

            this.publicKey = forge.pki.publicKeyToPem(cert.publicKey);*/
        } catch (e) {
            console.error(e);
            throw new Error('Could not initialize encryption module');
        }
    }

    generateSessionKey() {
        const sessionKey = crypto.randomBytes(32);
        return sessionKey;
    }

    encryptUsingPublicKey(data) {
        const encryptedData = crypto.publicEncrypt(
            { key: this.publicKey, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING },
            data
        );
        return encryptedData;
    }

    encryptUsingSessionKey(skey, data) {
        const cipher = crypto.createCipheriv('aes-256-cbc', skey, Buffer.alloc(16, 0));

        let encryptedData = cipher.update(data, 'utf-8', 'base64');
        encryptedData += cipher.final('base64');

        return Buffer.from(encryptedData, 'base64');
    }

    addTimestampToXML(xml, timestamp) {
        return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
            <PID_DATA>
                <DATE_TIME>${timestamp}</DATE_TIME>${xml.substring(xml.indexOf('<PID_DATA>') + 9)}
            </PID_DATA>`;
    }

    encodeToBase64(data) {
        return Buffer.from(data).toString('base64');
    }

    // Helper method to get current time stamp
    generateTimestamp() {
        const currentDate = new Date();
        const dateFormat = new Intl.DateTimeFormat('en', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'UTC'
        });
        return dateFormat.format(currentDate);
    }

    // ... (other methods)
}

// Example usage:
const publicKeyFileName = 'E:/aj/CKYC/cersai/keys/publickeycersai.pem'; // Replace with the actual path
const publicKeyString = fs.readFileSync(publicKeyFileName, 'utf-8');

const encryptionUtil = new CkycEncryptionUtil(publicKeyString);

const sessionKey = encryptionUtil.generateSessionKey();
console.log('Session Key:', sessionKey.toString('hex'));

const originalXml = '<PID_DATA><ID_NO>D4567890</ID_NO><ID_TYPE>A</ID_TYPE></PID_DATA>';
const timestamp = encryptionUtil.generateTimestamp();
const xmlWithTimestamp = encryptionUtil.addTimestampToXML(originalXml, timestamp);
const pid = Buffer.from(xmlWithTimestamp, 'utf-8');

console.log('Data raw XML:\n', xmlWithTimestamp);

const encryptedDataPID = encryptionUtil.encryptUsingSessionKey(sessionKey, pid);
console.log('Encrypted PID in bytes: ', encryptedDataPID);

const encodedDataPID = encryptionUtil.encodeToBase64(encryptedDataPID);
console.log('Encoded PID in base 64: ', encodedDataPID);

const encryptedSessionKey = encryptionUtil.encryptUsingPublicKey(sessionKey);
console.log('Encoded Session Key: ', encryptedSessionKey);
