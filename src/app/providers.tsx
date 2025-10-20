"use client";

import { SidebarProvider } from "@/components/Layouts/sidebar/sidebar-context";
import { ThemeProvider } from "next-themes";
import { Provider } from 'react-redux';
import store from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from '../redux/store/persistor';
import React from 'react';
import NextNProgress from 'nextjs-progressbar';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider defaultTheme="light" attribute="class">
            <NextNProgress />
          <SidebarProvider>
            {children}
          </SidebarProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
