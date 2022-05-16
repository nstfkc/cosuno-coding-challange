import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import data from "../data.json";
import { SearchInput } from "../components/SearchInput";
import { Filters } from "../components/Filters";

import type { Company, Filter } from "../types";
import { CompanyCard } from "../components/CompanyCard";

const Home: NextPage<HomePageProps> = ({ compaines, filters }) => {
  return (
    <>
      <Head>
        <title>Search construction companies</title>
      </Head>
      <div className="container mx-auto">
        <SearchInput />
        <div className="flex flex-col">
          <Filters filters={filters} />
          <div className="p-4">
            <ul role="list" className="flex-grow">
              {compaines.map((company) => (
                <li key={company.id}>
                  <CompanyCard company={company} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

interface HomePageProps {
  compaines: Company[];
  filters: Filter[];
}

export const getServerSideProps: GetServerSideProps<HomePageProps> = async ({
  query,
}) => {
  const specialties = query.specialty || [];
  const searchTerm = String(query.searchTerm || "");

  let compaines: Company[] = [];

  for (let item of data.companies) {
    const nameMatches = item.name
      .toLocaleLowerCase()
      .includes(searchTerm.toLocaleLowerCase());

    const specialtiesIntersect =
      item.specialties.filter((specialty) =>
        specialties.includes(specialty.slug)
      ).length || specialties.length === 0;

    if (nameMatches && specialtiesIntersect) {
      compaines.push(item);
    }
  }

  return {
    props: {
      compaines,
      filters: data.filters,
    },
  };
};

export default Home;
