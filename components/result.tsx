import useSWR from 'swr'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from '../styles/Result.module.css'
import { IsItError, IsItSuccess } from '../pages/api/isit';


const fetcher = async (
    input: RequestInfo,
    init: RequestInit,
) => {
    const res = await fetch(input, init);
    if (!res.ok) throw new Error(((await res.json()) as IsItError).message.split("===")[0])

    return res.json();
};

const Result = ({ url }: { url: string }) => {
    const params = new URLSearchParams()
    params.set("url", url)
    const { data, error, isValidating } = useSWR<IsItSuccess, Error>(`/api/isit?${params}`, fetcher)

    const [retryCount, setRetryCount] = useState(0);

    useEffect(() => {
        console.debug("error", error)
        console.debug("data", data)
    }, [error, data])

    useEffect(() => {
        console.debug("isValidating", isValidating)
        if (isValidating) setRetryCount(r => r + 1);
    }, [isValidating])

    if (error) return <>
        <p className={styles.loading}>Maybe it is down 👀 Retry {retryCount}</p>
        <p><code>{error.message}</code></p>
        <Image width={498} height={249} alt="GIF of poor TV signal" src="/error.gif"></Image>
    </>
    if (!data) return <>
        <p className={styles.loading}>Loading, please wait</p>
        <Image width={498} height={249} alt="GIF of dial-up modem" src="/loading.gif"></Image>
    </>
    return <>
        <p>It&apos;s up ✅</p>
        <Image width={400} height={210} alt={`Image preview of ${url}`} src={`data:image/png;base64,${data.imageBase64}`}></Image>
    </>
}

export default Result