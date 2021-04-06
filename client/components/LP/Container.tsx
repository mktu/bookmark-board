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
            siginin={
                <Layout.Single
                    title={Sections.Signin.Title}
                    content={<Sections.Signin.Content />}
                />
            }
        />
    )
}

export default LP;