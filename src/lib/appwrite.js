import { Client, Databases, Storage, ID } from "appwrite";

class AppwriteClient {
    constructor() {
        console.log(
            process.env.REACT_APP_APPWRITE_ENDPOINT,
        );
        this.client = new Client()
            .setEndpoint(process.env.REACT_APP_APPWRITE_ENDPOINT) // Your API Endpoint
            .setProject(process.env.REACT_APP_APPWRITE_PROJECT_ID); // Your Project ID

        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);

        console.log(this.client, this.databases, this.storage);
    }

    async createDocument(documentData) {
        try {
            const response = await this.databases.createDocument(
                process.env.REACT_APP_APPWRITE_DATABASE_ID, // Replace this with your Database ID
                process.env.REACT_APP_APPWRITE_COLLECTION_ID, // Replace this with your Collection ID
                ID.unique(),
                documentData
            );
            console.log(response);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async uploadPhoto(file) {
        try {
            const response = await this.storage.createFile(
                process.env.REACT_APP_APPWRITE_STORAGE_BUCKET_ID, // Replace with your actual bucket ID
                ID.unique(),
                file
            );
            // console.log(response);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

const appwriteClient = new AppwriteClient();

export default AppwriteClient;
export { appwriteClient };
