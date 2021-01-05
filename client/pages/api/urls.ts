import type { NextApiRequest, NextApiResponse } from 'next'
import fetchLinkPreview from '../../logics/fetchLinkPreviewServer'

const urls = async (req:NextApiRequest, res:NextApiResponse) => {
    if(!req.query.url){
        res.statusCode = 400
        res.status(400).end('url parameter is undefined.')
        return
    }
    const url = req.query.url as string
    const result = await fetchLinkPreview(url)
    res.statusCode = 200
    res.json(result)
}
export default urls