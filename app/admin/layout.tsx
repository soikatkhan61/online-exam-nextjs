import Sidebar from "./sidebar";
import { Providers } from "@/redux/provider";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="container md:grid grid-cols-4 my-5">
        <div className="mb-5"> <Sidebar /></div>
        <div className="col-span-3 md:mx-5">{children}</div>
      </div>
    </>
  )
}
