import { launch } from 'puppeteer';
import { connectMongoDb } from './helper/mongoDb';

import Job from './helper/job';

async function main() {
  const job: Job = new Job('https://sfbay.craigslist.org/search/pen/sof');
  // connectMongoDb();

  const browser = await launch({ headless: false });
  const page = await browser.newPage();

  const html = await job.getHtmlContent(page);

  const listings = job.getJobListing(html);

  await job.getJobDescription(listings, page);
}

main();
