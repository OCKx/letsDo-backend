
declare namespace NodeJS {
    interface ProcessEnv {
      STATIC_FILES_PATH: string;
      EMAIL_USER: string;
      HOST: string;
      DATABASE_URL: string;
      JWT_SECRET_KEY: string;
      EMAIL_PASS: string
      // Add other environment variables here
    }
  }
  