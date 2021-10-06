import type { NextApiRequest, NextApiResponse } from 'next'
import chromium from 'chrome-aws-lambda';
import playwright from 'playwright-core';
import getDomainUrl from '../../lib/domainurl';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const atLeast4SecondsSinceInvocation = new Promise(resolve => setTimeout(resolve, 4000));
  let browser: playwright.Browser | null = null;
  try {
    browser = await playwright.chromium.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath || undefined,
    })
    const page = await browser.newPage({
      viewport: {
        width: 1200,
        height: 630
      }
    });
    const urlParam = req.query["url"];
    if (!urlParam || Array.isArray(urlParam)) throw Error("Please pass valid 'url' parameter")
    const domainUrl = getDomainUrl(urlParam)
    console.log("urls", { urlParam, domainUrl })
    await page.goto(domainUrl, {
      timeout: 10000,
      waitUntil: "domcontentloaded"
    })
    // Dodgy wait to ensure websites get time to load but not so long that we timeout on Vercel
    await atLeast4SecondsSinceInvocation;
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