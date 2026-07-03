// @ts-nocheck
//complete an axios instance for the enginx API

import axios from "axios";
import { refreshAccessToken } from "@/services/student.auth.service";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});