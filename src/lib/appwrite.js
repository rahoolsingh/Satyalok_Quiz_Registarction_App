import { Client, Databases, Storage, ID, Query } from "appwrite";

class AppwriteClient {
    constructor() {
        this.client = new Client()
            .setEndpoint(process.env.REACT_APP_APPWRITE_ENDPOINT) // Your API Endpoint
            .setProject(process.env.REACT_APP_APPWRITE_PROJECT_ID); // Your Project ID

        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createDocument(documentData) {
        try {
            const response = await this.databases.createDocument(
                process.env.REACT_APP_APPWRITE_DATABASE_ID, // Replace this with your Database ID
                process.env.REACT_APP_APPWRITE_COLLECTION_ID, // Replace this with your Collection ID
                ID.unique(),
                documentData
            );
            return response;
        } catch (error) {
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
            return response;
        } catch (error) {
            throw error;
        }
    }

    async checkMobilePresent(mobileNumber) {
        try {
            const response = await this.databases.listDocuments(
                process.env.REACT_APP_APPWRITE_DATABASE_ID,
                process.env.REACT_APP_APPWRITE_COLLECTION_ID,
                [
                    Query.equal('mobile', mobileNumber)
                ]
            );
            console.log(response);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

const appwriteClient = new AppwriteClient();

export default AppwriteClient;
export { appwriteClient };
