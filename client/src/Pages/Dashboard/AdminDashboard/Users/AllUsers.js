import React from "react";
import NotFound from "../../../../Shared/DataNotFound";
import TableLoader from "../../../../Shared/Loader/TableLoader";
import { useAllUsersQuery } from "../../../../store/services/authServices";
import AllUserTable from "./AllUserTable";
const AllUsers = () => {
  const { data, isLoading } = useAllUsersQuery();
  console.log(data && data.allUser.length);
  return (
    <>
      {isLoading ? (
        <TableLoader />
      ) : !data?.allUser?.length ? (
        <NotFound> Any User Not Found</NotFound>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4 mt-4">All Users</h2>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-left text-gray-500 table-auto whitespace-nowrap">
              <thead className="text-[16px] text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Full Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Update Role
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Profile
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="text-[16px]">
                {data?.allUser
                  .map((user) => <AllUserTable key={user._id} user={user} />)
                  .reverse()}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default AllUsers;
