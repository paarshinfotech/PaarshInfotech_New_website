export async function POST (request) {
  try {
    const url = new URL(request.url);
    const jobId = url.pathname.split("/").slice(-2)[0]; // Extract job _id
    const data = await request.json();
    const { name, email, resumeUrl } = data;

    if (!jobId || !name || !email || !resumeUrl) {
      return new Response(
        JSON.stringify({
          error: "Job _id, name, email, and resumeUrl are required",
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
