//искуственная зарержка js
export class Utils {
  public static async sleep(milliseconds: number) {
    await new Promise<void>((resolve) => setTimeout(resolve, milliseconds));
  }
}
