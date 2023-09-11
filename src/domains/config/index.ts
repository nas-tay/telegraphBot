export class ConfigMod {
  private static url = "mongodb+srv://anastasia:123456789mongo@cluster0.8tssfhh.mongodb.net/KrishaKZ?retryWrites=true&w=majority";
  private static krishaUrl = "https://krisha.kz/a/show/";
  public static getDbUrl() {
    return ConfigMod.url;
  }
  public static getKrishaUrl() {
    return ConfigMod.krishaUrl;
  }
}
