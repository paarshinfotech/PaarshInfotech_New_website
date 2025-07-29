import _db from "../../../lib/utils/db";
import JobModel from "../../../../models/Job.model";
import ApplicantModel from "../../../../models/Applicant.model";

// Establish MongoDB connection once at startup
_db();

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const populateApplicants =
      url.searchParams.get("populateApplicants") === "true";

    const query = JobModel.find();
    if (populateApplicants) {
      query.populate("applicants");
    }

    const jobs = await query.lean();
    return new Response(JSON.stringify(jobs), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch jobs" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const {
      title,
      location,
      type,
      status,
      description,
      skills,
      publishDate,
      published,
    } = data;

    if (
      !title ||
      !location ||
      !type ||
      !status ||
      !description ||
      !skills ||
      !publishDate
    ) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const newJob = new JobModel({
      title,
      location,
      type,
      status,
      description,
      skills,
      publishDate: new Date(publishDate),
      published: published ?? true,
      applicants: [],
    });

    await newJob.save();

    return new Response(
      JSON.stringify({
        message: "Job created successfully",
        data: newJob,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error creating job:", error);
    return new Response(JSON.stringify({ error: "Failed to create job" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();
    const {
      _id,
      title,
      location,
      type,
      status,
      description,
      skills,
      publishDate,
      published,
    } = data;

    if (
      !_id ||
      !title ||
      !location ||
      !type ||
      !status ||
      !description ||
      !skills ||
      !publishDate
    ) {
      return new Response(
        JSON.stringify({ error: "All fields and _id are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const updatedJob = await JobModel.findByIdAndUpdate(
      _id,
      {
        title,
        location,
        type,
        status,
        description,
        skills,
        publishDate: new Date(publishDate),
        published,
      },
      { new: true, runValidators: true }
    );

    if (!updatedJob) {
      return new Response(JSON.stringify({ error: "Job not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({
        message: "Job updated successfully",
        data: updatedJob,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error updating job:", error);
    return new Response(JSON.stringify({ error: "Failed to update job" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function DELETE(request) {
  try {
    const { _id } = await request.json();

    if (!_id) {
      return new Response(JSON.stringify({ error: "_id is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const deletedJob = await JobModel.findByIdAndDelete(_id);

    if (!deletedJob) {
      return new Response(JSON.stringify({ error: "Job not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Delete associated applicants
    await ApplicantModel.deleteMany({ jobId: _id });

    return new Response(
      JSON.stringify({
        message: "Job and associated applicants deleted successfully",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error deleting job:", error);
    return new Response(JSON.stringify({ error: "Failed to delete job" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

