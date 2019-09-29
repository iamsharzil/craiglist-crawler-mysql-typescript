import { connect } from '../helper/mysql';
import { Job } from '../interface/Job';

export async function getJobList() {
  const conn = await connect();
  const jobList = await conn.query('SELECT * FROM jobpost');
  console.log(jobList);
}

export async function insertJob(values: Job) {
  const newJob: Job = values;
  const conn = await connect();

  conn.query(`INSERT INTO jobpost SET ?`, [newJob]);
  console.log(newJob);
}
