import {Form, message, Upload} from "antd";
import {useGetIntroQuery, useUpsertIntroMutation} from "../../redux/api/introApiSlice";
import {PaperClipOutlined} from '@ant-design/icons';

const {Dragger} = Upload;
const AdminIntro = () => {

  const {data: dataIntro, isLoading: isIntroLoading, refetch} = useGetIntroQuery('');
  const [upsertIntro, {data: upsertData, error: upsertError, isLoading: isUpsertLoading}] = useUpsertIntroMutation();

  if (isIntroLoading) {
    return <div>Wait...</div>
  }

  const onFinish = async (values: any) => {
    try {
      console.log(values.file?.[0]?.originFileObj);
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('description', values.description);
      formData.append('content', values.content);
      if(values.file?.[0]?.originFileObj) {
        formData.append('pdfUrl', values.file?.[0]?.originFileObj);
      }
      await upsertIntro(formData);
      refetch()
      message.success('Successfully')
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <Form onFinish={onFinish} layout='vertical' initialValues={dataIntro}>
        <Form.Item name='name' label='Full Name'>
          <input placeholder='Full Name'/>
        </Form.Item>
        <Form.Item name='description' label='Description'>
          <textarea placeholder='Description'/>
        </Form.Item>
        <Form.Item name='content' label='Content'>
          <textarea placeholder='Content'/>
        </Form.Item>
        <Form.Item label="Upload CV" name="file" valuePropName="fileList" getValueFromEvent={(e) => e.fileList} className='w-1/5'>
          <Dragger name="file" multiple={false}>
            <PaperClipOutlined/>
            {dataIntro?.pdfUrl ? dataIntro?.pdfUrl.split('/').pop().split('-').pop() : 'Drag and drop your document here, or click to browse'}
          </Dragger>
        </Form.Item>
        <div className='flex justify-end w-full'>
          <button className='px-10 py-2 bg-primary text-white' type='submit'>SAVE</button>
        </div>
      </Form>
    </div>
  )
}

export default AdminIntro
