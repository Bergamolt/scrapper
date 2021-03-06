import chalk from "chalk"
import cheerio from 'cherio'
import { slugify } from 'transliteration'

import listItemHandler from './handlers/listitemhandler.js'
import arrayFromLength from "./helpers/common.js"
import getPageContent from "./helpers/puppeteer.js"

const SITE = 'https://auto.ria.com/uk/newauto/category-legkovie/?page='
const pages = 8

async function main() {
	try {
		for (const page of arrayFromLength(pages)) {
			const url = `${SITE}${page}&categoryId=1`
			const pageContent = await getPageContent(url)
			const $ = cheerio.load(pageContent)
			const carsItem = []

			$('.proposition_link').each((i, header) => {
				const url = $(header).attr('href')

				carsItem.push({
					url: `https://auto.ria.com${url}`
				})
			})

			listItemHandler(carsItem)
		}
	} catch (err) {
		console.log('Error\n')
		console.log(chalk.red(err))
	}
}

main()