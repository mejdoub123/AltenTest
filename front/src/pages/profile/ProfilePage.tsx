import React, { useState, useEffect } from "react";
import {Button, Space, Typography, Card, message } from "antd";
import { useNavigate } from "react-router-dom";
import { User } from "../../utils/types/api.types";

const ProfilePage: React.FC = () => {
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("user");
    if (storedUserInfo) {
      try {
        const parsedUserInfo = JSON.parse(storedUserInfo) as User;
        setUserProfile(parsedUserInfo);
      } catch (error) {
        console.error("Error parsing user info:", error);
        navigate("/signin");
      }
    } else {
      navigate("/signin");
    }
  }, []);
  const signOut = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");
    setUserProfile(null);
    messageApi.success("Vous avez été déconnecté.");
    navigate("/signin");
  };

  if (!userProfile) {
    return null;
  }

  return (
    <div style={{ padding: "20px" }}>
      {contextHolder}
      <h1>Profil</h1>
      <Space style={{ marginBottom: 20 }}>
        <Typography.Title level={4}>Profil Utilisateur</Typography.Title>
        <Button type="primary" danger onClick={signOut}>
          Déconnexion
        </Button>
      </Space>
      <Card
        title="Profil Utilisateur"
      >
        <Typography.Title level={3}>
          {userProfile.firstname} {userProfile.username}
        </Typography.Title>
        <Typography.Text>Email: {userProfile.email}</Typography.Text>
      </Card>
    </div>
  );
};

export default ProfilePage;
