import React from 'react'
import Head from 'next/head'
import { AppName } from '../../utils/constants'
import { getOrigin } from '../../utils'

type Props = {
    group : BookmarkGroup,
    profile : Profile
}

const PublickBookmarkMeta : React.FC<Props> = ({
    group,
    profile
}) =>(
    <Head>
        <title>{group.name} | {AppName}</title>
        <meta name='description' content={group.description || ''} />
        <meta property="og:title" content={`${group.name} | ${AppName}`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${getOrigin()}/public-bookmarks/${group.id}`} />
        <meta property="og:description" content={group.description || ''} />
        <meta property="og:image" content={`https://og-image-lilac-kappa.vercel.app/${group.name}.png?author=${profile.name}&theme=dark`} />
        <meta property="og:site_name" content={AppName} />
        <meta name="twitter:title" content={`${group.name} | ${AppName}`} />
        <meta name="twitter:site" content='' />
        <meta name="twitter:card" content='summary_large_image' />
        <meta name="twitter:description" content={group.description || ''} />
        <meta name="twitter:image" content={`https://og-image-lilac-kappa.vercel.app/${group.name}.png?author=${profile.name}&theme=dark`} />
      </Head>
)

export default PublickBookmarkMeta