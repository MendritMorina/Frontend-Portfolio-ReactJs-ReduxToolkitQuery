import {
  useCreateExperienceMutation,
  useDeleteExperienceMutation,
  useGetAllExperiencesQuery, useUpdateExperienceMutation
} from "../../redux/api/experienceApiSlice";
import {Form, message, Modal} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {
  setCurrentModalType,
  setSelectedItemForDelete,
  setSelectedItemForEdit,
  setShowAddEditModal,
  setShowDeleteModal
} from "../../redux/features/app/appSlice";
import {Experience} from "../../interfaces/experiences.interface";
import {AppRoot} from "../../interfaces/app.interface";


const AdminExperience = () => {
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
  const {data: experiences, isLoading: isExperienceLoading, refetch} = useGetAllExperiencesQuery('');
  const [createExperience] = useCreateExperienceMutation();
  const [updateExperience] = useUpdateExperienceMutation();
  const [deleteExperience] = useDeleteExperienceMutation();


  if (isExperienceLoading) {
    return <div>Wait...</div>
  }

  const onFinish = async (adminExperience: Experience) => {
    try {
      if (selectedItemForEdit) {
        await updateExperience({id: selectedItemForEdit.id, updateExperience: adminExperience});
        message.success('Experience updated successfully');
      } else {
        await createExperience(adminExperience);
        message.success('Experience added successfully');
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
      await deleteExperience(id);
      dispatch(setShowDeleteModal(false));
      dispatch(setCurrentModalType(''));
      refetch();
      message.success('Experience deleted successfully');
    } catch (err) {
      message.error('An error occurred');
    }
  };


  return (
    <div>
      <div className='flex justify-end'>
        <button className='bg-primary px-5 py-2 text-white' onClick={() => {
          dispatch(setSelectedItemForEdit(null))
          form.resetFields(); // Reset the form fields after added
          dispatch(setShowAddEditModal(true))
          dispatch(setCurrentModalType('experience'));
        }}>Add Experience
        </button>
      </div>
      <div className='grid grid-cols-4 gap-5 mt-5 sm:grid-cols-1'>
        {
          experiences?.map((experience: Experience) => (
            <div key={experience?.id} className='shadow border p-5 border-gray-400 flex flex-col'>
              <h1 className='text-primary text-xl font-bold'>{experience?.period}</h1>
              <hr/>
              <h1>Company : {experience?.company}</h1>
              <h1>Role : {experience?.title}</h1>
              <h1>{experience?.description}</h1>
              <div className='flex justify-end gap-5 mt-5'>
                <button className='bg-primary text-white px-5 py-2' onClick={() => {
                  dispatch(setSelectedItemForEdit(experience));
                  form.setFieldsValue(experience);
                  dispatch(setShowAddEditModal(true));
                  dispatch(setCurrentModalType('experience'));
                }}>Edit
                </button>
                <button
                  className='bg-red-500 text-white px-5 py-2'
                  onClick={() => {
                    dispatch(setSelectedItemForDelete(experience));
                    dispatch(setShowDeleteModal(true))
                    dispatch(setCurrentModalType('experience'));
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
      {currentModalType == 'experience' && <Modal open={showAddEditModal} title={selectedItemForEdit ? 'Edit Experience' : 'Add Experience'} footer={null}
             onCancel={() => {
               dispatch(setSelectedItemForEdit(null))
               dispatch(setShowAddEditModal(false))
               dispatch(setCurrentModalType(''));
             }}>
        <Form form={form} layout='vertical' onFinish={onFinish} initialValues={{period:'',company:'',title:'',description:''}}>
          <Form.Item name='period' label='Period'>
            <input placeholder='Period'/>
          </Form.Item>
          <Form.Item name='company' label='Company'>
            <input placeholder='Company'/>
          </Form.Item>
          <Form.Item name='title' label='Title'>
            <input placeholder='Title'/>
          </Form.Item>
          <Form.Item name='description' label='Description'>
            <input placeholder='Description'/>
          </Form.Item>
          <div className='flex justify-end'>
            <button className='bg-primary text-white px-5 py-2'>
              {selectedItemForEdit ? 'Update' : 'Add'}
            </button>
          </div>
        </Form>
      </Modal>}
      {currentModalType == 'experience' && <Modal open={showDeleteModal} title={'Are you sure you want to delete?'} footer={null}
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

export default AdminExperience
