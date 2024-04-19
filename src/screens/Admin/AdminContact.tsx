import {useDeleteContactMutation, useGetAllEmailsQuery} from "../../redux/api/contactApiSlice";
import {message, Modal, Table} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {Contact, ContactRoot} from "../../interfaces/contacts.interface";
import {
  setSelectedItemForMessage,
  setShowMessageModal
} from "../../redux/features/contact/contactSlice";
import {
  setCurrentModalType,
  setSelectedItemForDelete,
  setShowDeleteModal,
} from "../../redux/features/app/appSlice";
import {AppRoot} from "../../interfaces/app.interface";
import { DateTime } from 'luxon';


const AdminContact = () => {

  // State management local
  const showDeleteModal = useSelector((state: AppRoot) => state.app.showDeleteModal);
  const selectedItemForDelete = useSelector((state: AppRoot) => state.app.selectedItemForDelete);
  const showMessageModal = useSelector((state: ContactRoot) => state.contacts.showMessageModal);
  const selectedItemForMessage = useSelector((state: ContactRoot) => state.contacts.selectedItemForMessage);
  const currentModalType = useSelector((state: AppRoot) => state.app.currentModalType);
  const dispatch = useDispatch();

  //State management api
  const {data: dataContacts, isLoading, refetch} = useGetAllEmailsQuery('');
  const [deleteContact] = useDeleteContactMutation()

  if (isLoading) {
    return <div>Wait...</div>
  }

  const onDelete = async (id: any) => {
    try {
      await deleteContact(id);
      dispatch(setShowDeleteModal(false));
      refetch();
      message.success('Experience deleted successfully');
    } catch (err) {
      message.error('An error occurred');
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastname',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
      render: (text: any, contact: Contact) => (
        <button onClick={() => {
          dispatch(setSelectedItemForMessage(contact));
          dispatch(setShowMessageModal(true));
        }}
        >
          {text.length > 50 ? `${text.substring(0, 50)}...` : text}
        </button>
      )
    },
    {
      title: 'Time and Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, contact: Contact) => (
        <button
          className='bg-red-500 text-white px-5 py-2'
          onClick={() => {
            dispatch(setSelectedItemForDelete(contact));
            dispatch(setShowDeleteModal(true));
            dispatch(setCurrentModalType('contact'));
          }}
        >
          Delete
        </button>
      ),
    },
  ];

  const timeConverter = (time:any) =>{
    return DateTime.fromISO(time)
      .toLocal()
      .toFormat('HH:mm dd-MM-yyyy');
  }


  return (
    <div className="sm:overflow-x-scroll sm:w-full">
      <Table dataSource={dataContacts?.map((contact: Contact) => ({...contact, key: contact.id, createdAt: timeConverter(contact.createdAt)}))}
             columns={columns} pagination={false} scroll={{x: 'max-content'}}/>
      {currentModalType && <Modal open={showDeleteModal} title={'Are you sure you want to delete?'} footer={null}
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
      <Modal open={showMessageModal} footer={null}
             onCancel={() => {
               dispatch(setSelectedItemForMessage(null))
               dispatch(setShowMessageModal(false))
             }}>
        <div className='p-5'>
          {selectedItemForMessage?.message}
        </div>
      </Modal>
    </div>
  )
}

export default AdminContact
