import { Page } from 'puppeteer';
import cheerio from 'cheerio';

// MongoDB
import Listing from '../../model/listingModel';

// Mysql
import { insertJob } from '../queries/job';

export default class Job {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  async sleep(miliSeconds: number) {
    return new Promise(resolve => setTimeout(resolve, miliSeconds));
  }

  async getHtmlContent(page: Page) {
    await page.goto(this.url, { timeout: 3000000 });
    const html = await page.content();
    return html;
  }

  getJobListing(html: string) {
    const $ = cheerio.load(html);

    const listings = $('.result-info')
      .map((index, element) => {
        const resultTitle: any = $(element).find('.result-title');
        const resultDate: any = $(element).find('.result-date');
        const resultNeighbour: any = $(element).find('.result-hood');

        const title: string = $(resultTitle).text();
        const url: string = $(resultTitle).attr('href');
        const datePosted: any = new Date($(resultDate).attr('datetime'));
        const neighbourhood: string = $(resultNeighbour)
          .text()
          .trim()
          .replace('(', '')
          .replace(')', '');

        return {
          title,
          url,
          datePosted,
          neighbourhood
        };
      })
      .get();

    return listings;
  }

  async getJobDescription(listings: any, page: Page) {
    for (let i = 0; i < listings.length; i++) {
      const SLEEP_MILISECONDS_COUNT: number = 1000;

      await page.goto(listings[i].url, { timeout: 3000000 });
      const html = await page.content();
      const $ = cheerio.load(html);

      const jobDescription = $('#postingbody')
        .text()
        .trim();

      const compensation = $('p.attrgroup > span:nth-child(1) > b')
        .text()
        .trim();

      listings[i].jobDescription = jobDescription;
      listings[i].compensation = compensation;

      await insertJob(listings[i]);

      // const listingModel = new Listing(listings[i]);

      // await listingModel.save();

      // Sleep for 1 second after each url
      await this.sleep(SLEEP_MILISECONDS_COUNT);
    }
  }
}
