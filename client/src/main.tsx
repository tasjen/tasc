import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ProjectFormContextProvider } from './context/ProjectFormContext.tsx';
import { TaskFormContextProvider } from './context/TaskFormContext.tsx';
import { NotificationContextProvider } from './context/NotificationContext.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LogInPage, { loader as loginLoader } from './pages/LogInPage.tsx';
import Index, { loader as indexLoader } from './pages/Index.tsx';
import ProjectPage from './pages/ProjectPage.tsx';

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Index />,
        loader: indexLoader,
        children: [
          {
            path: 'projects/:projectName',
            element: <ProjectPage />,
          },
        ],
      },
      {
        path: 'login',
        element: <LogInPage />,
        loader: loginLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
      <ProjectFormContextProvider>
        <TaskFormContextProvider>
          <RouterProvider router={router} />
        </TaskFormContextProvider>
      </ProjectFormContextProvider>
    </NotificationContextProvider>
    ,
  </QueryClientProvider>,
);
