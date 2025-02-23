import React from 'react';
import { Layout, Typography } from 'antd';

const { Footer } = Layout;
const { Text } = Typography;

const FooterComponent: React.FC = () => {
  return (
    <Footer style={{ textAlign: 'center' }}>
      <Text>© 2025 Altenecom. All rights reserved.</Text>
    </Footer>
  );
};

export default FooterComponent;