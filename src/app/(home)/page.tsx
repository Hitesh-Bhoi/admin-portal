"use client";

import Pagination from "@/components/Pagination/Pagination";
import { getAllUsers } from "@/lib/fe-apis/fe-apis";
import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);
  // get all users data
  const getAllUsersData = async () => {
    try {
      const { data } = await getAllUsers();
      setUsers(data?.data);
    } catch (error) {
      console.log("Error while getting all users data", error);
    }
  };
  useEffect(() => {
    getAllUsersData();
    console.warn("Home called");
  }, []);
  console.warn("users", users);
  return (
    <>
      <div className="relative overflow-x-auto">
        <table id="search-table" className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
          <thead className="text-xs text-gray-900 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                CreatedAt
              </th>
              <th scope="col" className="px-6 py-3">
                Order status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any, index) => {
              console.log("user", user);
              return (
                <>
                  <tr className="bg-white dark:bg-gray-800" key={index + 1}>
                    <td className="px-6 py-4">{user?.fullname}</td>
                    <td className="px-6 py-4">{user?.email}</td>
                    <td className="px-6 py-4">{user?.createdAt || "N/A"}</td>
                    <td className="px-6 py-4">{user?.orderStatus || "N/A"}</td>
                    <td className="flex items-center justify-start gap-2 px-6 py-4">
                      <span>Edit</span>
                      <span>Delete</span>
                    </td>
                    <td className="px-6 py-4"></td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
        <div className="float-end pt-2"><Pagination/></div>
      </div>
    </>
  );
}
