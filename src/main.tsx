// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
// import './index.css'

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )

import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'

// Import the generated route tree
import { routeTree } from './routeTree.gen'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from '@mui/material'
import { theme } from './theme'

const queryClient = new QueryClient({defaultOptions:{queries:{retry() {
    return false;
},}}});

// Create a new router instance
const router = createRouter({ routeTree, context: {queryClient} })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
        <ThemeProvider theme={theme}>
           <QueryClientProvider client={queryClient}>
              <RouterProvider router={router} />
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
         </ThemeProvider>
    </StrictMode>,
  )
}