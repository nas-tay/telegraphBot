//искуственная зарержка js
export class Utils {
  public static async sleep(ms: number) {
    await new Promise<void>((resolve) => setTimeout(resolve, ms));
  }
}
