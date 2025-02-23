import React from "react";
import { Layout, ConfigProvider } from "antd";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./layouts/navbar/Navbar";
import FooterComponent from "./layouts/footer/Footer";
import AppRoutes from "./routes/Routes";

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <ConfigProvider>
      <Router>
        <Layout style={{ minHeight: "100vh" }}>
          <Navbar />
          <Content>
            <Routes>
              <Route path="/*" element={<AppRoutes />} />
            </Routes>
          </Content>
          <FooterComponent />
        </Layout>
      </Router>
    </ConfigProvider>
  );
};

export default App;
