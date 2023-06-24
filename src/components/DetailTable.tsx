import * as React from "react";
import { v4 as uuid } from "uuid";

interface DetailTableProps {
  details: { key: string; value: string }[];
}

const DetailTable = ({ details }: DetailTableProps) => {
  return (
    <table className="w-full table-auto">
      <tbody>
        {details.map((detail) => (
          <tr key={uuid()}>
            <td className="border border-gray-300 bg-gray-100 pl-3 font-medium text-gray-900">
              {detail.key}
            </td>
            <td className="border border-gray-300 pl-3 text-gray-900">
              {detail.value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DetailTable;
