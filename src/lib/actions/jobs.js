"use server";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const createJob = async (newJobData) => {
  const res = await fetch(`${baseURL}/api/jobs`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newJobData),
  });
  return res.json();
};

export const getCompanyJobs = async (companyId) => {
  const url = `${baseURL}/api/jobs/company/${companyId}`;

  console.log("Fetching:", url);

  const res = await fetch(url, {
    cache: "no-store",
  });

  console.log("Status:", res.status);

  const text = await res.text();

  console.log("Response:", text);

  return JSON.parse(text);
};

