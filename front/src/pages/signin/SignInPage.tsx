import React from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../../api/auth/api";
import { SignInRequest } from "../../utils/types/api.types";

const SignInPage: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: SignInRequest) => {
    try {
      
      const response = await signIn(values);
      console.log("response",response);
      
      if (response.status === 200 && response.data) {
        
        const { token, user } = response.data;
        localStorage.setItem("userToken", token); 
        localStorage.setItem("user", JSON.stringify(user));

        messageApi.success("Connexion réussie !");
        navigate("/");
      } else {
        messageApi.error("Email ou mot de passe incorrect.");
        form.resetFields();
      }
    } catch (error: any) {
      if (error.response?.status === 403) {
        messageApi.error("Accès refusé. Veuillez réessayer plus tard.");
      } else if (error.response?.status === 400) {
        messageApi.error("Entrée invalide. Veuillez vérifier vos informations.");
      } else {
        messageApi.error(
          "Une erreur inattendue s'est produite. Veuillez réessayer plus tard."
        );
      }
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "50px auto" }}>
      {contextHolder}
      <Typography.Title level={2}>Se connecter</Typography.Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ remember: true }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Veuillez entrer votre email !" },
            { type: "email", message: "Veuillez entrer un email valide !" },
          ]}
        >
          <Input placeholder="Entrez votre email" />
        </Form.Item>
        <Form.Item
          label="Mot de passe"
          name="password"
          rules={[
            { required: true, message: "Veuillez entrer votre mot de passe !" },
          ]}
        >
          <Input.Password placeholder="Entrez votre mot de passe" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={false}>
            Se connecter
          </Button>
        </Form.Item>
        <Form.Item>
          <Typography.Text>
            Vous n'avez pas de compte ?{" "}
            <Link to="/signup" style={{ fontWeight: "bold" }}>
              S'inscrire
            </Link>
          </Typography.Text>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignInPage;