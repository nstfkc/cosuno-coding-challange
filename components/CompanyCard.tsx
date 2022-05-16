import { FC } from "react";
import { Company } from "../types";

export const CompanyCard: FC<{ company: Company }> = ({ company }) => {
  return (
    <div className="flex items-start justify-start p-2 mb-2 shadow-md rounded-md">
      <div className="w-[100px] h-[100px] rounded-md overflow-hidden">
        <img
          width={100}
          height={100}
          src={company.logo}
          alt={`${company.name} logo`}
        />
      </div>

      <div className="px-2 flex-1">
        <div className="flex-grow">
          <h3 className="font-bold text-md text-gray-700 leading-tight">
            {company.name}
          </h3>
          <p className="text-sm text-gray-800">{company.slogan}</p>
        </div>
        <div className="py-2 flex space-x-1">
          {company.specialties.map((specialty) => (
            <span
              key={specialty.slug}
              className="rounded-sm font-black text-xs text-gray-700 tracking-wide py-[1px] px-2 bg-gray-200"
            >
              {specialty.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
