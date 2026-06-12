import { getCompanyJobs } from "@/lib/actions/jobs";
import RecruiterJobsTable from "@/components/dashboard/RecruiterJobsTable";


const RecruiterJobs = async () => {
    const companyId = "company_123";
    const jobs = await getCompanyJobs(companyId);
    console.log("Jobs for company:", jobs);



    return (
        <>
            <RecruiterJobsTable jobs={jobs}></RecruiterJobsTable>
        </>
    );
};

export default RecruiterJobs;