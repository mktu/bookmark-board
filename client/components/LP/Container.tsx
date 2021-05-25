import React from 'react'
import { useRouter } from 'next/router'
import * as Layout from './Layout'
import * as Sections from './Sections'
import ScrollFadein from '@components/Common/Animation/ScrollFadein'

const LP = () => {
    const router = useRouter();
    const handleLogin = () => {
        router.push('/signin')
    }

    return (
        <Layout.Page
            top={
                <ScrollFadein translate={{ x: 100, y: 0 }}>
                    <Layout.SideBySide
                        title={Sections.Top.Title}
                        content={<Sections.Top.Content handleLogin={handleLogin} />}
                        image={Sections.Top.Image}
                    />
                </ScrollFadein>}
            topics={
                <ScrollFadein translate={{ x: 0, y: 100 }}>
                    <Layout.Topics
                        title={Sections.Topics.Title}
                        topics={Sections.Topics.Topics}
                    />
                </ScrollFadein>}
            publish={
                <ScrollFadein translate={{ x: 100, y: 0 }}>
                    <Layout.SideBySide
                        title={Sections.Publish.Title}
                        content={Sections.Publish.Content}
                        image={Sections.Publish.Image}
                    />
                </ScrollFadein>
            }
            plugin={
                <ScrollFadein translate={{ x: -100, y: 0 }}>
                    <Layout.SideBySide
                        title={Sections.Plugin.Title}
                        content={Sections.Plugin.Content}
                        image={Sections.Plugin.Image}
                        imageLeft
                    />
                </ScrollFadein>
            }
            siginin={
                <ScrollFadein translate={{ x: 0, y: 0 }} transition='2s'>
                    <Layout.Single
                        title={Sections.Signin.Title}
                        content={<Sections.Signin.Content />}
                    />
                </ScrollFadein>
            }
        />
    )
}

export default LP;