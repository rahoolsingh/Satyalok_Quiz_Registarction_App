import { Client, Databases, Storage, ID } from "appwrite";

class AppwriteClient {
    constructor() {
        this.client = new Client()
            .setEndpoint("https://cloud.appwrite.io/v1")
            .setProject("664cd226000ffa752eab");

        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createDocument(documentData) {
        try {
            const response = await this.databases.createDocument(
                "664cd2a4000f7bcf061f", // Replace this with your Database ID
                "664cd3130024ecc1bc35", // Replace this with your Collection ID
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
                "664cdc16001c7307443b", // Replace with your actual bucket ID
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
