type ConfigType = {
  mainMongoUrl: string;
  bot: string;
  redis: string;
};

export const Config: ConfigType = {
  mainMongoUrl: "mongodb+srv://anastasia:123456789mongo@cluster0.8tssfhh.mongodb.net/KrishaKZ?retryWrites=true&w=majority",
  bot: "6568336244:AAFVemkNUwGjWoORq5V-3pCbPPCHIOsoRj8",
  redis: "redis://127.0.0.1:6379",
};
