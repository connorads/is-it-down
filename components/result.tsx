import useSWR from 'swr'
import { useEffect } from 'react'
import Image from 'next/image'

const fetcher = async (
    input: RequestInfo,
    init: RequestInit,
) => {
    const res = await fetch(input, init);
    if (!res.ok) throw new Error((await res.text()).split("===")[0])

    return res.text();
};

const Result = ({ url }: { url: string }) => {
    const params = new URLSearchParams()
    params.set("url", url)
    const { data, error } = useSWR<string, Error>(`/api/isit?${params}`, fetcher)

    useEffect(() => {
        console.debug("error", error)
        console.debug("data", data)
    }, [error, data])

    if (error) return <>
        <p>Maybe it is down 👀</p>
        <p><code >{error.message}</code></p>
        <Image width={498} height={249} alt="GIF of poor TV signal" src="/error.gif"></Image>
    </>
    if (!data) return <>
        <p>Loading, please wait ...</p>
        <Image width={498} height={249} alt="GIF of dial-up modem" src="/loading.gif"></Image>
    </>
    return <>
        <p>It&apos;s up ✅</p>
        <Image width={400} height={210} alt={`Image preview of ${url}`} src={`data:image/jpeg;base64,${data}`}></Image>
    </>
}

export default Result