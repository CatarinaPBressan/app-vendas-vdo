import * as Sentry from "@sentry/browser";

export const setUpSentry = () => {
  if (process.env.NODE_ENV !== "development") {
    Sentry.init({
      environment: process.env.NODE_ENV,
      dsn: "https://0a4ca54d1c45413b84e05c8eba20eb90@sentry.io/2825670",
    });
  }
};
