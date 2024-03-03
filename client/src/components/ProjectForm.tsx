import { forwardRef, useImperativeHandle, useState } from 'react';

type Props = {
  addProject: (projectObject: { name: string }) => Promise<void>;
  updateProject: (projectObject: { name: string; id: string }) => Promise<void>;
  hideProjectForm: () => void;
  showProjectForm: () => void;
};

const ProjectForm = forwardRef(
  (
    { addProject, updateProject, showProjectForm, hideProjectForm }: Props,
    ref,
  ) => {
    const [projectName, setProjectName] = useState('');

    const [isUpdating, setIsUpdating] = useState(false);
    const [projectId, setProjectId] = useState('');

    const setProjectFormEdit = (taskObject: { name: string; id: string }) => {
      setIsUpdating(true);

      setProjectName(taskObject.name);
      setProjectId(taskObject.id);

      showProjectForm();
    };

    const handleSubmit = async (event: React.SyntheticEvent) => {
      event.preventDefault();
      if (isUpdating) {
        await updateProject({
          name: projectName,
          id: projectId,
        });
      } else {
        await addProject({ name: projectName });
      }
      clearForms();
    };

    const clearForms = () => {
      hideProjectForm();
      setProjectName('');
      setProjectId('');
      setIsUpdating(false);
    };

    useImperativeHandle(ref, () => {
      return { setProjectFormEdit, clearForms };
    });

    return (
      <form id="project-form" onSubmit={handleSubmit}>
        <input
          type="text"
          id="project-name-input"
          data-test="project-name-input"
          placeholder="Project name"
          value={projectName}
          onChange={({ target }) => {
            setProjectName(target.value);
          }}
          required
        />
        <button data-test="add-project-button" type="submit">
          {isUpdating ? 'Update' : 'Add'}
        </button>
        <button type="button" onClick={clearForms}>
          Cancel
        </button>
      </form>
    );
  },
);

export default ProjectForm;
