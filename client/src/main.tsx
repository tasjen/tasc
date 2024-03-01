import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ProjectFormContextProvider } from './context/ProjectFormContext.tsx';
import { TaskFormContextProvider } from './context/TaskFormContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ProjectFormContextProvider>
    <TaskFormContextProvider>
      <App />
    </TaskFormContextProvider>
  </ProjectFormContextProvider>,
);
