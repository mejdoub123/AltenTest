import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ContactPage from '../pages/contact/ContactPage';
import ProductsPage from '../pages/product/ProductsPage';
import NotFoundPage from '../pages/errors/NotFoundPage';
import CartPage from '../pages/cart/CartPage';
import WishlistPage from '../pages/wishlist/WishlistPage';
import ProfilePage from '../pages/profile/ProfilePage';
import SignInPage from '../pages/signin/SignInPage';
import SignUpPage from '../pages/signup/SignUpPage';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" index element={<ProductsPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/favoris" element={<WishlistPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />}/>
    </Routes>
  );
};

export default AppRoutes;