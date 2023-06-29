import { Analytics } from "@vercel/analytics/react";
import { SessionProvider } from "next-auth/react";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "@/styles/globals.css";

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
  },
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <SessionProvider session={session}>
        <ThemeProvider theme={darkTheme}>
          <main>
            <Component {...pageProps} />
            <Analytics />
          </main>
        </ThemeProvider>
      </SessionProvider>
    </AnimatePresence>
  );
}
