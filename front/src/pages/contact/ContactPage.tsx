import React, { useState } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { MailOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface ContactFormValues {
  email: string;
  message: string;
}

const validationSchema = {
  email: {
    rules: [
      { required: true, message: 'Email is required' },
      { type: 'email', message: 'Invalid email address' },
    ],
  },
  message: {
    rules: [
      { required: true, message: 'Message is required' },
      { max: 300, message: 'Message must be less than 300 characters' },
    ],
  },
};

const ContactPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [messageApi, contextHolder] = message.useMessage();
  const handleSubmit = async (values: ContactFormValues) => {
    console.log('Form values:', values);
    
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); 
      messageApi.success('Demande de contact envoyée avec succès');
      setIsSubmitting(false);
      values.email = '';
      values.message = '';
    } catch (error) {
      setSubmitError('Une erreur est survenue lors de l\'envoi du message.');
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      {contextHolder}
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Title level={3} className="contact-title" style={{ textAlign: 'center' }}>
          Écrivez-nous !
        </Title>
        <Form
          name="contact-form"
          onFinish={handleSubmit}
          layout="vertical"
          initialValues={{ email: '', message: '' }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={validationSchema.email.rules}
            validateTrigger={['onBlur', 'onChange']}
          >
            <Input prefix={<MailOutlined />} placeholder="Votre email" />
          </Form.Item>

          <Form.Item
            label="Message"
            name="message"
            rules={validationSchema.message.rules}
            validateTrigger={['onBlur', 'onChange']}
          >
            <Input.TextArea
              rows={4}
              placeholder="Votre message"
              maxLength={300}
              showCount
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              Envoyer
            </Button>
          </Form.Item>

          {submitError && (
            <div className="submit-error" style={{ color: 'red', textAlign: 'center' }}>
              {submitError}
            </div>
          )}
        </Form>
      </div>
    </div>
  );
};

export default ContactPage;