const getDomainUrl = (url: string): string => {
    if (!url.startsWith("http")) url = `https://${url}`
    const urlObject = new URL(url);
    const domainUrl = `${urlObject.protocol}//${urlObject.host}`;
    return domainUrl
}

export default getDomainUrl