![yorubanner](https://github.com/pk-vishnu/yoru-chat/assets/115440233/5e765002-cd6b-42d7-88c7-538a0529ce1d)

# About
This application leverages the Web Crypto API to implement end-to-end encryption (E2EE) using the RSA-OAEP algorithm.

# Features
- **End-to-End Encryption (E2EE)**: Utilizes RSA-OAEP algorithm for asymmetric encryption. Messages are encrypted using the recipient's public key and decrypted using their private key.
- **Symmetric Encryption with AES-GCM**: Ensures secure storage of sent messages.
- **Text and Image Support**: Send text and images.

# Run Locally
## Client
1. Navigate to the `client` folder.
2. Install dependencies:
   ```bash
   npm install
3. Start client application
   ```bash
   npm run start

## Server
1.  Navigate to the `server` folder.
2.  Install dependencies
     ```bash
     npm install
3.  Start the server
    ```bash
    npm run start
