import React from 'react';
import { AdminLayoutProps } from './type';

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return <main className="w-screen h-screen flex flex-col justify-center items-center">{children}</main>;
};

export default AdminLayout;
