import {Form, message, Select, Upload} from "antd";
import {useGetAboutQuery, useUpsertAboutMutation} from "../../redux/api/aboutApiSlice";
import {PaperClipOutlined} from "@ant-design/icons";

const {Dragger} = Upload;

const AdminAbout = () => {

  const {data: dataAbout, isLoading: isIntroLoading, refetch} = useGetAboutQuery('');
  const [upsertAbout, {data: upsertData, error: upsertError, isLoading: isUpsertLoading}] = useUpsertAboutMutation();

  if (isIntroLoading) {
    return <div>Wait...</div>
  }

  const onFinish = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append('descriptionOne', values.descriptionOne);
      formData.append('descriptionTwo', values.descriptionTwo);
      if (values.skills && values.skills.length) {
        values.skills.forEach((skill: string) => {
          formData.append('skills[]', skill);
        });
      }
      formData.append('imageUrl', values.file?.[0]?.originFileObj);
      await upsertAbout(formData)

      refetch();
      message.success('Successfully')
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <Form onFinish={onFinish} layout='vertical' initialValues={dataAbout}>
        <Form.Item name='descriptionOne' label='Description 1'>
          <textarea placeholder='Description 1'/>
        </Form.Item>
        <Form.Item name='descriptionTwo' label='Description 2'>
          <textarea placeholder='Description 2'/>
        </Form.Item>
        <Form.Item name='skills' label='Skills'>
          <Select
            mode="tags"
            style={{width: '100%'}}
            placeholder="Add skills"
            tokenSeparators={[',']}
          >
          </Select>
        </Form.Item>
        <Form.Item label="Upload Image" name="file" valuePropName="fileList" getValueFromEvent={(e) => e.fileList}
                   className='w-1/5'>
          <Dragger name="file" multiple={false}>
            <PaperClipOutlined/>
            {dataAbout?.imageUrl ? dataAbout?.imageUrl.split('/').pop().split('-').pop() : 'Drag and drop your image here, or click to browse'}
          </Dragger>
        </Form.Item>
        <div className='flex justify-end w-full'>
          <button className='px-10 py-2 bg-primary text-white' type='submit'>SAVE</button>
        </div>
      </Form>
    </div>
  )
}

export default AdminAbout
