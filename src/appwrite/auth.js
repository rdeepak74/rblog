import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl) // Your API Endpoint
            .setProject(conf.appwriteProjectId);//Project Id
        this.account = new Account(this.client);
        // console.log(this.account);
   
    }

    async createAccount ({email,password,name}){
        // eslint-disable-next-line no-useless-catch
        try {
            const userAccount = await this.account.create(ID.unique(),email,password, name);
            if(userAccount){
                // call another method
                return this.login(email,password);
            }else{
                return null;
            }
        } catch (error) {
            throw error;
        }
    }

    async login ({email,password}){
        // eslint-disable-next-line no-useless-catch
        try {
          return  await this.account.createEmailSession(email,password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrte server :: getCurrentUser :: error",error);
        }

        return null;
    }

    async logout (){

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrte server :: logout :: error",error)
        }
    }



}

const authService = new AuthService();

export default authService