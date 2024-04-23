import {Calendar, Modal, Table} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {DateTime} from 'luxon';
import {useGetErrorLogQuery} from "../../redux/api/errorLogApiSlice";
import {ErrorLog, ErrorLogRoot} from "../../interfaces/errorLogs.interface";
import {setSelectedItemForBody, setShowBodyModal} from "../../redux/features/errorLog/errorLogSlice";
import React, {useState} from "react";
import {Dayjs} from "dayjs";

const AdminContact = () => {
    // State management local
    const showBodyModal = useSelector((state: ErrorLogRoot) => state.errorLogs.showBodyModal);
    const selectedItemForBody = useSelector((state: ErrorLogRoot) => state.errorLogs.selectedItemForBody);
    const [fromDate, setFromDate] = useState<string | undefined>(undefined);
    const [toDate, setToDate] = useState<string | undefined>(undefined);
    const dispatch = useDispatch();


    //State management api
    const {data: dataErrorLog, isLoading} = useGetErrorLogQuery({ fromDate,toDate });

    if (isLoading) {
        return <div>Wait...</div>
    }

    const columns = [
        {
            title: 'ControllerName',
            dataIndex: 'controllerName',
            key: 'controllerName',
        },
        {
            title: 'Method',
            dataIndex: 'method',
            key: 'method',
        },
        {
            title: 'Body',
            dataIndex: 'body',
            key: 'body',
            render: (text: any, errorLog: ErrorLog) => (
                <button onClick={() => {
                    dispatch(setSelectedItemForBody(errorLog))
                    dispatch(setShowBodyModal(true))
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
    ];

    const timeConverter = (time: any) => {
        return DateTime.fromISO(time)
            .toLocal()
            .toFormat('HH:mm dd-MM-yyyy');
    }


    const onSelectFromDate = (value: Dayjs) => {
        const formattedDate = value.format('YYYY-MM-DD');
        setFromDate(formattedDate);
    };

    const onSelectToDate = (value: Dayjs) => {
        const formattedDate = value.format('YYYY-MM-DD');
        setToDate(formattedDate);
    };


    return (
        <div className='flex flex-col gap-2'>
            <div className='flex justify-around sm:flex-col sm:gap-4 sm:'>
                <div className='flex flex-col sm:items-center'>
                    <h1 className='text-2xl'>From Date:</h1>
                    <div style={{width:'300px'}}>
                        <Calendar fullscreen={false} onSelect={onSelectFromDate}/>
                    </div>
                </div>
                <div className='flex flex-col sm:items-center'>
                    <h1 className='text-2xl'>To Date:</h1>
                    <div style={{width:'300px'}}>
                        <Calendar fullscreen={false} onSelect={onSelectToDate} />
                    </div>
                </div>
            </div>

            <div className="sm:overflow-x-scroll sm:w-full">
                <Table dataSource={dataErrorLog?.map((errorLog: ErrorLog) => ({
                    ...errorLog,
                    key: errorLog.id,
                    createdAt: timeConverter(errorLog.createdAt)
                }))}
                       columns={columns} pagination={false} scroll={{x: 'max-content'}}/>
                <Modal open={showBodyModal} footer={null}
                       onCancel={() => {
                           dispatch(setSelectedItemForBody(null))
                           dispatch(setShowBodyModal(false))
                       }}>
                    <div className='p-5'>
                        {selectedItemForBody?.body}
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default AdminContact
