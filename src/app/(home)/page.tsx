"use client";

import Pagination from "@/components/Pagination/Pagination";
import { getAllUsers } from "@/lib/fe-apis/fe-apis";
import { useEffect, useState } from "react";
import {Delete, EditUser } from "../../assets/icons"

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
        <table id="search-table" className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-900 dark:text-gray-400 bg-white">
            <tr>
              <th scope="col" className="px-2 py-2">
                Username
              </th>
              <th scope="col" className="px-2 py-2">
                Email
              </th>
              <th scope="col" className="px-2 py-2">
                CreatedAt
              </th>
              <th scope="col" className="px-2 py-2">
                Order status
              </th>
              <th scope="col" className="px-2 py-2">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any, index) => {
              console.log("user", user, user?.orderStatus == "success");
              return (
                <tr className="bg-white dark:bg-gray-800" key={index + 1}>
                  <td className="px-2 py-2">{user?.fullname}</td>
                  <td className="px-2 py-2">{user?.email}</td>
                  <td className="px-2 py-2">{user?.createdAt || "N/A"}</td>
                  <td className="px-2 py-2">
                    <span
                      className={`${
                        user?.orderStatus === "success"
                          ? "bg-green-100 text-green-700"
                          : user?.orderStatus === "pending"
                            ? "bg-yellow-200 text-yellow-700"
                            : user?.orderStatus === "failed"
                              ? "bg-red-100 text-red-700"
                              : ""
                      } rounded-lg px-4 py-2 text-sm`}
                    >
                      {user?.orderStatus?.charAt(0).toUpperCase() + user?.orderStatus?.slice(1) || "N/A"}
                    </span>
                  </td>
                  <td className="flex items-center justify-start gap-1 px-2 py-2">
                    <span>
                      <EditUser />
                    </span>
                    <span>
                      <Delete />
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="float-end pt-2"><Pagination/></div>
      </div>
    </>
  );
}
