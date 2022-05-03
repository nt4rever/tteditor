import axios from "axios";
import { apiDomain } from './../store/constants';

export default axios.create({
  baseURL: apiDomain,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  }
});