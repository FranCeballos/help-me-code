import { Analytics } from "@vercel/analytics/react";
import { SessionProvider } from "next-auth/react";
import { AnimatePresence } from "framer-motion";
import NextNProgress from "nextjs-progressbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "@/src/styles/globals.css";
import { NotificationContextProvider } from "@/src/store/notification-context";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    h1: {
      fontSize: "3.2rem",
    },
    body1: {
      fontSize: "1.6rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "small",
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: 12,
        },
      },
    },
    MuiPickersDay: {
      styleOverrides: {
        root: {
          fontSize: 16,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          fontSize: 30,
        },
      },
    },
    MuiPickersYear: {
      styleOverrides: {
        yearButton: {
          fontSize: 15,
        },
      },
    },
  },
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <NotificationContextProvider>
      <AnimatePresence mode="wait" initial={false}>
        <SessionProvider session={session}>
          <ThemeProvider theme={darkTheme}>
            <main>
              <NextNProgress />
              <Component {...pageProps} />
              <Analytics />
            </main>
          </ThemeProvider>
        </SessionProvider>
      </AnimatePresence>
    </NotificationContextProvider>
  );
}