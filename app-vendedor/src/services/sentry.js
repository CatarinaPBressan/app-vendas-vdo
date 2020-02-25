import * as Sentry from "@sentry/browser";

export const setUpSentry = () => {
  if (process.env.NODE_ENV !== "development") {
    Sentry.init({
      dsn: process.env.REACT_APP_SENTRY_DSN,
    });
  }
};
