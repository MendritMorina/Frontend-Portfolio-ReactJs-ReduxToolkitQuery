import {Form, message, Modal, Select, Switch, Upload} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {
  setCurrentModalType,
  setSelectedItemForDelete,
  setSelectedItemForEdit,
  setShowAddEditModal,
  setShowDeleteModal
} from "../../redux/features/app/appSlice";
import {
  useCreateProjectMutation, useDeleteProjectMutation,
  useGetAllProjectsQuery,
  useUpdateProjectMutation
} from "../../redux/api/projectApiSlice";
import {Project} from "../../interfaces/projects.interface";
import {PaperClipOutlined} from "@ant-design/icons";
import {AppRoot} from "../../interfaces/app.interface";

const {Dragger} = Upload;


const AdminProject = () => {
  //antd
  const [form] = Form.useForm();

  // State management local
  const showAddEditModal = useSelector((state: AppRoot) => state.app.showAddEditModal);
  const selectedItemForEdit = useSelector((state: AppRoot) => state.app.selectedItemForEdit);
  const showDeleteModal = useSelector((state: AppRoot) => state.app.showDeleteModal);
  const selectedItemForDelete = useSelector((state: AppRoot) => state.app.selectedItemForDelete);
  const currentModalType = useSelector((state: AppRoot) => state.app.currentModalType);
  const dispatch = useDispatch();

  //State management api
  const {data: projects, isLoading: isProjectLoading, refetch} = useGetAllProjectsQuery('');
  const [createProject] = useCreateProjectMutation();
  const [updateProject] = useUpdateProjectMutation();
  const [deleteProject] = useDeleteProjectMutation();


  if (isProjectLoading) {
    return <div>Wait...</div>
  }

  const onFinish = async (adminProject: Project) => {
    const formData = new FormData();
    formData.append('period', adminProject.period);
    formData.append('content', adminProject.content);
    formData.append('title', adminProject.title);
    if (adminProject.technologies && adminProject.technologies.length) {
      adminProject.technologies.forEach((technology: string) => {
        formData.append('technologies[]', technology);
      });
    }
    formData.append('description', adminProject.description);
    formData.append('link', adminProject.link);
    formData.append('imageUrl', adminProject.file?.[0]?.originFileObj);
    formData.append('personal', String(adminProject.personal));

    try {
      if (selectedItemForEdit) {
        await updateProject({id: selectedItemForEdit.id, updateProject: formData});
        message.success('Project updated successfully');
      } else {
        await createProject(formData);
        message.success('Project added successfully');
      }
      dispatch(setShowAddEditModal(false));
      dispatch(setCurrentModalType(''));
      refetch();
    } catch (err) {
      message.error('An error occurred');
    }
  };

  const onDelete = async (id: any) => {
    try {
      await deleteProject(id);
      dispatch(setShowDeleteModal(false));
      dispatch(setCurrentModalType(''));
      refetch();
      message.success('Project deleted successfully');
    } catch (err) {
      message.error('An error occurred');
    }
  };

  return (
    <div>
      <div className='flex justify-end'>
        <button className='bg-primary px-5 py-2 text-white' onClick={() => {
          dispatch(setSelectedItemForEdit(null))
          form.resetFields();
          dispatch(setShowAddEditModal(true))
          dispatch(setCurrentModalType('project'));
        }}>Add Project
        </button>
      </div>
      <div className='grid grid-cols-4 gap-5 mt-5 sm:grid-cols-1'>
        {
          projects?.map((project: Project) => (
            <div key={project?.id} className='shadow border p-5 border-gray-400 flex flex-col'>
              <h1 className='text-primary text-xl font-bold'>{project?.period}</h1>
              <hr/>
              <h1>Company : {project?.content}</h1>
              <h1>Role : {project?.title}</h1>
              <h1>{project?.description}</h1>
              <h1>{project?.period}</h1>
              <h1>{project?.technologies}</h1>
              <h1>{project?.personal}</h1>
              <div className='flex justify-end gap-5 mt-5'>
                <button className='bg-primary text-white px-5 py-2' onClick={() => {
                  dispatch(setSelectedItemForEdit(project));
                  form.setFieldsValue(project);
                  dispatch(setShowAddEditModal(true));
                  dispatch(setCurrentModalType('project'));
                }}>Edit
                </button>
                <button
                  className='bg-red-500 text-white px-5 py-2'
                  onClick={() => {
                    dispatch(setSelectedItemForDelete(project));
                    dispatch(setShowDeleteModal(true))
                    dispatch(setCurrentModalType('project'));
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
      {currentModalType == 'project' && <Modal open={showAddEditModal} title={selectedItemForEdit ? 'Edit Project' : 'Add Project'} footer={null}
             onCancel={() => {
               dispatch(setSelectedItemForEdit(null))
               dispatch(setShowAddEditModal(false))
               dispatch(setCurrentModalType(''));
             }}>
        <Form form={form} layout='vertical' onFinish={onFinish}>
          <Form.Item name='period' label='Period'>
            <input placeholder='Period'/>
          </Form.Item>
          <Form.Item name='content' label='Content'>
            <input placeholder='Content'/>
          </Form.Item>
          <Form.Item name='title' label='Title'>
            <input placeholder='Title'/>
          </Form.Item>
          <Form.Item name='description' label='Description'>
            <input placeholder='Description'/>
          </Form.Item>
          <Form.Item name='link' label='Link'>
            <input placeholder='Link'/>
          </Form.Item>
          <Form.Item name='technologies' label='Technologies'>
            <Select
              mode="tags"
              style={{width: '100%'}}
              placeholder="Add Technology"
              tokenSeparators={[',']}
            >
            </Select>
          </Form.Item>
          <Form.Item label="Upload CV" name="file" valuePropName="fileList" getValueFromEvent={(e) => e.fileList}>
            <Dragger name="file" multiple={false}>
              <PaperClipOutlined/>
              {selectedItemForEdit?.imageUrl ? selectedItemForEdit?.imageUrl.split('/').pop().split('-').pop() : 'Drag and drop your image here, or click to browse'}
            </Dragger>
          </Form.Item>
          <Form.Item name='personal' label='Personal' valuePropName='checked'>
            <Switch className='bg-primary'/>
          </Form.Item>
          <div className='flex justify-end'>
            <button className='bg-primary text-white px-5 py-2'>
              {selectedItemForEdit ? 'Update' : 'Add'}
            </button>
          </div>
        </Form>
      </Modal>}
      {currentModalType == 'project' && <Modal open={showDeleteModal} title={'Are you sure you want to delete?'} footer={null}
             onCancel={() => {
               dispatch(setSelectedItemForDelete(null))
               dispatch(setShowDeleteModal(false))
               dispatch(setCurrentModalType(''));
             }}>
        <div className='flex justify-center items-center gap-5'>
          <button
            className='border-primary text-primary px-5 py-2'
            onClick={() => {
              dispatch(setSelectedItemForDelete(null))
              dispatch(setShowDeleteModal(false))
              dispatch(setCurrentModalType(''));
            }}
          >
            No
          </button>
          <button
            className='bg-red-500 text-white px-5 py-2'
            onClick={() => onDelete(selectedItemForDelete?.id)}
          >
            Yes
          </button>
        </div>
      </Modal>}
    </div>
  )
}

export default AdminProject
