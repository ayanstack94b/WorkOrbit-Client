"use server";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const createCompany = async (companyData) => {
  const res = await fetch(`${baseURL}/api/company`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(companyData),
  });

  return res.json();
};

export const getCompany = async (companyId) => {
  try {
    const res = await fetch(`${baseURL}/api/company/${companyId}`, {
      cache: "no-store",
    });

    const data = await res.json();

    console.log("GET COMPANY RESPONSE:", data);

    return data;
  } catch (error) {
    console.error("GET COMPANY ERROR:", error);
    return null;
  }
};
