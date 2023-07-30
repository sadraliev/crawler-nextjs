interface IConfiguration {
  getUrl(): string;
}

class ConfigurationSkeleton implements IConfiguration {
  private baseUrl: string = "";
  private static instance: ConfigurationSkeleton | null = null;

  private constructor() {
    if (!process.env.NEXT_PUBLIC_BASE_URL) {
      throw new Error("You need to specify path to parsed data");
    }
    this.baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  }

  public static getInstance(): ConfigurationSkeleton {
    if (!this.instance) {
      this.instance = new ConfigurationSkeleton();
    }
    return this.instance;
  }

  getUrl(): string {
    return this.baseUrl;
  }
}

export const configuration = ConfigurationSkeleton.getInstance();
