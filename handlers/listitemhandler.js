import cheerio from 'cherio'
import chalk from 'chalk'

import getPageContent from "../helpers/puppeteer.js"
import saveData from './saver.js'

export default async function listItemHandler(data) {
  try {
    const dataContent = []

    for (const initialData of data) {
      console.log(chalk.green('Getting data from' + initialData.url))
      const detailsContent = await getPageContent(initialData.url)
      const $ = cheerio.load(detailsContent)

      const price = $('body > div.app-content > div.auto-wrap > aside > div:nth-child(1) > section.price.mb-15.mhide > div:nth-child(1)').text()
      const title = $('body > div.app-content > div.auto-head.m-padding.mhide > h1').text()

      dataContent.push({
        ...initialData,
        price,
        title
      })
    }

    saveData(dataContent)
  } catch (error) {
    throw error
  }
}