import React from 'react';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

const NotFoundPage: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <Title level={2}>Oups ! Page non trouvée</Title>
      <Paragraph>
        La page que vous recherchez n'existe pas. Veuillez vérifier l'URL ou revenir à la page d'accueil.
      </Paragraph>
    </div>
  );
};

export default NotFoundPage;