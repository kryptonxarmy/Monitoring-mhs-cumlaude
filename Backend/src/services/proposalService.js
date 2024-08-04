const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createProposal = async (title, description, username) => {
  console.log({ title, description, username });

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
    include: {
      student: true,
    },
  });

  const proposal = await prisma.proposal.create({
    data: {
      title,
      description,
      student_id: user.student.student_id,
    },
  });

  const approval = await prisma.approval.create({
    data: {
      proposal_id: proposal.proposal_id,
      approval_status: "pending",
    },
  });

  return { proposal, approval };
};

async function getLatestProposalsByStudent(username) {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
    include: {
      student: true,
    },
  });

  const proposals = await prisma.proposal.findMany({
    where: {
      student_id: user.student.student_id,
    },
    orderBy: {
      submission_date: "desc",
    },
    include: {
      approvals: true,
    },
  });

  const latestProposals = proposals.reduce((acc, proposal) => {
    if (!acc.some((p) => p.title === proposal.title)) {
      acc.push(proposal);
    }
    return acc;
  }, []);

  return latestProposals;
}

async function getLatestProposalsByStudentId(student_id) {
  const student = await prisma.student.findUnique({
    where: {
      student_id: student_id,
    },
    select: {
      name: true,
      student_id: true,
      advisor_id: true,
      supervisor_id: true,
    },
  });

  if (!student) {
    throw new Error("Student not found");
  }

  const proposals = await prisma.proposal.findMany({
    where: {
      student_id: student.student_id,
    },
    orderBy: {
      submission_date: "desc",
    },
    include: {
      approvals: true,
    },
  });

  const latestProposals = proposals.reduce((acc, proposal) => {
    if (!acc.some((p) => p.title === proposal.title)) {
      acc.push(proposal);
    }
    return acc;
  }, []);

  const advisorsAndSupervisors = await prisma.lecturer.findMany({
    where: {
      OR: [{ lecturer_id: student.advisor_id || undefined }, { lecturer_id: student.supervisor_id || undefined }],
    },
    select: {
      lecturer_id: true,
      name: true,
    },
  });

  const advisor = advisorsAndSupervisors.find((lecturer) => lecturer.lecturer_id === student.advisor_id);
  const supervisor = advisorsAndSupervisors.find((lecturer) => lecturer.lecturer_id === student.supervisor_id);

  return {
    student: {
      ...student,
      advisor_name: advisor ? advisor.name : null,
      supervisor_name: supervisor ? supervisor.name : null,
    },
    latestProposals,
    advisorsAndSupervisors,
  };
}

const getStudentApprovals = async () => {
  const students = await prisma.student.findMany({
    select: {
      student_id: true,
      name: true,
      proposals: {
        select: {
          proposal_id: true,
          title: true,
          submission_date: true,
          approvals: {
            select: {
              approval_id: true,
              approval_status: true,
            },
            where: {
              approval_status: "pending",
            },
          },
        },
      },
    },
  });

  const result = students.map((student) => ({
    student_id: student.student_id,
    name: student.name,
    proposals: student.proposals
      .filter((proposal) => proposal.approvals.length > 0)
      .map((proposal) => ({
        proposal_id: proposal.proposal_id,
        submission_date: proposal.submission_date,
        title: proposal.title,
        approvals: proposal.approvals.map((approval) => ({
          approval_id: approval.approval_id,
          approval_status: approval.approval_status,
        })),
      })),
  }));

  return result;
};

module.exports = { createProposal, getLatestProposalsByStudent, getLatestProposalsByStudentId, getStudentApprovals };
