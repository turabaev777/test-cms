import axios from "axios";
import { UserDTO, UserResponse } from "../types/users";

export const getUsers = async (): Promise<UserDTO[]> => {
  try {
    const response = await axios.get<UserDTO[]>(
      "https://65609e9e83aba11d99d1329d.mockapi.io/api/users",
    );

    const sortedUsers = response.data.sort((a, b) => {
      return Number(b.id) - Number(a.id);
    });

    return sortedUsers;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const createUser = async (data: UserResponse): Promise<UserDTO> => {
  try {
    const response = await axios.post<UserDTO>(
      "https://65609e9e83aba11d99d1329d.mockapi.io/api/users",
      data,
    );
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const updateUser = async (
  id: string,
  data: UserResponse,
): Promise<UserDTO> => {
  try {
    const response = await axios.put<UserDTO>(
      `https://65609e9e83aba11d99d1329d.mockapi.io/api/users/${id}`,
      data,
    );
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const deleteUser = async (id: string): Promise<UserDTO[]> => {
  try {
    const response = await axios.delete<UserDTO[]>(
      `https://65609e9e83aba11d99d1329d.mockapi.io/api/users/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
