import type { NextApiRequest, NextApiResponse } from 'next'
import fetchLinkPreview from '../../serverside/fetchLinkPreviewServer'
import captureImage from '../../serverside/captureImage'

const urls = async (req:NextApiRequest, res:NextApiResponse) => {
    //const startTm = Date.now()
    if(!req.query.url){
        res.statusCode = 400
        res.status(400).end('url parameter is undefined.')
        return
    }
    const url = req.query.url as string
    const useValidate = Boolean(req.query.useValidate as string)
    const useCapture = Boolean(req.query.useCapture as string)
    const result = await fetchLinkPreview(url, useValidate)
    if(result.images.length === 0 && useCapture){
        result.images.push(await captureImage(url))
    }
    //const endTm = Date.now()
    //console.log(`fin:${endTm-startTm}ms`)
    res.statusCode = 200
    res.json(result)
}
export default urls