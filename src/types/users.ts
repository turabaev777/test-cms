export interface UserDTO {
  id: string;
  name: string;
  email: string;
  image: string;
  permissions: string[];
  createdAt: string;
  isAuthorized: boolean;
}

export interface UserResponse {
  email: string;
  name?: string;
  image?: string;
  permissions: string[];
}

export enum UserPermissions {
  "admin" = "Администратор",
  "moderator" = "Модерация объявлений",
  "blog" = "Блог",
  "techSupport" = "Тех. поддержка",
  "customerRequests" = "Обращения клиентов",
  "analytics" = "Аналитика",
  "stocks" = "Акции",
}
