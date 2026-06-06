import _db from "../../../lib/utils/db";
import JobModel from "../../../../models/Job.model";
import ApplicantModel from "../../../../models/Applicant.model";

// Establish MongoDB connection once at startup
_db();

export async function POST(request) {
  try {
    const data = await request.json();
    const { jobId, name, email, phone, resumeUrl, coverLetter } = data;

    if (!jobId || !name || !email || !phone || !resumeUrl) {
      return new Response(
        JSON.stringify({
          error: "jobId, name, email, phone, and resumeUrl are required",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const job = await JobModel.findById(jobId);
    if (!job) {
      return new Response(JSON.stringify({ error: "Job not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const newApplicant = new ApplicantModel({
      name,
      email,
      phone,
      resumeUrl,
      jobId,
    });

    await newApplicant.save();

    job.applicants.push(newApplicant._id);
    await job.save();

    return new Response(
      JSON.stringify({
        message: "Applicant added successfully",
        data: newApplicant,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error adding applicant:", error);
    return new Response(JSON.stringify({ error: "Failed to add applicant" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
