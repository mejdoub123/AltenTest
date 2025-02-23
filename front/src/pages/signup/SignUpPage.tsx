import React from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../../api/auth/api";
import { SignUpRequest } from "../../utils/types/api.types";

const SignUpPage: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: SignUpRequest) => {
    if (values.password !== form.getFieldValue("confirmPassword")) {
      messageApi.error("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await signUp({
        firstname: values.firstname,
        username: values.username,
        email: values.email,
        password: values.password,
      });

      if (response.status === 200 && response.data) {
        messageApi.success("Inscription réussie ! Veuillez vous connecter.");
        navigate("/signin");
      } else {
        messageApi.error("Échec de l'inscription. Veuillez réessayer plus tard.");
      }
    } catch (error: any) {
      if (error.response?.status === 403) {
        messageApi.error("Accès refusé. Veuillez contacter le support.");
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
      <Typography.Title level={2}>S'inscrire</Typography.Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ remember: true }}
      >
        <Form.Item
          label="Prénom"
          name="firstname"
          rules={[
            { required: true, message: "Veuillez entrer votre prénom !" },
          ]}
        >
          <Input placeholder="Entrez votre prénom" />
        </Form.Item>
        <Form.Item
          label="Nom d'utilisateur"
          name="username" 
          rules={[{ required: true, message: "Veuillez entrer votre nom !" }]}
        >
          <Input placeholder="Entrez votre nom" />
        </Form.Item>

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

        <Form.Item
          label="Confirmer le mot de passe"
          name="confirmPassword"
          rules={[
            { required: true, message: "Veuillez confirmer votre mot de passe !" },
          ]}
        >
          <Input.Password placeholder="Confirmez votre mot de passe" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={false}>
            S'inscrire
          </Button>
        </Form.Item>

        <Form.Item>
          <Typography.Text>
            Vous avez déjà un compte ?{" "}
            <Link to="/signin" style={{ fontWeight: "bold" }}>
              Se connecter
            </Link>
          </Typography.Text>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUpPage;