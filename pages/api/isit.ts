import type { NextApiRequest, NextApiResponse } from 'next'
import chromium from 'chrome-aws-lambda';
import playwright from 'playwright-core';
import getDomainUrl from '../../lib/domainurl';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  let browser: playwright.Browser | null = null;
  try {
    browser = await playwright.chromium.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath || undefined,
      //headless: chromium.headless
    })
    const page = await browser.newPage({
      viewport: {
        width: 1200,
        height: 630
      }
    });
    const urlParam = req.query["url"] as string;
    const domainUrl = getDomainUrl(urlParam)
    console.log("urls", { urlParam, domainUrl })
    await page.goto(domainUrl, {
      timeout: 15000
    })
    if (domainUrl == "https://connoradams.co.uk") {
      // TODO Remove this nonsense that makes screenshot nice 😅
      await page.waitForLoadState("networkidle")
    }
    const data = await page.screenshot({
      type: "png",
    })
    res.status(200).end(data.toString('base64'))
  } catch (error) {
    let message = "Unknown error"
    if (error instanceof Error) {
      message = error.message
    }
    console.log("Error in API", message)
    res.status(500).end(message)
  } finally {
    if (browser) await browser.close()
  }
}