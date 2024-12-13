import { useState } from 'react';
import { Drawer, Button, Form, Input, Select, Upload, Spin, message, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const formGroups = [
    {
        title: "Buyer's Information",
        items: [
            { name: 'firstName', placeholder: 'First Name', required: true },
            { name: 'lastName', placeholder: 'Last Name', required: true },
            { name: 'mobileNumber', placeholder: 'Mobile Number', required: true },
            { name: 'email', placeholder: 'Email Address', required: true },
        ],
    },
    {
        title: 'Shipping Details',
        items: [
            { name: 'addressLine1', placeholder: 'Address Line 1', required: true, span: 24 },
            { name: 'addressLine2', placeholder: 'Address Line 2', required: false, span: 24 },
            { name: 'city', placeholder: 'City', required: true },
            { name: 'state', placeholder: 'State/Region', required: true },
            { name: 'country', placeholder: 'Country', required: true },
            { name: 'postcode', placeholder: 'Postcode/ZIP', required: true },
            { name: 'shippingMark', placeholder: 'Shipping Mark', required: false, span: 24 },
            { name: 'typeOfDelivery', placeholder: 'Type of Delivery', required: true, type: 'select', options: ['Pick up', 'Door to door'], span: 12 },
            { name: 'shippingMode', placeholder: 'Shipping Mode', required: true, type: 'select', options: ['Air', 'Sea'], span: 12 },
        ],
    },
    {
        title: 'Customization',
        items: [
            { name: 'customizationInstruction', placeholder: 'Please provide precise and detailed guidelines for your customization request. (ex. logo position, material used, color palette, etc.)', required: false, type: 'textarea', span: 24 },
            { name: 'uploadLogo', placeholder: 'Upload Logo', required: false, type: 'upload', span: 24, label: 'Upload the logo and any other essential files required for the customization of your product.' },
            { name: 'additionalInformation', placeholder: 'Additional Information', required: false, type: 'textarea', span: 24, label: 'Additional Information' },
        ],
    },
];

const { Option } = Select;

const Sidebar = ({ visible, onClose, cartItems }) => {
    const [loading, setLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [formValues, setFormValues] = useState({});
    const [form] = Form.useForm();

    const onFinish = (values) => {
        setLoading(true);
        const dataToSend = {
            form_data: { ...formValues, ...values },
            product_details: cartItems,
        };
        console.log(dataToSend);

        // Send data to WordPress site
        fetch('https://taobao-extension-server.onrender.com/add-product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                message.success('Order submitted successfully');
                onClose(); // Close the drawer after successful submission
                form.resetFields(); // Reset form fields after submission
                setFormValues({}); // Clear form values state
                setCurrentStep(0); // Reset to the first step
            })
            .catch((error) => {
                console.error('Error:', error);
                message.error('Failed to submit order');
            })
            .finally(() => {
                setLoading(false); // Set loading state to false after API call completes
            });
    };

    const handleNext = () => {
        form.validateFields().then(values => {
            setFormValues({ ...formValues, ...values });
            form.resetFields();
            setCurrentStep(currentStep + 1);
        });
    };

    const handleBack = () => {
        setCurrentStep(currentStep - 1);
    };

    return (
        <Drawer
            title={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {currentStep > 0 && (
                        <p className='back-button' style={{ cursor: "pointer" }} onClick={handleBack}>
                            Previous Page
                        </p>
                    )}
                </div>
            }
            placement="right"
            onClose={onClose}
            visible={visible}
            width={500}
        >
            <Spin spinning={loading} tip="Submitting order...">
                <Form layout="vertical" onFinish={onFinish} form={form}>
                    {currentStep === 0 && (
                        <>
                            {formGroups.slice(0, 2).map((group) => (
                                <div key={group.title}>
                                    <h3 className='form-title'>{group.title}</h3>
                                    <Row gutter={16}>
                                        {group.items.map(({ name, placeholder, required, type, span = 12, options }) => (
                                            <Col span={span} key={name}>
                                                <Form.Item
                                                    name={name}
                                                    rules={required ? [{ required: true, message: `Please enter your ${placeholder.toLowerCase()}` }] : []}
                                                >
                                                    {type === 'textarea' ? (
                                                        <Input.TextArea className="custom-textarea" placeholder={placeholder} />
                                                    ) : type === 'upload' ? (
                                                        <Upload name="logo" action="/upload.do" listType="picture">
                                                            <Button icon={<UploadOutlined />}>Click to upload</Button>
                                                        </Upload>
                                                    ) : type === 'select' ? (
                                                        <Select placeholder={placeholder} getPopupContainer={(trigger) => trigger.parentNode}>
                                                            {options.map((option) => (
                                                                <Option key={option} value={option}>
                                                                    {option}
                                                                </Option>
                                                            ))}
                                                        </Select>
                                                    ) : (
                                                        <Input className="custom-input" placeholder={placeholder} />
                                                    )}
                                                </Form.Item>
                                            </Col>
                                        ))}
                                    </Row>
                                </div>
                            ))}
                            <Form.Item>
                                <Button style={{ width: '100%', backgroundColor: "#bea4ce", color: 'black', fontWeight: "400" }} className='footer-buttons' type="primary" onClick={handleNext}>
                                    Continue
                                </Button>
                            </Form.Item>
                        </>
                    )}

                    {currentStep === 1 && (
                        <>
                            <h3 className='form-title'>{formGroups[2].title}</h3>
                            <Row gutter={16}>
                                {formGroups[2].items.map(({ name, placeholder, required, type, span = 24, label }) => (
                                    <Col span={span} key={name}>
                                        <Form.Item
                                            name={name}
                                            label={label}
                                            rules={required ? [{ required: true, message: `Please enter your ${placeholder.toLowerCase()}` }] : []}
                                        >
                                            {type === 'textarea' ? (
                                                <Input.TextArea className="custom-textarea" placeholder={placeholder} style={{ height: '150px' }} />
                                            ) : type === 'upload' ? (
                                                <div style={{ width: '100%', padding: '9px' }}>
                                                    <Upload
                                                        name="logo"
                                                        action="/upload.do"
                                                        listType="picture"
                                                        style={{ width: '100%', border: "none" }}
                                                    >
                                                        <Button
                                                            icon={<UploadOutlined />}
                                                            style={{ width: '100%', border: "none" }} // Ensure button is full width
                                                        >
                                                            Click to upload
                                                        </Button>
                                                    </Upload>
                                                </div>
                                            ) : (
                                                <Input className="custom-input" placeholder={placeholder} />
                                            )}
                                        </Form.Item>
                                    </Col>
                                ))}
                            </Row>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{ width: '100%', backgroundColor: "#bea4ce", color: 'black', fontWeight: "400" }} className='footer-buttons'>
                                    Submit Order
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form>
            </Spin>
        </Drawer>
    );
};

export default Sidebar;
