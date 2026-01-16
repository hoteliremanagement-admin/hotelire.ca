// lib/api/getUser.ts
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const authCheck = async () => {
  try {
    const res = await axios.get(`${baseUrl}/auth/me`, { withCredentials: true });
    return res.data.user;
  } catch {
    try {
      const res = await axios.post(`${baseUrl}/auth/logout`, {}, { withCredentials: true });    // kyun ka post ma kuch bhejo {}
    }catch(ex){
      return null; 
    }
    return null; //   not authenticated
  }
};
