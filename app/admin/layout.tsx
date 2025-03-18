import React from 'react';

interface IAdminLayout {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: IAdminLayout) => {
  return <main className="w-screen h-screen flex flex-col justify-center items-center">{children}</main>;
};

export default AdminLayout;
