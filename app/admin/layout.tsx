import React from 'react';
import { AdminLayoutProps } from './type';

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return <main className="w-screen h-screen flex flex-col items-center">{children}</main>;
};

export default AdminLayout;
