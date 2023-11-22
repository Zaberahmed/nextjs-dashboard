import { fetchCustomersPages, fetchFilteredCustomers } from "@/app/lib/data";
import Table from "@/app/ui/customers/table";
import Pagination from "@/app/ui/invoices/pagination";
import { CustomersTableSkeleton } from "@/app/ui/skeletons";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Customers",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?:string
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchCustomersPages(query);
  const customers= await fetchFilteredCustomers(query,currentPage)

  return (
    <>
    <Suspense fallback={<CustomersTableSkeleton/>}>
      <Table customers={customers} />
    </Suspense>
    <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
    </div>
    </>
  );
}
